// Client/src/components/AdminDashboard.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Edit, Plus, X, Users, Loader2, Eye, Download, Key, UserCog, Trash } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BlogPostForm from "./BlogPostForm";
import AdminAppointmentsPage from "./AdminAppointmentsPage";
import AdminContactsPage from "./AdminContactsPage";
import AdminVisitsPage from "./AdminVisitsPage";
import AdminDashboardStats from "./AdminDashboardStats";
import AdminDashboardCharts from "./AdminDashboardCharts";
import AdminQuickActions from "./AdminQuickActions";
import AdminRecentActivity from "./AdminRecentActivity";
import AdminSettings from "./AdminSettings";
import DataTable from "./DataTable";
import ConfirmDialog from "./ConfirmDialog";
import UserEditModal from "./UserEditModal";
import UserCreateModal from "./UserCreateModal";
import PasswordConfirmDialog from "./PasswordConfirmDialog";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
// Type User (inchangé)
interface User {
  id: string | number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  createdAt: string;
}

// Type Post basé sur l'API et le schéma Prisma
interface Post {
  id: string;
  title: string;
  content: string;
  category?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  slug: string; // Ajouter le champ slug pour les URL des articles
  author?: { // Inclure l'auteur si l'API le renvoie
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  }
}


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  // Récupérer l'onglet actif depuis l'URL ou utiliser la valeur par défaut
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || "dashboard");

  // Écouter les changements d'URL pour mettre à jour l'onglet actif
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // États pour les utilisateurs
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isPasswordConfirmOpen, setIsPasswordConfirmOpen] = useState(false);
  const [isUserCreateModalOpen, setIsUserCreateModalOpen] = useState(false);

  // États pour les posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  // État pour l'exportation de données
  const [isExporting, setIsExporting] = useState(false);

  // Fonction utilitaire pour les appels API (évite la répétition)
  const fetchApi = async (url: string, method: string = 'GET', body?: any) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error("Non authentifié."); // Gérer l'absence de token
    }

    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}${url}`;

    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(apiUrl, options);

    // Gérer les réponses sans contenu (ex: DELETE 204)
    if (response.status === 204) {
        return null; // Ou un objet indiquant le succès si nécessaire
    }

    const data = await response.json();

    if (!response.ok) {
      // Gérer les erreurs spécifiques (token invalide/expiré)
      if (response.status === 401 || response.status === 403) {
         localStorage.removeItem('authToken');
         localStorage.removeItem('userData');
         navigate('/login'); // Rediriger
      }
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    return data;
  };


  // --- Logique pour récupérer les Posts ---
  const fetchPosts = async () => {
      setIsLoadingPosts(true);
      setPostsError(null);
      try {
        const data = await fetchApi('/api/admin/posts');
        setPosts(data || []); // Assurer que posts est toujours un tableau
      } catch (err: any) {
        console.error("Erreur lors de la récupération des posts:", err);
        setPostsError(err.message || 'Une erreur est survenue.');
      } finally {
        setIsLoadingPosts(false);
      }
    };

  // --- Logique pour récupérer les Utilisateurs ---
  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    setUsersError(null);
    try {
      const data = await fetchApi('/api/admin/users');
      setUsers(data || []);
    } catch (err: any) {
      console.error("Erreur lors de la récupération des utilisateurs:", err);
      setUsersError(err.message || 'Une erreur est survenue.');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // --- Logique pour éditer un utilisateur ---
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  // --- Logique pour créer un nouvel utilisateur ---
  const handleCreateUser = () => {
    setIsUserCreateModalOpen(true);
  };

  // --- Logique pour sauvegarder un nouvel utilisateur ---
  const handleSaveNewUser = async (userData: any) => {
    try {
      await fetchApi('/api/admin/users', 'POST', userData);
      // Mettre à jour la liste des utilisateurs
      fetchUsers();
      toast({
        title: "Utilisateur créé",
        description: "Le nouvel utilisateur a été créé avec succès.",
      });
    } catch (err: any) {
      console.error("Erreur lors de la création de l'utilisateur:", err);
      toast({
        title: "Erreur",
        description: err.message || "Une erreur est survenue lors de la création de l'utilisateur.",
        variant: "destructive"
      });
      throw err; // Propager l'erreur pour que le composant modal puisse la gérer
    }
  };

  // --- Logique pour sauvegarder les modifications d'un utilisateur ---
  const handleSaveUser = async (updatedUser: User) => {
    try {
      await fetchApi(`/api/admin/users/${updatedUser.id}`, 'PUT', updatedUser);
      // Mettre à jour la liste des utilisateurs
      fetchUsers();
      toast({
        title: "Utilisateur mis à jour",
        description: "Les informations de l'utilisateur ont été mises à jour avec succès.",
      });
    } catch (err: any) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", err);
      toast({
        title: "Erreur",
        description: err.message || "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
        variant: "destructive"
      });
      throw err; // Propager l'erreur pour que le composant modal puisse la gérer
    }
  };

  // --- Logique pour supprimer un utilisateur ---
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsPasswordConfirmOpen(true);
  };

  // --- Logique pour confirmer la suppression d'un utilisateur avec mot de passe ---
  const confirmDeleteUserWithPassword = async (password: string) => {
    if (!selectedUser) return;

    try {
      // Vérifier le mot de passe de l'utilisateur courant
      const response = await fetchApi('/api/auth/verify-password', 'POST', { password });

      if (!response.success) {
        throw new Error("Mot de passe incorrect");
      }

      // Supprimer l'utilisateur
      await fetchApi(`/api/admin/users/${selectedUser.id}`, 'DELETE');

      // Mettre à jour la liste des utilisateurs
      fetchUsers();
      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé avec succès.",
      });
    } catch (err: any) {
      console.error("Erreur lors de la suppression de l'utilisateur:", err);
      toast({
        title: "Erreur",
        description: err.message || "Une erreur est survenue lors de la suppression de l'utilisateur.",
        variant: "destructive"
      });
      throw err; // Propager l'erreur pour que le composant modal puisse la gérer
    } finally {
      setIsPasswordConfirmOpen(false);
      setSelectedUser(null);
    }
  };

  // --- useEffect pour mettre à jour l'URL lorsque l'onglet change ---
  useEffect(() => {
    // Mettre à jour l'URL sans recharger la page
    setSearchParams({ tab: activeTab });

    // Charger les données en fonction de l'onglet actif
    if (activeTab === 'posts') {
      fetchPosts();
    } else if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab, setSearchParams]);


  // --- Fonctions de navigation ---
  const handleViewAppointments = () => {
    // Mettre à jour directement l'onglet actif sans utiliser navigate
    setActiveTab("appointments");
    // Mettre à jour l'URL sans déclencher de navigation
    setSearchParams({ tab: "appointments" });
  };

  const handleViewContacts = () => {
    // Mettre à jour directement l'onglet actif sans utiliser navigate
    setActiveTab("contacts");
    // Mettre à jour l'URL sans déclencher de navigation
    setSearchParams({ tab: "contacts" });
  };

  // --- Logique CRUD Posts ---
  const handleCreatePost = () => {
    setIsCreating(true);
    setEditingPost(null);
    setActiveTab("editor");
    setSearchParams({ tab: "editor" });
  };

  const handleEditPost = (post: Post) => { // Utiliser le type Post
    setEditingPost(post);
    setIsCreating(false);
    setActiveTab("editor");
    setSearchParams({ tab: "editor" });
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await fetchApi(`/api/admin/posts/${postId}`, 'DELETE');
        // Rafraîchir la liste des posts après suppression
        setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
        alert("Article supprimé avec succès.");
      } catch (err: any) {
        console.error("Erreur lors de la suppression du post:", err);
        alert(`Erreur: ${err.message || 'Impossible de supprimer l\'article.'}`);
      }
    }
  };

  const handleFormCancel = () => {
    // Revenir au tableau de bord
    setIsCreating(false);
    setEditingPost(null);
    setActiveTab("dashboard");
    setSearchParams({ tab: "dashboard" });
  };

  // La soumission est gérée dans BlogPostForm, mais on rafraîchit ici
   const handleFormSubmitSuccess = () => {
     setIsCreating(false);
     setEditingPost(null);
     fetchPosts(); // Rafraîchir la liste des posts
     setActiveTab("dashboard");
     setSearchParams({ tab: "dashboard" });
   };

  // Filtrer les posts affichés (basé sur l'état `posts`)
  const filteredPosts = posts.filter((post) => {
    const term = searchTerm.toLowerCase();
    const titleMatch = post.title.toLowerCase().includes(term);
    // Adapter la recherche à l'auteur si l'API le renvoie
    const authorMatch = post.author?.firstName?.toLowerCase().includes(term) || post.author?.lastName?.toLowerCase().includes(term) || post.author?.email?.toLowerCase().includes(term) || false;
    const categoryMatch = post.category?.toLowerCase().includes(term) ?? false;
    return titleMatch || authorMatch || categoryMatch;
  });

  const formatDate = (dateString: string) => {
       const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
   };

   // Fonction pour exporter les données au format CSV
   const handleExportData = useCallback(async () => {
     setIsExporting(true);

     try {
       // Déterminer quelles données exporter en fonction de l'onglet actif
       let dataToExport: any[] = [];
       let filename = '';

       if (activeTab === 'posts' || activeTab === 'dashboard') {
         dataToExport = posts;
         filename = 'articles';
       } else if (activeTab === 'users') {
         dataToExport = users;
         filename = 'utilisateurs';
       } else if (activeTab === 'appointments') {
         // Récupérer les rendez-vous depuis l'API
         const data = await fetchApi('/api/admin/appointments');
         dataToExport = data || [];
         filename = 'rendez-vous';
       } else if (activeTab === 'contacts') {
         // Récupérer les contacts depuis l'API
         const data = await fetchApi('/api/admin/contacts');
         dataToExport = data || [];
         filename = 'contacts';
       }

       if (dataToExport.length === 0) {
         toast({
           title: "Aucune donnée à exporter",
           description: "Il n'y a pas de données disponibles pour l'exportation.",
           variant: "warning",
         });
         return;
       }

       // Convertir les données en CSV
       const headers = Object.keys(dataToExport[0]);
       const csvContent = [
         headers.join(','),
         ...dataToExport.map(row =>
           headers.map(header => {
             const value = row[header];
             // Gérer les valeurs complexes (objets, tableaux)
             const cellValue = typeof value === 'object' && value !== null
               ? JSON.stringify(value).replace(/\"/g, '\"\"')
               : value;
             // Entourer de guillemets si nécessaire
             return typeof cellValue === 'string'
               ? `\"${cellValue.replace(/\"/g, '\"\"')}\"`
               : cellValue;
           }).join(',')
         )
       ].join('\n');

       // Créer un blob et un lien de téléchargement
       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
       const url = URL.createObjectURL(blob);
       const link = document.createElement('a');
       link.setAttribute('href', url);
       link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
       link.style.visibility = 'hidden';
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);

       toast({
         title: "Exportation réussie",
         description: `Les données ont été exportées avec succès.`,
         variant: "success",
       });
     } catch (error: any) {
       console.error("Erreur lors de l'exportation des données:", error);
       toast({
         title: "Erreur d'exportation",
         description: error.message || "Une erreur est survenue lors de l'exportation des données.",
         variant: "destructive",
       });
     } finally {
       setIsExporting(false);
     }
   }, [activeTab, posts, users, toast, fetchApi]);


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
             <div>
               <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-2">
                 Admin Dashboard
               </h1>
               <p className="text-muted-foreground">
                 Gérez votre site web et vos contenus
               </p>
             </div>
             <div className="flex gap-2 mt-4 md:mt-0">
               {/* Bouton d'exportation */}
               {activeTab !== 'editor' && (
                 <Button
                   onClick={handleExportData}
                   variant="outline"
                   disabled={isExporting}
                 >
                   {isExporting ? (
                     <>
                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                       Exportation...
                     </>
                   ) : (
                     <>
                       <Download className="mr-2 h-4 w-4" />
                       Exporter
                     </>
                   )}
                 </Button>
               )}

               {/* Bouton Nouvel Article */}
               {activeTab !== 'editor' && (
                 <Button onClick={handleCreatePost}>
                   <Plus className="mr-2 h-4 w-4" /> Nouvel Article
                 </Button>
               )}
             </div>
          </div>

          {/* Onglets */}
          <Tabs value={activeTab} onValueChange={(value) => {
              if (value !== activeTab) {
                setActiveTab(value);
                setSearchParams({ tab: value });
              }
            }} className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-8">
              <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
              <TabsTrigger value="posts">Articles</TabsTrigger>
              <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="visits">Visites</TabsTrigger>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
              <TabsTrigger value="comments" disabled>Commentaires</TabsTrigger>
            </TabsList>

            {/* Onglet Tableau de bord */}
            <TabsContent value="dashboard" className="space-y-6">
              <AdminDashboardStats />

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AdminQuickActions
                  onCreatePost={handleCreatePost}
                  onExportData={handleExportData}
                  onViewAppointments={handleViewAppointments}
                  onViewContacts={handleViewContacts}
                />
                <AdminRecentActivity />
              </div>

              <AdminDashboardCharts />
            </TabsContent>

            {/* Onglet Posts */}
            <TabsContent value="posts" className="space-y-4">
               <Card>
                 <CardHeader className="pb-3">
                   <CardTitle>Tous les Articles</CardTitle>
                   <CardDescription>
                     Gérez vos articles de blog.
                   </CardDescription>
                 </CardHeader>
                 <CardContent>
                   {isLoadingPosts && <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin"/></div>}
                   {postsError && <p className="text-red-600 text-center p-4">{postsError}</p>}
                   {!isLoadingPosts && !postsError && (
                     <DataTable
                       data={posts}
                       columns={[
                         {
                           header: "Titre",
                           accessorKey: "title",
                           cell: (post) => (
                             <div className="font-medium">{post.title}</div>
                           ),
                           enableSorting: true
                         },
                         {
                           header: "Auteur",
                           accessorKey: "author",
                           cell: (post) => (
                             <div>{post.author?.firstName || post.author?.email || 'N/A'}</div>
                           )
                         },
                         {
                           header: "Catégorie",
                           accessorKey: "category",
                           cell: (post) => (
                             <Badge variant="outline">{post.category || 'N/A'}</Badge>
                           ),
                           enableSorting: true
                         },
                         {
                           header: "Publié",
                           accessorKey: "published",
                           cell: (post) => (
                             <div>{post.published ? 'Oui' : 'Non'}</div>
                           ),
                           enableSorting: true
                         },
                         {
                           header: "Date Création",
                           accessorKey: "createdAt",
                           cell: (post) => (
                             <div>{formatDate(post.createdAt)}</div>
                           ),
                           enableSorting: true
                         },
                         {
                           header: "Actions",
                           accessorKey: "id",
                           cell: (post) => (
                             <div className="flex justify-end gap-1">
                               <Button variant="ghost" size="icon" title="Prévisualiser" onClick={() => navigate(`/blog/${post.slug}`)}>
                                 <Eye className="h-4 w-4" />
                               </Button>
                               <Button variant="ghost" size="icon" title="Modifier" onClick={() => handleEditPost(post)}>
                                 <Edit className="h-4 w-4" />
                               </Button>
                               <ConfirmDialog
                                 title="Supprimer l'article"
                                 description="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
                                 triggerText=""
                                 icon={<Trash className="h-4 w-4" />}
                                 onConfirm={() => handleDeletePost(post.id)}
                                 destructive
                               />
                             </div>
                           ),
                           className: "w-[120px]"
                         }
                       ]}
                       searchPlaceholder="Rechercher des articles..."
                       searchFields={["title", "category"]}
                       emptyMessage="Aucun article trouvé."
                     />
                   )}
                 </CardContent>
               </Card>
            </TabsContent>

            {/* Onglet Utilisateurs */}
            <TabsContent value="users">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Utilisateurs</CardTitle>
                    <CardDescription>Liste des utilisateurs enregistrés.</CardDescription>
                  </div>
                  <Button
                    onClick={handleCreateUser}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter un utilisateur
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingUsers && <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin"/></div>}
                  {usersError && <p className="text-red-600 text-center p-4">{usersError}</p>}
                  {!isLoadingUsers && !usersError && (
                    <DataTable
                      data={users}
                      columns={[
                        {
                          header: "ID",
                          accessorKey: "id",
                          cell: (user) => (
                            <div className="font-mono text-xs">{user.id}</div>
                          )
                        },
                        {
                          header: "Email",
                          accessorKey: "email",
                          cell: (user) => (
                            <div>{user.email}</div>
                          ),
                          enableSorting: true
                        },
                        {
                          header: "Prénom",
                          accessorKey: "firstName",
                          cell: (user) => (
                            <div>{user.firstName || '-'}</div>
                          ),
                          enableSorting: true
                        },
                        {
                          header: "Nom",
                          accessorKey: "lastName",
                          cell: (user) => (
                            <div>{user.lastName || '-'}</div>
                          ),
                          enableSorting: true
                        },
                        {
                          header: "Rôle",
                          accessorKey: "role",
                          cell: (user) => (
                            <Badge variant={user.role === 'ADMIN' || user.role === 'SUPERADMIN' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          ),
                          enableSorting: true
                        },
                        {
                          header: "Créé le",
                          accessorKey: "createdAt",
                          cell: (user) => (
                            <div>{formatDate(user.createdAt)}</div>
                          ),
                          enableSorting: true
                        },
                        {
                          header: "Actions",
                          accessorKey: "id",
                          cell: (user) => (
                            <div className="flex justify-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 h-8 px-2"
                                onClick={() => handleEditUser(user)}
                              >
                                <UserCog className="h-4 w-4" />
                                Modifier
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 h-8 px-2 text-destructive border-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteUser(user)}
                              >
                                <X className="h-4 w-4" />
                                Supprimer
                              </Button>
                            </div>
                          )
                        }
                      ]}
                      searchPlaceholder="Rechercher des utilisateurs..."
                      searchFields={["email", "firstName", "lastName", "role"]}
                      emptyMessage="Aucun utilisateur trouvé."
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Editor */}
            <TabsContent value="editor">
              <BlogPostForm
                post={editingPost}
                isCreating={isCreating}
                onCancel={handleFormCancel}
                onSubmitSuccess={handleFormSubmitSuccess} // Passer la fonction de succès
              />
            </TabsContent>

             {/* Onglet Rendez-vous */}
             <TabsContent value="appointments">
                <AdminAppointmentsPage />
             </TabsContent>

             {/* Onglet Contacts */}
             <TabsContent value="contacts">
                <AdminContactsPage />
             </TabsContent>

             {/* Onglet Visites */}
             <TabsContent value="visits">
                <AdminVisitsPage />
             </TabsContent>

             {/* Onglet Paramètres */}
             <TabsContent value="settings">
                <AdminSettings />
             </TabsContent>

             {/* Onglet Commentaires (désactivé) */}
             <TabsContent value="comments">
                <Card>
                  <CardHeader>
                    <CardTitle>Commentaires</CardTitle>
                    <CardDescription>
                      Gérez les commentaires sur vos articles.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      La gestion des commentaires sera disponible dans une prochaine mise à jour.
                    </p>
                  </CardContent>
                </Card>
             </TabsContent>

          </Tabs>
        </div>
      </main>
      <Footer />
      <Toaster />

      {/* Modal d'édition d'utilisateur */}
      <UserEditModal
        user={selectedUser}
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleSaveUser}
      />

      {/* Dialog de confirmation avec mot de passe pour la suppression */}
      <PasswordConfirmDialog
        title="Confirmer la suppression"
        description={selectedUser ? `Pour supprimer l'utilisateur ${selectedUser.email}, veuillez confirmer avec votre mot de passe.` : ''}
        isOpen={isPasswordConfirmOpen}
        onClose={() => setIsPasswordConfirmOpen(false)}
        onConfirm={confirmDeleteUserWithPassword}
      />

      {/* Modal de création d'utilisateur */}
      <UserCreateModal
        isOpen={isUserCreateModalOpen}
        onClose={() => setIsUserCreateModalOpen(false)}
        onSave={handleSaveNewUser}
      />
    </div>
  );
};

export default AdminDashboard;
