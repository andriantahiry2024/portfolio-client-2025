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
    title: "Création de Sites Web Responsifs avec Tailwind CSS",
    excerpt:
      "Apprenez à créer rapidement des sites web beaux et responsifs en utilisant les classes utilitaires de Tailwind CSS.",
    content: "Le contenu complet irait ici...",
    date: "2023-06-15",
    author: "John Doe",
    readTime: "5 min de lecture",
    category: "Développement",
    tags: ["Tailwind CSS", "Design Responsif", "Développement Web"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    id: 2,
    title: "L'Avenir de React : Ce qui Arrive en 2023",
    excerpt:
      "Explorez les fonctionnalités et améliorations à venir dans React qui changeront la façon dont nous construisons des applications.",
    content: "Le contenu complet irait ici...",
    date: "2023-05-28",
    author: "Jane Smith",
    readTime: "8 min de lecture",
    category: "React",
    tags: ["React", "JavaScript", "Développement Web"],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    id: 3,
    title: "Optimisation des Performances dans les Applications Web Modernes",
    excerpt:
      "Découvrez des techniques et bonnes pratiques pour améliorer les performances de vos applications web.",
    content: "Le contenu complet irait ici...",
    date: "2023-05-10",
    author: "Alex Johnson",
    readTime: "6 min de lecture",
    category: "Performance",
    tags: ["Performance", "Développement Web", "Optimisation"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: 4,
    title: "Introduction à TypeScript pour les Développeurs JavaScript",
    excerpt:
      "Découvrez comment TypeScript peut améliorer votre développement JavaScript avec le typage statique et des fonctionnalités avancées.",
    content: "Le contenu complet irait ici...",
    date: "2023-04-22",
    author: "Sarah Williams",
    readTime: "7 min de lecture",
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Développement Web"],
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
  },
  {
    id: 5,
    title: "Création d'Applications Web Accessibles",
    excerpt:
      "Découvrez comment rendre vos applications web accessibles à tous les utilisateurs, y compris ceux ayant des handicaps.",
    content: "Le contenu complet irait ici...",
    date: "2023-04-05",
    author: "Michael Brown",
    readTime: "9 min de lecture",
    category: "Accessibilité",
    tags: ["Accessibilité", "Développement Web", "UX"],
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
  },
  {
    id: 6,
    title: "Techniques CSS Modernes que Chaque Développeur Devrait Connaître",
    excerpt:
      "Explorez des techniques CSS modernes comme Grid, Flexbox et les variables CSS qui peuvent transformer votre développement web.",
    content: "Le contenu complet irait ici...",
    date: "2023-03-18",
    author: "Emily Davis",
    readTime: "6 min de lecture",
    category: "CSS",
    tags: ["CSS", "Développement Web", "Design"],
    image:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
  },
];
