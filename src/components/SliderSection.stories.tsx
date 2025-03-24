import React from "react";
import SliderSection from "./SliderSection";

export default {
  title: "Components/SliderSection",
  component: SliderSection,
};

export const Default = () => <SliderSection />;

export const CustomTitle = () => (
  <SliderSection
    title="Interactive Controls"
    description="Play with these sliders to see real-time changes to the visual elements."
  />
);
