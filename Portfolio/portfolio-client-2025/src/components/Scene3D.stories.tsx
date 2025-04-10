import React from "react";
import Scene3D from "./Scene3D";

export default {
  title: "Components/Scene3D",
  component: Scene3D,
};

export const Default = () => <Scene3D />;

export const WithBackground = () => (
  <div className="bg-gradient-to-b from-blue-900 to-black p-8">
    <Scene3D />
  </div>
);
