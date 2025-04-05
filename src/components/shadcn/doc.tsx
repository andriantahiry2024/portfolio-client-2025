import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    HomeIcon,
    User,
    Code2,
    Briefcase,
    Mail,
    FileText,
    SunMoon,
  } from 'lucide-react';
  
  import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
  
  interface DockMenuItemProps {
    title: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }
  
  const data = [
    {
      title: 'Accueil',
      icon: (
        <HomeIcon className='w-5 h-5 text-black dark:text-black' />
      ),
      onClick: () => {
        document.getElementById("home")?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      title: 'À propos',
      icon: (
        <User className='w-5 h-5 text-black dark:text-black' />
      ),
      onClick: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      title: 'Compétences',
      icon: (
        <Code2 className='w-5 h-5 text-black dark:text-black' />
      ),
      onClick: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      title: 'Projets',
      icon: (
        <Briefcase className='w-5 h-5 text-black dark:text-black' />
      ),
      onClick: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      title: 'CV',
      icon: (
        <FileText className='w-5 h-5 text-black dark:text-black' />
      ),
      onClick: () => {
        window.open("/cv.pdf", "_blank");
      },
    },
    {
      title: 'Contact',
      icon: (
        <Mail className='w-5 h-5 text-black dark:text-black' />
      ),
      onClick: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      title: 'Thème',
      icon: (
        <SunMoon className='w-5 h-5 text-black dark:text-black' />
      ),
      onClick: () => {
        document.getElementById("theme")?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];
  
  const DockMenuItem: React.FC<DockMenuItemProps> = ({ title, icon, onClick }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
  
    const rotateX = useTransform(mouseY, [-100, 100], [30, -30]);
    const rotateY = useTransform(mouseX, [-100, 100], [-30, 30]);
  
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left - rect.width / 2);
      mouseY.set(event.clientY - rect.top - rect.height / 2);
    };
  
    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };
  
    return (
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="relative cursor-pointer group"
      >
        <div className="flex flex-col items-center gap-1">
          <div className="p-2 rounded-xl bg-white/80 dark:bg-white/80 backdrop-blur-md border border-white/20 shadow-sm">
            {icon}
          </div>
          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-white">
            {title}
          </span>
        </div>
      </motion.div>
    );
  };
  
  export function AppleStyleDock() {
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-auto z-50 px-4 py-2 rounded-2xl bg-white/20 dark:bg-white/20 backdrop-blur-md border border-white/20 shadow-xl">
        <div className="flex items-center justify-center gap-4">
          {data.map((item, index) => (
            <DockMenuItem key={index} {...item} />
          ))}
        </div>
      </div>
    );
  }
  