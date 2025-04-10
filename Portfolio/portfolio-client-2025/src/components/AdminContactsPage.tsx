import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2, Mail, MessageSquare, User, Info } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import DataTable from './DataTable';
import { useToast } from "./ui/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import ContactDetailsModal from './ContactDetailsModal';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

const AdminContactsPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction de retour supprimée

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Récupérer le token (à adapter selon votre gestion de state/contexte)
        const token = localStorage.getItem('authToken'); // Exemple: récupérer depuis localStorage
        if (!token) {
          throw new Error('Utilisateur non authentifié');
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/contacts`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
           if (response.status === 401 || response.status === 403) {
             throw new Error('Accès non autorisé. Vérifiez vos permissions.');
          }
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data: Contact[] = await response.json();
        setContacts(data);
      } catch (err: any) {
         console.error("Erreur lors de la récupération des contacts:", err);
        setError(err.message || 'Une erreur est survenue.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Fonction pour ouvrir la modale avec les détails du contact
  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modale
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card className="m-4">
      <CardHeader>
        {/* Bouton de retour supprimé */}
        <CardTitle>Nos Futurs Clients (Messages de Contact)</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Chargement des messages...</p>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center py-10 text-red-600">
            <AlertCircle className="h-8 w-8 mr-2" />
            <p>Erreur : {error}</p>
          </div>
        )}
        {!isLoading && !error && (
          <>
            <DataTable
              data={contacts}
              columns={[
                {
                  header: "Date Réception",
                  accessorKey: "created_at",
                  cell: (contact) => (
                    <div className="text-muted-foreground text-sm">
                      {format(new Date(contact.created_at), 'Pp', { locale: fr })}
                    </div>
                  ),
                  enableSorting: true
                },
                {
                  header: "Nom",
                  accessorKey: "name",
                  cell: (contact) => (
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{contact.name}</span>
                    </div>
                  ),
                  enableSorting: true
                },
                {
                  header: "Email",
                  accessorKey: "email",
                  cell: (contact) => (
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{contact.email}</span>
                    </div>
                  )
                },
                {
                  header: "Sujet",
                  accessorKey: "subject",
                  cell: (contact) => (
                    <div className="flex items-center">
                      <Info className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{contact.subject || '-'}</span>
                    </div>
                  ),
                  enableSorting: true
                },
                {
                  header: "Message",
                  accessorKey: "message",
                  cell: (contact) => (
                    <div className="flex items-start max-w-md">
                      <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="line-clamp-2 whitespace-pre-wrap">{contact.message}</span>
                    </div>
                  )
                }
              ]}
              searchPlaceholder="Rechercher des messages..."
              searchFields={["name", "email", "subject", "message"]}
              emptyMessage="Aucun message de contact trouvé."
              onRowClick={handleContactClick}
              rowClassName={() => "cursor-pointer hover:bg-muted/50"}
            />

            {/* Modale de détails du contact */}
            <ContactDetailsModal
              contact={selectedContact}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminContactsPage;