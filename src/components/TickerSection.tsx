import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useInView,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TickerItem {
  text: string;
  icon?: React.ReactNode;
}

interface TickerSectionProps {
  items?: TickerItem[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  backgroundColor?: string;
  textColor?: string;
}

const TickerSection = ({
  items = [
    { text: "React" },
    { text: "TypeScript" },
    { text: "Tailwind CSS" },
    { text: "Next.js" },
    { text: "Node.js" },
    { text: "GraphQL" },
    { text: "MongoDB" },
    { text: "PostgreSQL" },
    { text: "Docker" },
    { text: "AWS" },
  ],
  speed = 40,
  direction = "left",
  className,
  backgroundColor = "bg-primary",
  textColor = "text-primary-foreground",
}: TickerSectionProps) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(tickerRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  useEffect(() => {
    if (isInView) {
      controls.start({
        x:
          direction === "left"
            ? ["-33.33%", "-66.66%"]
            : ["-66.66%", "-33.33%"],
        transition: {
          x: {
            duration: duplicatedItems.length * (100 / speed),
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        },
      });
    } else {
      controls.stop();
    }

    return () => {
      controls.stop();
    };
  }, [controls, direction, duplicatedItems.length, isInView, speed]);

  return (
    <div
      ref={tickerRef}
      className={cn(
        "w-full overflow-hidden py-6",
        backgroundColor,
        textColor,
        className,
      )}
    >
      <div className="relative w-full">
        <motion.div
          className="flex whitespace-nowrap"
          animate={controls}
          initial={{ x: direction === "left" ? "0%" : "-33.33%" }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-8 text-xl font-bold"
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span>{item.text}</span>
              <span className="mx-4">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TickerSection;
