import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2, Calendar, Mail, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import DataTable from './DataTable';
import { useToast } from "./ui/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: string;
  appointment_datetime: string;
  name: string;
  email: string;
  message: string | null;
  created_at: string;
}

const AdminAppointmentsPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction de retour supprimée

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Récupérer le token (à adapter selon votre gestion de state/contexte)
        const token = localStorage.getItem('authToken'); // Exemple: récupérer depuis localStorage
        if (!token) {
          throw new Error('Utilisateur non authentifié');
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/appointments`, {
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

        const data: Appointment[] = await response.json();
        setAppointments(data);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des rendez-vous:", err);
        setError(err.message || 'Une erreur est survenue.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Fonction pour formater la date et l'heure
  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), 'PPP p', { locale: fr });
  };

  return (
    <Card className="m-4">
      <CardHeader>
        {/* Bouton de retour supprimé */}
        <CardTitle>Les Prises de RDV</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Chargement des rendez-vous...</p>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center py-10 text-red-600">
            <AlertCircle className="h-8 w-8 mr-2" />
            <p>Erreur : {error}</p>
          </div>
        )}
        {!isLoading && !error && (
          <DataTable
            data={appointments}
            columns={[
              {
                header: "Date & Heure RDV",
                accessorKey: "appointment_datetime",
                cell: (appointment) => (
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{formatDateTime(appointment.appointment_datetime)}</span>
                  </div>
                ),
                enableSorting: true
              },
              {
                header: "Nom",
                accessorKey: "name",
                cell: (appointment) => (
                  <div className="font-medium">{appointment.name}</div>
                ),
                enableSorting: true
              },
              {
                header: "Email",
                accessorKey: "email",
                cell: (appointment) => (
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{appointment.email}</span>
                  </div>
                )
              },
              {
                header: "Message",
                accessorKey: "message",
                cell: (appointment) => (
                  <div className="flex items-start">
                    {appointment.message ? (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="line-clamp-2">{appointment.message}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                )
              },
              {
                header: "Date Création",
                accessorKey: "created_at",
                cell: (appointment) => (
                  <div className="text-muted-foreground text-sm">
                    {format(new Date(appointment.created_at), 'Pp', { locale: fr })}
                  </div>
                ),
                enableSorting: true
              }
            ]}
            searchPlaceholder="Rechercher des rendez-vous..."
            searchFields={["name", "email", "message"]}
            emptyMessage="Aucun rendez-vous trouvé."
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AdminAppointmentsPage;