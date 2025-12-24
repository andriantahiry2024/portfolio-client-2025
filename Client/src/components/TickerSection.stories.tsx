import React from "react";
import TickerSection from "./TickerSection";

export default {
  title: "Components/TickerSection",
  component: TickerSection,
};

export const Default = () => <TickerSection />;

export const RightDirection = () => <TickerSection direction="right" />;

export const CustomColors = () => (
  <TickerSection backgroundColor="bg-blue-500" textColor="text-white" />
);

export const FastSpeed = () => <TickerSection speed={80} />;
