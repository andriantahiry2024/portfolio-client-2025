import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';

// Note: Dans un projet réel, vous devriez installer et utiliser une bibliothèque de graphiques comme recharts, chart.js, ou visx
// Pour cet exemple, nous allons créer un graphique simple en CSS

interface ChartData {
  labels: string[];
  values: number[];
}

interface AdminDashboardChartsProps {
  // Vous pouvez passer des données en props si nécessaire
}

const AdminDashboardCharts: React.FC<AdminDashboardChartsProps> = () => {
  const [activeChart, setActiveChart] = useState('posts');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [postsData, setPostsData] = useState<ChartData>({
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    values: [4, 6, 8, 5, 10, 12, 8, 9, 11, 13, 7, 5]
  });
  
  const [appointmentsData, setAppointmentsData] = useState<ChartData>({
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    values: [3, 5, 7, 8, 6, 2, 1]
  });
  
  const [contactsData, setContactsData] = useState<ChartData>({
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    values: [2, 4, 3, 5, 7, 6, 8, 9, 5, 4, 6, 7]
  });

  // Simuler le chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Fonction pour trouver la valeur maximale dans un tableau de données
  const getMaxValue = (data: ChartData) => {
    return Math.max(...data.values) * 1.2; // Ajouter 20% pour l'espace
  };

  // Rendu du graphique en barres
  const renderBarChart = (data: ChartData) => {
    const maxValue = getMaxValue(data);
    
    return (
      <div className="w-full h-64 mt-4">
        <div className="flex h-full items-end space-x-2">
          {data.labels.map((label, index) => {
            const height = (data.values[index] / maxValue) * 100;
            return (
              <div key={label} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-primary/80 hover:bg-primary rounded-t-md transition-all duration-200"
                  style={{ height: `${height}%` }}
                >
                  <div className="invisible group-hover:visible text-xs text-center text-white font-medium pt-1">
                    {data.values[index]}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Statistiques</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Chargement des statistiques...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">
            <p>Erreur : {error}</p>
          </div>
        ) : (
          <Tabs value={activeChart} onValueChange={setActiveChart} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="posts">Articles</TabsTrigger>
              <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Nombre d'articles publiés par mois
              </div>
              {renderBarChart(postsData)}
            </TabsContent>
            
            <TabsContent value="appointments" className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Rendez-vous par jour de la semaine
              </div>
              {renderBarChart(appointmentsData)}
            </TabsContent>
            
            <TabsContent value="contacts" className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Messages de contact par mois
              </div>
              {renderBarChart(contactsData)}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminDashboardCharts;
