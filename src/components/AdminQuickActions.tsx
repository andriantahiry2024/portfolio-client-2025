import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Calendar, MessageSquare, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminQuickActionsProps {
  onCreatePost: () => void;
  onExportData?: () => void;
  onViewAppointments: () => void;
  onViewContacts: () => void;
}

const AdminQuickActions: React.FC<AdminQuickActionsProps> = ({
  onCreatePost,
  onExportData = () => console.log('Export data not implemented'),
  onViewAppointments,
  onViewContacts
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions Rapides</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={onCreatePost}
          className="flex items-center justify-start"
          variant="outline"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouvel Article
        </Button>

        <Button
          onClick={onViewAppointments}
          className="flex items-center justify-start"
          variant="outline"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Voir les Rendez-vous
        </Button>

        <Button
          onClick={onViewContacts}
          className="flex items-center justify-start"
          variant="outline"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Voir les Messages
        </Button>

        <Button
          onClick={onExportData}
          className="flex items-center justify-start"
          variant="outline"
        >
          <Download className="mr-2 h-4 w-4" />
          Exporter les Données
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminQuickActions;
