// Client/src/components/BlogPostDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Calendar, User, Loader2 } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Type Post (content est string)
interface PostDetail {
  id: string;
  title: string;
  content: string; // Contenu HTML brut
  category?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  author?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string;
  }
}

// Fonction simple pour décoder et nettoyer le HTML
const prepareHtmlContent = (content: string | null | undefined): string => {
  if (!content) return '';
  
  // Si le contenu semble contenir des balises HTML non interprétées
  if (typeof content === 'string' && 
      (content.includes('&lt;') || content.includes('&gt;'))) {
    // Utiliser un élément textarea pour décoder les entités HTML
    const textarea = document.createElement('textarea');
    textarea.innerHTML = content;
    return textarea.value;
  }
  
  return content;
};

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError("Slug manquant dans l'URL.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      const apiUrl = `${backendUrl}/api/posts/${slug}`; // Endpoint public

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          if (response.status === 404) {
             throw new Error("Article non trouvé.");
          }
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data: PostDetail = await response.json();
        
        // On ne modifie pas data.content ici pour éviter de perdre les données originales
        setPost(data);
      } catch (err: any) {
        console.error("Erreur lors de la récupération de l'article:", err);
        setError(err.message || "Impossible de charger l'article.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
       year: "numeric",
       month: "long",
       day: "numeric",
     };
     return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
     return (
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="pt-24 pb-20">
            <div className="container mx-auto px-4 text-center">
               <h1 className="text-2xl font-bold mb-4 text-destructive">Erreur</h1>
               <p className="text-muted-foreground mb-4">{error}</p>
               <Button onClick={() => navigate("/blog")}>Retour au Blog</Button>
            </div>
          </main>
          <Footer />
        </div>
     );
  }

  if (!post) return null;
  
  // Préparer le contenu HTML seulement quand nécessaire (au moment du rendu)
  const cleanContent = prepareHtmlContent(post.content);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate("/blog")} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour au Blog
            </Button>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className="mb-8">
               {post.category && (
                 <Badge className="mb-2">{post.category}</Badge>
               )}
               <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">{post.title}</h1>
               <div className="flex items-center text-sm text-muted-foreground space-x-4">
                 <div className="flex items-center">
                   <Calendar className="h-4 w-4 mr-1" />
                   <span>Publié le {formatDate(post.createdAt)}</span>
                 </div>
                 {(post.author?.firstName || post.author?.lastName) && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>Par {post.author.firstName} {post.author.lastName}</span>
                    </div>
                 )}
               </div>
            </header>

            {/* Utiliser le contenu nettoyé */}
            <div
              className="prose prose-base dark:prose-invert max-w-none blog-content"
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />

          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostDetail;
