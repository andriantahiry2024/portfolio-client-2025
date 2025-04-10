import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  
  // États pour les paramètres généraux
  const [siteName, setSiteName] = useState('Mon Portfolio');
  const [siteDescription, setSiteDescription] = useState('Portfolio professionnel et blog personnel');
  const [enableBlog, setEnableBlog] = useState(true);
  const [enableAppointments, setEnableAppointments] = useState(true);
  const [enableContactForm, setEnableContactForm] = useState(true);
  
  // États pour les paramètres de notification
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [notifyOnNewAppointment, setNotifyOnNewAppointment] = useState(true);
  const [notifyOnNewContact, setNotifyOnNewContact] = useState(true);
  const [notificationEmail, setNotificationEmail] = useState('');
  
  // Fonction pour sauvegarder les paramètres
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simuler une requête API
    setTimeout(() => {
      setIsLoading(false);
      
      // Afficher une notification de succès
      toast({
        title: "Paramètres sauvegardés",
        description: "Vos paramètres ont été enregistrés avec succès.",
        variant: "success",
      });
    }, 1000);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Paramètres</CardTitle>
        <CardDescription>
          Configurez les paramètres de votre site web et de l'interface d'administration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nom du site</Label>
                <Input 
                  id="site-name" 
                  value={siteName} 
                  onChange={(e) => setSiteName(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-description">Description du site</Label>
                <Input 
                  id="site-description" 
                  value={siteDescription} 
                  onChange={(e) => setSiteDescription(e.target.value)} 
                />
              </div>
              
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-blog">Activer le blog</Label>
                    <p className="text-sm text-muted-foreground">
                      Afficher la section blog sur votre site
                    </p>
                  </div>
                  <Switch 
                    id="enable-blog" 
                    checked={enableBlog} 
                    onCheckedChange={setEnableBlog} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-appointments">Activer les rendez-vous</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux visiteurs de prendre rendez-vous
                    </p>
                  </div>
                  <Switch 
                    id="enable-appointments" 
                    checked={enableAppointments} 
                    onCheckedChange={setEnableAppointments} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-contact">Activer le formulaire de contact</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux visiteurs de vous contacter
                    </p>
                  </div>
                  <Switch 
                    id="enable-contact" 
                    checked={enableContactForm} 
                    onCheckedChange={setEnableContactForm} 
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des notifications par email
                  </p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                />
              </div>
              
              {emailNotifications && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="notification-email">Email de notification</Label>
                    <Input 
                      id="notification-email" 
                      type="email"
                      placeholder="votre@email.com"
                      value={notificationEmail} 
                      onChange={(e) => setNotificationEmail(e.target.value)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-appointment">Nouveau rendez-vous</Label>
                    <Switch 
                      id="notify-appointment" 
                      checked={notifyOnNewAppointment} 
                      onCheckedChange={setNotifyOnNewAppointment} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-contact">Nouveau message de contact</Label>
                    <Switch 
                      id="notify-contact" 
                      checked={notifyOnNewContact} 
                      onCheckedChange={setNotifyOnNewContact} 
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Les paramètres d'apparence seront disponibles prochainement.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer les paramètres
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminSettings;
