import React from 'react';
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
import { Calendar, Mail, MessageSquare, Clock, User } from 'lucide-react';

interface Appointment {
  id: string;
  appointment_datetime: string;
  name: string;
  email: string;
  message: string | null;
  created_at: string;
}

interface AppointmentDetailsModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  appointment,
  isOpen,
  onClose
}) => {
  if (!appointment) return null;

  // Fonction pour formater la date et l'heure
  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), 'PPP', { locale: fr });
  };

  // Fonction pour formater l'heure
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'p', { locale: fr });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Détails du rendez-vous</DialogTitle>
          <DialogDescription>
            Informations complètes sur le rendez-vous
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">Date du rendez-vous</p>
              <p className="text-base">{formatDateTime(appointment.appointment_datetime)}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">Heure du rendez-vous</p>
              <p className="text-base">{formatTime(appointment.appointment_datetime)}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <User className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">Nom</p>
              <p className="text-base">{appointment.name}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">Email</p>
              <p className="text-base">{appointment.email}</p>
            </div>
          </div>
          
          {appointment.message && (
            <div className="flex items-start">
              <MessageSquare className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-muted-foreground">Message</p>
                <p className="text-base whitespace-pre-wrap">{appointment.message}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">Date de création</p>
              <p className="text-base">{format(new Date(appointment.created_at), 'Pp', { locale: fr })}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsModal;
