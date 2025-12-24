// Client/src/components/BlogPostForm.tsx
import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form"; // Importer Controller
import ReactQuill from 'react-quill'; // Réimporter ReactQuill
import 'react-quill/dist/quill.snow.css'; // Réimporter les styles
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Type Post (content est maintenant string)
interface Post {
  id: string;
  title: string;
  content: string; // Doit être string pour ReactQuill
  category?: string | null;
  published: boolean;
}

// Type pour les valeurs du formulaire (inclut content)
interface BlogPostFormValues {
  title: string;
  content: string; // Réinclure content
  category?: string;
  published: boolean;
}
interface BlogPostFormProps {
  post?: Post | null; // Post existant pour l'édition
  isCreating: boolean;
  onCancel: () => void;
  onSubmitSuccess: () => void; // Callback en cas de succès
}

// Fonction utilitaire API (peut être externalisée)
const fetchApi = async (url: string, method: string = 'GET', body?: any) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error("Non authentifié.");
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
  if (body) options.body = JSON.stringify(body);
  const response = await fetch(apiUrl, options);
  if (response.status === 204) return null; // Pour DELETE
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      // Redirection gérée globalement ou dans le composant appelant
    }
    throw new Error(data.error || `HTTP error! status: ${response.status}`);
  }
  return data;
};

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, isCreating, onCancel, onSubmitSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<BlogPostFormValues>({
    defaultValues: {
      title: "",
      content: "", // Contenu initial vide
      category: "",
      published: false,
    },
  });

  const [contentValue, setContentValue] = useState<string>(
    post?.content || ""
  );

  // Référence à l'éditeur ReactQuill
  const quillRef = useRef<any>(null);

  // Pré-remplir le formulaire
  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title || "",
        content: post.content || "", // Pré-remplir ReactQuill
        category: post.category || "",
        published: post.published || false,
      });
    } else {
      form.reset({
        title: "",
        content: "",
        category: "",
        published: false,
      });
    }
  }, [post, form]);

  const onSubmit = async (values: BlogPostFormValues) => {
    setIsLoading(true);
    setError(null);

    // Validation simple du contenu (ReactQuill peut retourner '<p><br></p>' pour un champ vide)
    if (!values.content || values.content === '<p><br></p>') {
      form.setError('content', { type: 'manual', message: 'Le contenu est requis.' });
      setIsLoading(false);
      return;
    }

    try {
      // S'assurer que le contenu HTML est valide et pas échappé
      let htmlContent = values.content;

      // Si le contenu contient des balises échappées, les décoder
      if (htmlContent.includes('&lt;') || htmlContent.includes('&gt;')) {
        console.log("Décodage des entités HTML détecté dans le contenu");
        const textarea = document.createElement('textarea');
        textarea.innerHTML = htmlContent;
        htmlContent = textarea.value;
      }

      // Vérifier si le contenu est valide
      if (!htmlContent.startsWith('<') && htmlContent.includes('<')) {
        console.warn("Le contenu HTML ne semble pas correctement formaté");
      }

      let result;
      // Le payload avec le contenu nettoyé
      const payload = {
        title: values.title,
        content: htmlContent, // Contenu HTML nettoyé
        category: values.category || null,
        published: values.published,
      };

      console.log("Contenu envoyé à l'API:", payload.content); // Log du contenu HTML
      if (isCreating) {
        result = await fetchApi('/api/admin/posts', 'POST', payload);
        alert("Article créé avec succès !");
      } else if (post?.id) {
        result = await fetchApi(`/api/admin/posts/${post.id}`, 'PUT', payload);
        alert("Article mis à jour avec succès !");
      } else {
        throw new Error("Impossible de déterminer l'action : création ou mise à jour.");
      }
      onSubmitSuccess();

    } catch (err: any) {
      console.error("Erreur lors de la soumission du post:", err);
      setError(err.message || 'Une erreur est survenue.');
      if (err.message === "Non authentifié." || err.message?.includes('401') || err.message?.includes('403')) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Configuration ReactQuill - Correction des modules pour assurer le bon fonctionnement des menus
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
    clipboard: {
      // Prévenir les sauts de ligne excessifs lors du collage
      matchVisual: false
    }
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code-block', 'color', 'background', 'align'
  ];


  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>{isCreating ? "Créer un nouvel article" : "Modifier l'article"}</CardTitle>
            <CardDescription>
              {isCreating ? "Remplissez les détails requis." : "Mettez à jour les détails de l'article."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: 'Le titre est requis' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre de l'article" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Éditeur ReactQuill avec référence */}
            <FormField
              control={form.control}
              name="content"
              rules={{
                validate: value => (value && value !== '<p><br></p>') || 'Le contenu est requis'
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenu *</FormLabel>
                  <FormControl>
                    <ReactQuill
                      ref={quillRef}
                      theme="snow"
                      value={field.value}
                      onChange={(content, delta, source, editor) => {
                        field.onChange(content);
                        setContentValue(content);
                      }}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Écrivez votre article ici..."
                      className="bg-background rounded-md editor-compact"
                      readOnly={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Utilisez l'éditeur pour formater votre texte.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Section Prévisualisation */}
            <div className="space-y-2">
              <Label>Prévisualisation</Label>
              <div
                className="prose prose-sm dark:prose-invert max-w-none p-4 border rounded-md min-h-[100px] bg-muted/40 overflow-auto blog-preview"
                dangerouslySetInnerHTML={{
                  __html: (() => {
                    // Nettoyage du contenu pour la prévisualisation
                    if (!contentValue) return '<p><i>Commencez à écrire...</i></p>';

                    // Décodage des entités HTML si nécessaire
                    if (contentValue.includes('&lt;') || contentValue.includes('&gt;')) {
                      const textarea = document.createElement('textarea');
                      textarea.innerHTML = contentValue;
                      return textarea.value;
                    }

                    return contentValue;
                  })()
                }}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Développement Web" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Publier</FormLabel>
                    <FormDescription>
                      Rendre cet article visible publiquement.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isCreating ? "Créer l'article" : "Mettre à jour"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default BlogPostForm;
