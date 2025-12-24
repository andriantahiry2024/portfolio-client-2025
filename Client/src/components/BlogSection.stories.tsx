import React from "react";
import BlogSection from "./BlogSection";

export default {
  title: "Components/BlogSection",
  component: BlogSection,
};

export const Default = () => <BlogSection />;

export const CustomTitle = () => (
  <BlogSection
    title="My Articles"
    description="Read my latest thoughts and tutorials on web development and design."
  />
);
