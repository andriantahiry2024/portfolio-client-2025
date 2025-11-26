import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { blogPosts as defaultPosts, BlogPost } from "../data/blogData";

interface BlogSectionProps {
  title?: string;
  description?: string;
  posts?: BlogPost[];
}

const BlogSection = ({
  title = "Articles Récents",
  description = "Découvrez des analyses, tutoriels et réflexions sur le développement web, le design et la technologie.",
  posts = defaultPosts.slice(0, 3),
}: BlogSectionProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = ["Tous", ...new Set(posts.map((post) => post.category))];

  // Filter posts by category
  const filteredPosts =
    selectedCategory && selectedCategory !== "Tous"
      ? posts.filter((post) => post.category === selectedCategory)
      : posts;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

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
    <section id="blog" className="py-20 bg-background w-full">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto mb-8">
            {description}
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category ||
                  (category === "Tous" && !selectedCategory)
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() =>
                  setSelectedCategory(category === "Tous" ? null : category)
                }
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-border/40 bg-card">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
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
                  </div>
                  <CardTitle className="text-xl font-bold hover:text-primary transition-colors">
                    <a
                      href={`/blog/${post.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/blog/${post.id}`);
                      }}
                    >
                      {post.title}
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <CardDescription className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {post.author}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="px-8"
            onClick={() => navigate("/blog")}
          >
            Voir tous les articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
