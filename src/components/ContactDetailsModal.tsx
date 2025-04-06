import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Mail, MessageSquare, Clock, User, Info, Phone, Calendar } from 'lucide-react';
import { useToast } from "./ui/use-toast";

interface Appointment {
  id: string;
  appointment_datetime: string;
  name: string;
  email: string;
  message: string | null;
  created_at: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  created_at: string;
  ip_address?: string;
  cookies?: string;
  user_agent?: string;
  session_token?: string;
}

interface ContactDetailsModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

const ContactDetailsModal: React.FC<ContactDetailsModalProps> = ({
  contact,
  isOpen,
  onClose
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Charger les rendez-vous associés au contact lorsque la modale s'ouvre
  useEffect(() => {
    if (contact && isOpen) {
      fetchAppointments();
    }
  }, [contact, isOpen]);

  // Fonction pour récupérer les rendez-vous associés au contact
  const fetchAppointments = async () => {
    if (!contact) return;

    setIsLoading(true);
    try {
      // Récupérer le token d'authentification du localStorage
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.warn('Aucun token d\'authentification trouvé');
        setAppointments([]);
        return;
      }

      const baseUrl = import.meta.env.VITE_BACKEND_URL || '';
      const response = await fetch(`${baseUrl}/api/admin/appointments?email=${encodeURIComponent(contact.email)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
      // En cas d'erreur, on définit un tableau vide pour éviter d'afficher la section
      setAppointments([]);
      // On n'affiche pas de toast pour éviter de surcharger l'utilisateur avec des messages d'erreur
      // pour une fonctionnalité secondaire
    } finally {
      setIsLoading(false);
    }
  };

  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Détails du message</DialogTitle>
          <DialogDescription>
            Informations complètes sur le message reçu
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start">
            <User className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">Nom</p>
              <p className="text-base">{contact.name}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">Email</p>
              <p className="text-base">{contact.email}</p>
            </div>
          </div>

          {contact.phone && (
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-muted-foreground">Téléphone</p>
                <p className="text-base">{contact.phone}</p>
              </div>
            </div>
          )}

          {contact.subject && (
            <div className="flex items-start">
              <Info className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-muted-foreground">Sujet</p>
                <p className="text-base">{contact.subject}</p>
              </div>
            </div>
          )}

          <div className="flex items-start">
            <MessageSquare className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">Message</p>
              <p className="text-base whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">Date de réception</p>
              <p className="text-base">{format(new Date(contact.created_at), 'Pp', { locale: fr })}</p>
            </div>
          </div>

          {/* Informations techniques */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Informations techniques</h3>

            {contact.ip_address && (
              <div className="flex items-start mb-2">
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Adresse IP</p>
                  <p className="text-sm font-mono">{contact.ip_address}</p>
                </div>
              </div>
            )}

            {contact.user_agent && (
              <div className="flex items-start mb-2">
                <div>
                  <p className="font-medium text-sm text-muted-foreground">User Agent</p>
                  <p className="text-sm font-mono break-all">{contact.user_agent}</p>
                </div>
              </div>
            )}

            {contact.session_token && (
              <div className="flex items-start mb-2">
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Token de session</p>
                  <p className="text-sm font-mono break-all">{contact.session_token}</p>
                </div>
              </div>
            )}

            {contact.cookies && (
              <div className="flex items-start mb-2">
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Cookies</p>
                  <p className="text-sm font-mono break-all">{contact.cookies}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section des rendez-vous associés */}
        {appointments.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-medium mb-2">Rendez-vous associés</h3>
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-muted p-3 rounded-md">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {format(new Date(appointment.appointment_datetime), 'PPP', { locale: fr })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(appointment.appointment_datetime), 'p', { locale: fr })}
                      </p>
                      {appointment.message && (
                        <p className="text-sm mt-1">{appointment.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}

        <DialogFooter>
          <Button onClick={onClose}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailsModal;
