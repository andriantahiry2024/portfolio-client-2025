import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SliderSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

const SliderSection = ({
  title = "Interactive Experience",
  description = "Adjust the sliders below to see how different parameters affect the visual elements.",
  className,
}: SliderSectionProps) => {
  const [colorValue, setColorValue] = React.useState(180);
  const [sizeValue, setSizeValue] = React.useState(50);
  const [rotationValue, setRotationValue] = React.useState(0);
  const [opacityValue, setOpacityValue] = React.useState(100);

  // Calculate derived values
  const hue = colorValue;
  const size = sizeValue * 2 + 100; // 100px to 200px
  const rotation = rotationValue * 3.6; // 0 to 360 degrees
  const opacity = opacityValue / 100; // 0 to 1

  return (
    <section className={cn("py-20 bg-background w-full", className)}>
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sliders */}
          <Card className="p-6 border border-border/40 bg-card">
            <CardContent className="p-0 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Color (Hue)</label>
                  <span className="text-sm text-muted-foreground">
                    {colorValue}°
                  </span>
                </div>
                <Slider
                  value={[colorValue]}
                  min={0}
                  max={360}
                  step={1}
                  onValueChange={(value) => setColorValue(value[0])}
                  className="py-2"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Size</label>
                  <span className="text-sm text-muted-foreground">
                    {sizeValue}%
                  </span>
                </div>
                <Slider
                  value={[sizeValue]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setSizeValue(value[0])}
                  className="py-2"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Rotation</label>
                  <span className="text-sm text-muted-foreground">
                    {rotationValue}%
                  </span>
                </div>
                <Slider
                  value={[rotationValue]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setRotationValue(value[0])}
                  className="py-2"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Opacity</label>
                  <span className="text-sm text-muted-foreground">
                    {opacityValue}%
                  </span>
                </div>
                <Slider
                  value={[opacityValue]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setOpacityValue(value[0])}
                  className="py-2"
                />
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setColorValue(180);
                    setSizeValue(50);
                    setRotationValue(0);
                    setOpacityValue(100);
                  }}
                >
                  Reset
                </Button>
                <Button
                  onClick={() => {
                    setColorValue(Math.floor(Math.random() * 360));
                    setSizeValue(Math.floor(Math.random() * 100));
                    setRotationValue(Math.floor(Math.random() * 100));
                    setOpacityValue(Math.floor(Math.random() * 100));
                  }}
                >
                  Randomize
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Visual Output */}
          <div className="flex justify-center items-center min-h-[300px] relative">
            <motion.div
              animate={{
                rotate: rotation,
                scale: sizeValue / 50, // Scale from 0 to 2
              }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative flex items-center justify-center"
            >
              <div
                className="w-40 h-40 rounded-3xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                style={{
                  backgroundColor: `hsla(${hue}, 80%, 50%, ${opacity})`,
                  boxShadow: `0 10px 25px hsla(${hue}, 80%, 40%, ${opacity * 0.5})`,
                }}
              >
                <span>Interactive</span>
              </div>

              {/* Decorative elements */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  animate={{
                    rotate: rotation * (i + 1) * 0.5,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    scale: {
                      repeat: Infinity,
                      duration: 2 + i * 0.5,
                      ease: "easeInOut",
                    },
                  }}
                  style={{
                    width: `${size * 0.8 * (1 + i * 0.4)}px`,
                    height: `${size * 0.8 * (1 + i * 0.4)}px`,
                    border: `2px solid hsla(${(hue + i * 30) % 360}, 80%, 50%, ${opacity * 0.2})`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderSection;
