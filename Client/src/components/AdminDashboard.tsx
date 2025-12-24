// Client/src/components/AdminDashboard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Edit, Plus, Trash, Users, Loader2, Eye } from "lucide-react"; // Ajouter Eye
import Navbar from "./Navbar";
import Footer from "./Footer";
// import { blogPosts } from "../data/blogData";
import BlogPostForm from "./BlogPostForm";
import AdminAppointmentsPage from "./AdminAppointmentsPage"; // Importer la page des RDV
import AdminContactsPage from "./AdminContactsPage"; // Importer la page des contacts
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
  const [activeTab, setActiveTab] = useState("posts");
  const [searchTerm, setSearchTerm] = useState(""); // Garder pour filtrer les posts affichés
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null); // Utiliser le type Post

  // États pour les utilisateurs (inchangés)
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  // États pour les posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  // Fonction utilitaire pour les appels API (évite la répétition)
  const fetchApi = async (url: string, method: string = 'GET', body?: any) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error("Non authentifié."); // Gérer l'absence de token
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
    const apiUrl = `${backendUrl}${url}`;

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

  // --- Logique pour récupérer les Utilisateurs (inchangée) ---
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

  // --- useEffect pour charger les données de l'onglet actif ---
  useEffect(() => {
    if (activeTab === 'posts') {
      fetchPosts();
    } else if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);


  // --- Logique CRUD Posts ---
  const handleCreatePost = () => {
    setIsCreating(true);
    setEditingPost(null);
    setActiveTab("editor");
  };

  const handleEditPost = (post: Post) => { // Utiliser le type Post
    setEditingPost(post);
    setIsCreating(false);
    setActiveTab("editor");
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
    setActiveTab("posts");
    setIsCreating(false);
    setEditingPost(null);
  };

  // La soumission est gérée dans BlogPostForm, mais on rafraîchit ici
   const handleFormSubmitSuccess = () => {
     setActiveTab("posts");
     setIsCreating(false);
     setEditingPost(null);
     fetchPosts(); // Rafraîchir la liste des posts
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
                 Gérez votre site web
               </p>
             </div>
             {/* Afficher le bouton New Post seulement si on n'est pas dans l'éditeur */}
             {activeTab !== 'editor' && (
                <Button onClick={handleCreatePost} className="mt-4 md:mt-0">
                  <Plus className="mr-2 h-4 w-4" /> New Post
                </Button>
             )}
          </div>

          {/* Réintroduire les onglets */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Ajuster grid-cols pour le nombre total d'onglets visibles */}
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="posts">Blog Posts</TabsTrigger>
              <TabsTrigger value="appointments">Rendez-vous</TabsTrigger> {/* Nouvel onglet RDV */}
              <TabsTrigger value="contacts">Contacts</TabsTrigger> {/* Nouvel onglet Contacts */}
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="comments" disabled>Comments</TabsTrigger>
              <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
            </TabsList>

            {/* Onglet Posts */}
            <TabsContent value="posts" className="space-y-4">
               <Card>
                 <CardHeader className="pb-3">
                   <CardTitle>Tous les Articles</CardTitle>
                   <CardDescription>
                     Gérez vos articles de blog.
                   </CardDescription>
                   <div className="mt-4">
                     <Input
                       placeholder="Rechercher des articles..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="max-w-md"
                     />
                   </div>
                 </CardHeader>
                 <CardContent>
                   {isLoadingPosts && <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin"/></div>}
                   {postsError && <p className="text-red-600 text-center p-4">{postsError}</p>}
                   {!isLoadingPosts && !postsError && (
                     <div className="rounded-md border">
                       <Table>
                         <TableHeader>
                           <TableRow>
                             <TableHead>Titre</TableHead>
                             <TableHead>Auteur</TableHead>
                             <TableHead>Catégorie</TableHead>
                             <TableHead>Publié</TableHead>
                             <TableHead>Date Création</TableHead>
                             <TableHead className="text-right w-[120px]">Actions</TableHead>
                           </TableRow>
                         </TableHeader>
                         <TableBody>
                           {filteredPosts.length > 0 ? (
                             filteredPosts.map((post) => (
                               <TableRow key={post.id}>
                                 <TableCell className="font-medium">{post.title}</TableCell>
                                 <TableCell>{post.author?.firstName || post.author?.email || 'N/A'}</TableCell>
                                 <TableCell><Badge variant="outline">{post.category || 'N/A'}</Badge></TableCell>
                                 <TableCell>{post.published ? 'Oui' : 'Non'}</TableCell>
                                 <TableCell>{formatDate(post.createdAt)}</TableCell>
                                 <TableCell className="text-right">
                                   <div className="flex justify-end gap-1">
                                      <Button variant="ghost" size="icon" title="Prévisualiser" onClick={() => navigate(`/blog/${post.slug}`)}>
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon" title="Modifier" onClick={() => handleEditPost(post)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon" title="Supprimer" className="text-destructive hover:text-destructive/80" onClick={() => handleDeletePost(post.id)}>
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                   </div>
                                 </TableCell>
                               </TableRow>
                             ))
                           ) : (
                             <TableRow>
                               <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                 Aucun article trouvé.
                               </TableCell>
                             </TableRow>
                           )}
                         </TableBody>
                       </Table>
                     </div>
                   )}
                 </CardContent>
               </Card>
            </TabsContent>

            {/* Onglet Utilisateurs */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Utilisateurs</CardTitle>
                  <CardDescription>Liste des utilisateurs enregistrés.</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingUsers && <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin"/></div>}
                  {usersError && <p className="text-red-600 text-center p-4">{usersError}</p>}
                  {!isLoadingUsers && !usersError && (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Prénom</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Rôle</TableHead>
                            <TableHead>Créé le</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.length > 0 ? (
                            users.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell className="font-mono text-xs">{user.id}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.firstName || '-'}</TableCell>
                                <TableCell>{user.lastName || '-'}</TableCell>
                                <TableCell><Badge variant={user.role === 'ADMIN' || user.role === 'SUPERADMIN' ? 'default' : 'secondary'}>{user.role}</Badge></TableCell>
                                <TableCell>{formatDate(user.createdAt)}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                Aucun utilisateur trouvé.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
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

             {/* Onglets Comments et Settings (inchangés) */}
             <TabsContent value="comments">
                <Card>
                  <CardHeader>
                    <CardTitle>Comments</CardTitle>
                    <CardDescription>
                      Manage comments on your blog posts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Comment management will be available in a future update.
                    </p>
                  </CardContent>
                </Card>
             </TabsContent>
             <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>
                      Configure your blog settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Settings will be available in a future update.
                    </p>
                  </CardContent>
                </Card>
             </TabsContent>

          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
