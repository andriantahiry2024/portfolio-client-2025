import React, { useState, useEffect } from 'react';
import { fetchWithAuth, API_URL } from '../lib/apiConfig';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Users, FileText, Calendar, MessageSquare, Globe, Map } from 'lucide-react';

interface CountryVisit {
  country: string;
  count: number;
}

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalAppointments: number;
  totalContacts: number;
  totalVisits: number;
  topVisitorCountries: CountryVisit[];
}

const AdminDashboardStats: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPosts: 0,
    totalAppointments: 0,
    totalContacts: 0,
    totalVisits: 0,
    topVisitorCountries: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Utilisateur non authentifié');
        }

        // Récupérer les statistiques depuis le backend
        // Note: Cette API devra être implémentée côté backend
        const response = await fetchWithAuth('/admin/stats');

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error('Accès non autorisé. Vérifiez vos permissions.');
          }
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (error: any) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        setError(error.message);

        // En cas d'erreur ou si l'API n'existe pas encore, utiliser des données de secours
        // basées sur les autres appels API existants
        fetchBackupStats();
      } finally {
        setIsLoading(false);
      }
    };

    // Fonction pour récupérer des statistiques de secours à partir des autres endpoints
    const fetchBackupStats = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        // Récupérer les données en parallèle
        const [usersRes, postsRes, appointmentsRes, contactsRes] = await Promise.all([
          fetchWithAuth('/admin/users'),
          fetchWithAuth('/admin/posts'),
          fetchWithAuth('/admin/appointments'),
          fetchWithAuth('/admin/contacts')
        ]);

        // Traiter les réponses si elles sont OK
        const users = usersRes.ok ? await usersRes.json() : [];
        const posts = postsRes.ok ? await postsRes.json() : [];
        const appointments = appointmentsRes.ok ? await appointmentsRes.json() : [];
        const contacts = contactsRes.ok ? await contactsRes.json() : [];

        setStats({
          totalUsers: users.length,
          totalPosts: posts.length,
          totalAppointments: appointments.length,
          totalContacts: contacts.length,
          totalVisits: 0, // Valeur par défaut car nous n'avons pas ces données
          topVisitorCountries: [] // Tableau vide car nous n'avons pas ces données
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques de secours:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {isLoading ? (
        <div className="col-span-4 flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Chargement des statistiques...</p>
        </div>
      ) : (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Utilisateurs enregistrés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                Articles publiés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rendez-vous</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAppointments}</div>
              <p className="text-xs text-muted-foreground">
                Demandes de rendez-vous
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContacts}</div>
              <p className="text-xs text-muted-foreground">
                Messages de contact
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visites</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVisits}</div>
              <p className="text-xs text-muted-foreground">
                Visiteurs uniques
              </p>
            </CardContent>
          </Card>

          {/* Carte des pays visiteurs */}
          {stats.topVisitorCountries.length > 0 && (
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pays des visiteurs</CardTitle>
                <Map className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {stats.topVisitorCountries.map((country, index) => (
                    <div key={index} className="flex flex-col items-center justify-center p-2 bg-muted/50 rounded-md">
                      <span className="text-lg font-semibold">{country.country}</span>
                      <span className="text-sm text-muted-foreground">{country.count} visites</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboardStats;
