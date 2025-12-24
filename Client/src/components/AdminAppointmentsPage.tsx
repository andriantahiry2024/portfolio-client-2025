import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Appointment {
  id: string;
  appointment_datetime: string;
  name: string;
  email: string;
  message: string | null;
  created_at: string;
}

const AdminAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
        const response = await fetch(`${backendUrl}/api/admin/appointments`, {
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

  return (
    <Card className="m-4">
      <CardHeader>
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
        {!isLoading && !error && appointments.length === 0 && (
          <p className="text-center py-10 text-muted-foreground">Aucun rendez-vous trouvé.</p>
        )}
        {!isLoading && !error && appointments.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Heure RDV</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date Création</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {format(new Date(appointment.appointment_datetime), 'PPP p', { locale: fr })}
                  </TableCell>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.email}</TableCell>
                  <TableCell>{appointment.message || '-'}</TableCell>
                  <TableCell>
                    {format(new Date(appointment.created_at), 'Pp', { locale: fr })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminAppointmentsPage;