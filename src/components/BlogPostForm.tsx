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
  "Development",
  "React",
  "JavaScript",
  "TypeScript",
  "CSS",
  "Performance",
  "Accessibility",
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
      alert("Please fill in all required fields");
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
      readTime: post?.readTime || "5 min read",
    };

    onSubmit(submissionData);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{isCreating ? "Create New Post" : "Edit Post"}</CardTitle>
          <CardDescription>
            {isCreating
              ? "Fill in the details to create a new blog post"
              : "Update the details of your blog post"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Permalink</Label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">/blog/</span>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="post-url-slug"
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Leave empty to generate from title
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Enter a brief summary of the post"
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="visual">Visual</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
              </TabsList>
              <TabsContent value="visual" className="mt-2">
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Enter the full content of the post"
                  required
                  rows={10}
                />
              </TabsContent>
              <TabsContent value="html" className="mt-2">
                <Textarea
                  id="content-html"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Enter HTML content"
                  required
                  rows={10}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Edit HTML directly for more control
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
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
            <Label htmlFor="image">Featured Image URL *</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
            {formData.image && (
              <div className="mt-2 aspect-video w-full max-w-md overflow-hidden rounded-md border">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                  <button
                    type="button"
                    className="ml-1 text-muted-foreground hover:text-foreground"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>External Links</Label>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr_auto] gap-2">
              <Input
                name="title"
                value={newLink.title}
                onChange={handleLinkChange}
                placeholder="Link Text"
              />
              <Input
                name="url"
                value={newLink.url}
                onChange={handleLinkChange}
                placeholder="https://example.com"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddLink();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddLink}>
                Add
              </Button>
            </div>
            <div className="mt-2 space-y-2">
              {formData.links.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{link.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {link.url}
                    </span>
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
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isCreating ? "Create Post" : "Update Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BlogPostForm;
