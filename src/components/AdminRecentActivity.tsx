import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Activity {
  id: string;
  type: 'post' | 'appointment' | 'contact';
  title: string;
  date: string;
  description?: string;
}

const AdminRecentActivity: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      // Données fictives pour la démonstration
      const mockActivities: Activity[] = [
        {
          id: '1',
          type: 'post',
          title: 'Nouvel article publié',
          date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
          description: 'Comment créer un site web moderne avec React'
        },
        {
          id: '2',
          type: 'appointment',
          title: 'Nouveau rendez-vous',
          date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          description: 'Jean Dupont a pris rendez-vous pour le 15 juin'
        },
        {
          id: '3',
          type: 'contact',
          title: 'Nouveau message',
          date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
          description: 'Marie Martin a envoyé un message concernant un projet web'
        },
        {
          id: '4',
          type: 'post',
          title: 'Article mis à jour',
          date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          description: 'Les meilleures pratiques SEO en 2023'
        },
        {
          id: '5',
          type: 'appointment',
          title: 'Rendez-vous annulé',
          date: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
          description: 'Pierre Durand a annulé son rendez-vous du 10 juin'
        }
      ];
      
      setActivities(mockActivities);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Fonction pour formater la date relative
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else {
      return format(date, 'dd MMM', { locale: fr });
    }
  };

  // Fonction pour obtenir la couleur en fonction du type d'activité
  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'post':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'appointment':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'contact':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  // Fonction pour obtenir le libellé du type d'activité
  const getActivityTypeLabel = (type: Activity['type']) => {
    switch (type) {
      case 'post':
        return 'Article';
      case 'appointment':
        return 'RDV';
      case 'contact':
        return 'Contact';
      default:
        return 'Activité';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activités Récentes</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Chargement des activités...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">
            <p>Erreur : {error}</p>
          </div>
        ) : activities.length === 0 ? (
          <p className="text-center py-10 text-muted-foreground">Aucune activité récente.</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className={`px-2 py-1 rounded text-xs font-medium ${getActivityColor(activity.type)}`}>
                  {getActivityTypeLabel(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeDate(activity.date)}
                    </span>
                  </div>
                  {activity.description && (
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminRecentActivity;
