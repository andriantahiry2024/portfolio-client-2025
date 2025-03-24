import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Edit, Plus, Trash } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { blogPosts } from "../data/blogData";
import BlogPostForm from "./BlogPostForm";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Filter posts by search term
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreatePost = () => {
    setIsCreating(true);
    setEditingPost(null);
    setActiveTab("editor");
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setIsCreating(false);
    setActiveTab("editor");
  };

  const handleDeletePost = (postId) => {
    // In a real app, this would call an API to delete the post
    alert(`Post ${postId} would be deleted in a real application`);
  };

  const handleFormCancel = () => {
    setActiveTab("posts");
    setIsCreating(false);
    setEditingPost(null);
  };

  const handleFormSubmit = (postData) => {
    // In a real app, this would call an API to save the post
    alert(
      `Post would be ${isCreating ? "created" : "updated"} in a real application`,
    );
    setActiveTab("posts");
    setIsCreating(false);
    setEditingPost(null);
  };

  // Format date
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
                Manage your blog posts and website content
              </p>
            </div>
            <Button
              onClick={handleCreatePost}
              className="mt-4 md:mt-0"
              disabled={activeTab === "editor"}
            >
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </div>

          <Tabs
            defaultValue="posts"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="posts">Blog Posts</TabsTrigger>
              <TabsTrigger value="comments" disabled>
                Comments
              </TabsTrigger>
              <TabsTrigger value="settings" disabled>
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>All Posts</CardTitle>
                  <CardDescription>
                    Manage your blog posts. You can edit, delete, or create new
                    posts.
                  </CardDescription>
                  <div className="mt-4">
                    <Input
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-md"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPosts.length > 0 ? (
                          filteredPosts.map((post) => (
                            <TableRow key={post.id}>
                              <TableCell className="font-medium">
                                {post.title}
                              </TableCell>
                              <TableCell>{post.author}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{post.category}</Badge>
                              </TableCell>
                              <TableCell>{formatDate(post.date)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditPost(post)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive"
                                    onClick={() => handleDeletePost(post.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="text-center h-24 text-muted-foreground"
                            >
                              No posts found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="editor">
              <BlogPostForm
                post={editingPost}
                isCreating={isCreating}
                onCancel={handleFormCancel}
                onSubmit={handleFormSubmit}
              />
            </TabsContent>

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
