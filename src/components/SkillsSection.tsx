import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  FaReact, 
  FaNodeJs, 
  FaDocker, 
  FaGitAlt,
  FaFigma
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiExpress, 
  SiMongodb, 
  SiGraphql,
  SiNextdotjs
} from "react-icons/si";
import { MdDesignServices } from "react-icons/md";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "design" | "tools";
}

interface SkillsSectionProps {
  title?: string;
  description?: string;
}

const getSkillIcon = (skillName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    "React": <FaReact className="w-5 h-5 text-[#61DAFB]" />,
    "TypeScript": <SiTypescript className="w-5 h-5 text-[#3178C6]" />,
    "Tailwind CSS": <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" />,
    "Next.js": <SiNextdotjs className="w-5 h-5 text-[#000000] dark:text-white" />,
    "Node.js": <FaNodeJs className="w-5 h-5 text-[#339933]" />,
    "Express": <SiExpress className="w-5 h-5 text-[#000000] dark:text-white" />,
    "MongoDB": <SiMongodb className="w-5 h-5 text-[#47A248]" />,
    "GraphQL": <SiGraphql className="w-5 h-5 text-[#E10098]" />,
    "Figma": <FaFigma className="w-5 h-5 text-[#F24E1E]" />,
    "UI/UX Design": <MdDesignServices className="w-5 h-5 text-[#FF69B4]" />,
    "Git": <FaGitAlt className="w-5 h-5 text-[#F05032]" />,
    "Docker": <FaDocker className="w-5 h-5 text-[#2496ED]" />,
  };
  return icons[skillName] || null;
};

const skills = {
  frontend: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Next.js", level: 85 },
  ],
  backend: [
    { name: "Node.js", level: 80 },
    { name: "Express", level: 75 },
    { name: "MongoDB", level: 70 },
    { name: "GraphQL", level: 70 },
  ],
  design: [
    { name: "Figma", level: 85 },
    { name: "UI/UX Design", level: 80 },
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 65 },
  ],
};

const SkillsSection = ({
  title = "Compétences",
  description = "Mes compétences techniques et mon niveau d'expertise",
}: SkillsSectionProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-[700px] mb-8">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Frontend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skills.frontend.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getSkillIcon(skill.name)}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Backend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skills.backend.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getSkillIcon(skill.name)}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Design</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skills.design.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getSkillIcon(skill.name)}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skills.tools.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getSkillIcon(skill.name)}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
