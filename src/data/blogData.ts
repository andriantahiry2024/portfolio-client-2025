export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Responsive Websites with Tailwind CSS",
    excerpt:
      "Learn how to create beautiful, responsive websites quickly using Tailwind CSS utility classes.",
    content: "Full content would go here...",
    date: "2023-06-15",
    author: "John Doe",
    readTime: "5 min read",
    category: "Development",
    tags: ["Tailwind CSS", "Responsive Design", "Web Development"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    id: 2,
    title: "The Future of React: What's Coming in 2023",
    excerpt:
      "Explore the upcoming features and improvements in React that will change how we build applications.",
    content: "Full content would go here...",
    date: "2023-05-28",
    author: "Jane Smith",
    readTime: "8 min read",
    category: "React",
    tags: ["React", "JavaScript", "Web Development"],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    id: 3,
    title: "Optimizing Performance in Modern Web Applications",
    excerpt:
      "Discover techniques and best practices to improve the performance of your web applications.",
    content: "Full content would go here...",
    date: "2023-05-10",
    author: "Alex Johnson",
    readTime: "6 min read",
    category: "Performance",
    tags: ["Performance", "Web Development", "Optimization"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: 4,
    title: "Introduction to TypeScript for JavaScript Developers",
    excerpt:
      "Learn how TypeScript can enhance your JavaScript development with static typing and advanced features.",
    content: "Full content would go here...",
    date: "2023-04-22",
    author: "Sarah Williams",
    readTime: "7 min read",
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Web Development"],
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
  },
  {
    id: 5,
    title: "Creating Accessible Web Applications",
    excerpt:
      "Discover how to make your web applications accessible to all users, including those with disabilities.",
    content: "Full content would go here...",
    date: "2023-04-05",
    author: "Michael Brown",
    readTime: "9 min read",
    category: "Accessibility",
    tags: ["Accessibility", "Web Development", "UX"],
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
  },
  {
    id: 6,
    title: "Modern CSS Techniques Every Developer Should Know",
    excerpt:
      "Explore modern CSS techniques like Grid, Flexbox, and CSS Variables that can transform your web development.",
    content: "Full content would go here...",
    date: "2023-03-18",
    author: "Emily Davis",
    readTime: "6 min read",
    category: "CSS",
    tags: ["CSS", "Web Development", "Design"],
    image:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
  },
];
