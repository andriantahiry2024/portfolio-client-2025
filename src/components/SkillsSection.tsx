import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "design" | "tools";
}

interface SkillsSectionProps {
  title?: string;
  description?: string;
  skills?: Skill[];
}

const SkillsSection = ({
  title = "Compétences",
  description = "Voici un aperçu de mes compétences techniques et de mon niveau d'expertise dans différents domaines.",
  skills = [
    { name: "React", level: 90, category: "frontend" },
    { name: "TypeScript", level: 85, category: "frontend" },
    { name: "Tailwind CSS", level: 95, category: "frontend" },
    { name: "Node.js", level: 80, category: "backend" },
    { name: "Express", level: 75, category: "backend" },
    { name: "MongoDB", level: 70, category: "backend" },
    { name: "Figma", level: 85, category: "design" },
    { name: "UI/UX Design", level: 80, category: "design" },
    { name: "Git", level: 90, category: "tools" },
    { name: "Docker", level: 65, category: "tools" },
    { name: "Next.js", level: 85, category: "frontend" },
    { name: "GraphQL", level: 70, category: "backend" },
  ],
}: SkillsSectionProps) => {
  // Group skills by category
  const categories = {
    frontend: skills.filter((skill) => skill.category === "frontend"),
    backend: skills.filter((skill) => skill.category === "backend"),
    design: skills.filter((skill) => skill.category === "design"),
    tools: skills.filter((skill) => skill.category === "tools"),
  };

  return (
    <section id="skills" className="py-20 bg-background w-full">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-[700px] mb-8">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Object.entries(categories).map(([category, categorySkills]) => (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-semibold capitalize">{category}</h3>
                <div className="h-px flex-1 bg-border"></div>
              </div>

              <div className="space-y-6">
                {categorySkills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {skill.level}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
