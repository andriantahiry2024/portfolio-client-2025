import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, Globe, Map } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Visit {
  id: string;
  ip_address: string;
  user_agent: string;
  referrer: string | null;
  page_url: string;
  country: string | null;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
}

interface CountryStats {
  country: string;
  count: number;
}

interface VisitsPagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const AdminVisitsPage: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [countryStats, setCountryStats] = useState<CountryStats[]>([]);
  const [pagination, setPagination] = useState<VisitsPagination>({
    total: 0,
    page: 1,
    pageSize: 50,
    totalPages: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Fonction pour récupérer les visites
  const fetchVisits = async (page = 1) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Non authentifié');
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/visits?page=${page}&pageSize=${pagination.pageSize}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setVisits(data.visits);
      setPagination(data.pagination);
      setCountryStats(data.countryStats);
    } catch (error) {
      console.error('Erreur lors de la récupération des visites:', error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les visites.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les visites au chargement du composant
  useEffect(() => {
    fetchVisits();
  }, []);

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'Pp', { locale: fr });
  };

  // Fonction pour exporter les visites au format CSV
  const handleExportVisits = () => {
    if (visits.length === 0) {
      toast({
        title: "Aucune donnée à exporter",
        description: "Il n'y a pas de visites disponibles pour l'exportation.",
        variant: "warning"
      });
      return;
    }

    // Créer les en-têtes du CSV
    const headers = [
      'ID',
      'Adresse IP',
      'Pays',
      'Ville',
      'Région',
      'URL de la page',
      'Référent',
      'Date de visite'
    ];

    // Créer les lignes du CSV
    const csvRows = [
      headers.join(','),
      ...visits.map(visit => [
        visit.id,
        visit.ip_address,
        visit.country || 'Inconnu',
        visit.city || 'Inconnu',
        visit.region || 'Inconnu',
        `"${visit.page_url}"`,
        visit.referrer ? `"${visit.referrer}"` : 'Direct',
        formatDate(visit.created_at)
      ].join(','))
    ];

    // Créer le contenu du CSV
    const csvContent = csvRows.join('\n');

    // Créer un blob et un lien de téléchargement
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `visites_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrer les visites en fonction du terme de recherche
  const filteredVisits = visits.filter(visit => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (visit.ip_address && visit.ip_address.toLowerCase().includes(searchLower)) ||
      (visit.country && visit.country.toLowerCase().includes(searchLower)) ||
      (visit.city && visit.city.toLowerCase().includes(searchLower)) ||
      (visit.page_url && visit.page_url.toLowerCase().includes(searchLower)) ||
      (visit.referrer && visit.referrer.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Visites du Site</h2>
          <p className="text-muted-foreground">
            Consultez les statistiques de visite de votre site web.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleExportVisits}
            disabled={isLoading || visits.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Exporter CSV
          </Button>
        </div>
      </div>

      {/* Statistiques par pays */}
      {countryStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Répartition des visites par pays
            </CardTitle>
            <CardDescription>
              Nombre total de visites par pays d'origine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {countryStats.slice(0, 8).map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg"
                >
                  <span className="text-lg font-semibold">{stat.country}</span>
                  <span className="text-2xl font-bold mt-2">{stat.count}</span>
                  <span className="text-sm text-muted-foreground mt-1">visites</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des visites */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Map className="mr-2 h-5 w-5" />
            Historique des visites
          </CardTitle>
          <CardDescription>
            Liste détaillée des visites sur votre site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Rechercher par IP, pays, ville ou URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Chargement des visites...</p>
            </div>
          ) : filteredVisits.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Aucune visite trouvée.</p>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Adresse IP</TableHead>
                      <TableHead>Localisation</TableHead>
                      <TableHead>Page visitée</TableHead>
                      <TableHead>Provenance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVisits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="font-medium">
                          {formatDate(visit.created_at)}
                        </TableCell>
                        <TableCell>{visit.ip_address}</TableCell>
                        <TableCell>
                          {visit.country ? (
                            <div>
                              <Badge variant="outline">{visit.country}</Badge>
                              {visit.city && <span className="ml-2">{visit.city}</span>}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Inconnue</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="max-w-xs truncate block" title={visit.page_url}>
                            {visit.page_url}
                          </span>
                        </TableCell>
                        <TableCell>
                          {visit.referrer ? (
                            <span className="max-w-xs truncate block" title={visit.referrer}>
                              {visit.referrer}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Direct</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Affichage de {filteredVisits.length} sur {pagination.total} visites
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchVisits(pagination.page - 1)}
                    disabled={pagination.page <= 1 || isLoading}
                  >
                    Précédent
                  </Button>
                  <span className="text-sm">
                    Page {pagination.page} sur {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchVisits(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages || isLoading}
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVisitsPage;
