import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { X, Link as LinkIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const categories = [
  "Développement",
  "React",
  "JavaScript",
  "TypeScript",
  "CSS",
  "Performance",
  "Accessibilité",
  "Design",
];

const BlogPostForm = ({ post, isCreating, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: [],
    image: "",
    slug: "",
    links: [],
  });
  const [newTag, setNewTag] = useState("");
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [activeTab, setActiveTab] = useState("visual");

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        excerpt: post.excerpt || "",
        content: post.content || "",
        author: post.author || "",
        category: post.category || "",
        tags: post.tags || [],
        image: post.image || "",
        slug: post.slug || "",
        links: post.links || [],
      });
    } else {
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        category: "",
        tags: [],
        image: "",
        slug: "",
        links: [],
      });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      setFormData((prev) => ({
        ...prev,
        links: [...prev.links, { ...newLink }],
      }));
      setNewLink({ title: "", url: "" });
    }
  };

  const handleRemoveLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setNewLink((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation here
    const isValid = formData.title && formData.excerpt && formData.content;

    if (!isValid) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Generate slug from title if not provided
    const slug =
      formData.slug.trim() ||
      formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // In a real app, we would add date, readTime, etc.
    const submissionData = {
      ...formData,
      slug,
      id: post?.id || Date.now(),
      date: post?.date || new Date().toISOString().split("T")[0],
      readTime: post?.readTime || "5 min de lecture",
    };

    onSubmit(submissionData);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{isCreating ? "Créer un nouvel article" : "Modifier l'article"}</CardTitle>
          <CardDescription>
            {isCreating
              ? "Remplissez les détails pour créer un nouvel article de blog"
              : "Mettez à jour les détails de votre article de blog"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Entrez le titre de l'article"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Permalien</Label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">/blog/</span>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="slug-url-article"
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Laissez vide pour générer à partir du titre
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Extrait *</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Écrivez un résumé attrayant de votre article"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenu *</Label>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-2">
                <TabsTrigger value="visual">Éditeur</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
              </TabsList>
              <TabsContent value="visual">
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Écrivez votre article ici"
                  className="min-h-[300px]"
                  required
                />
              </TabsContent>
              <TabsContent value="html">
                <Textarea
                  id="content-html"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="<p>Écrivez votre HTML ici</p>"
                  className="min-h-[300px] font-mono"
                  required
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Auteur *</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Votre nom"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie *</Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL *</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://exemple.com/image.jpg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Ajouter un tag"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={!newTag.trim()}
              >
                Ajouter
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Liens</Label>
            <div className="space-y-4 mb-4">
              {formData.links.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 border rounded-md"
                >
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      {link.title}
                    </a>
                    <p className="text-xs text-muted-foreground truncate">
                      {link.url}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveLink(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Titre du lien"
                  name="title"
                  value={newLink.title}
                  onChange={handleLinkChange}
                />
                <Input
                  placeholder="URL"
                  name="url"
                  value={newLink.url}
                  onChange={handleLinkChange}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddLink}
                className="w-full"
                disabled={!newLink.title.trim() || !newLink.url.trim()}
              >
                Ajouter un lien
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
          >
            Annuler
          </Button>
          <Button type="submit">
            {isCreating ? "Publier l'article" : "Mettre à jour l'article"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BlogPostForm;
