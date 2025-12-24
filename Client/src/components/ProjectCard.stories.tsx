import React from "react";
import ProjectCard from "./ProjectCard";

export default {
  title: "Components/ProjectCard",
  component: ProjectCard,
};

export const Default = () => (
  <div className="max-w-md">
    <ProjectCard
      title="E-Commerce Platform"
      description="A full-featured e-commerce platform with product management, cart functionality, and secure checkout process."
      image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
      technologies={["React", "Node.js", "MongoDB", "Stripe"]}
      githubUrl="#"
      liveUrl="#"
    />
  </div>
);

export const WithoutLinks = () => (
  <div className="max-w-md">
    <ProjectCard
      title="Portfolio Website"
      description="A modern portfolio website showcasing projects and skills with a clean, minimalist design."
      image="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80"
      technologies={["React", "Tailwind CSS", "Framer Motion"]}
    />
  </div>
);
