import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Calendar, Clock, Edit, Trash, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { blogPosts } from "../data/blogData";

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState(blogPosts.find((p) => p.id === Number(id)));

  useEffect(() => {
    // If post not found, redirect to blog page
    if (!post) {
      navigate("/blog");
    }
  }, [post, navigate]);

  if (!post) return null;

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/blog")}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour au Blog
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border border-border/40 bg-card">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6 pt-0">
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <CardDescription className="text-muted-foreground text-lg mb-6">
                  {post.excerpt}
                </CardDescription>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>
                    {post.content ||
                      "Ceci est un emplacement pour le contenu complet de l'article de blog. Dans une application réelle, il s'agirait d'un contenu en texte riche ou en markdown avec une mise en forme appropriée, des images, des extraits de code, etc."}
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec auctor, nisl eget ultricies tincidunt, nisl nisl
                    aliquam nisl, eget ultricies nisl nisl eget nisl. Donec
                    auctor, nisl eget ultricies tincidunt, nisl nisl aliquam
                    nisl, eget ultricies nisl nisl eget nisl.
                  </p>
                  <h2>Titre de section</h2>
                  <p>
                    Donec auctor, nisl eget ultricies tincidunt, nisl nisl
                    aliquam nisl, eget ultricies nisl nisl eget nisl. Donec
                    auctor, nisl eget ultricies tincidunt, nisl nisl aliquam
                    nisl, eget ultricies nisl nisl eget nisl.
                  </p>
                  <ul>
                    <li>Premier élément de liste</li>
                    <li>Deuxième élément de liste</li>
                    <li>Troisième élément de liste</li>
                  </ul>
                  <p>
                    Donec auctor, nisl eget ultricies tincidunt, nisl nisl
                    aliquam nisl, eget ultricies nisl nisl eget nisl.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostDetail;
