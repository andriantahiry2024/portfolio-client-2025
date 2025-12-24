import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

const AdminContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
        const response = await fetch(`${backendUrl}/api/admin/contacts`, {
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

  return (
    <Card className="m-4">
      <CardHeader>
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
        {!isLoading && !error && contacts.length === 0 && (
          <p className="text-center py-10 text-muted-foreground">Aucun message de contact trouvé.</p>
        )}
        {!isLoading && !error && contacts.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date Réception</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Sujet</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    {format(new Date(contact.created_at), 'Pp', { locale: fr })}
                  </TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.subject || '-'}</TableCell>
                  <TableCell className="whitespace-pre-wrap">{contact.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminContactsPage;