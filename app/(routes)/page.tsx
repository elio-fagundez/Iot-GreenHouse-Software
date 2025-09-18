import { Features } from "@/components/Landing/features";
import FeatureSection from "@/components/Landing/featuresection";
import { Hero } from "@/components/Landing/hero";
import PricingSection from "@/components/Landing/pricingSection";
import React from "react";
import LayoutHome from "./LayoutHome";

export const metadata = {
  title: "Bloomiot - Smart Greenhouse Solutions",
  description:
    "Discover Bloomiot's smart greenhouse solutions. Monitor and manage your greenhouse with our IoT web platform.",
  keywords:
    "smart greenhouse, IoT, agriculture, Bloomiot, greenhouse monitoring, greenhouse management",
};



const page = () => {
  return (
    <LayoutHome>
      <main>
        <Hero />
        <Features />
        <FeatureSection />
        <PricingSection />
      </main>
    </LayoutHome>
  );
};

export default page;