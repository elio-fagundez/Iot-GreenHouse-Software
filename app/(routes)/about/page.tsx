import React from "react";
import Head from "next/head";
import LayoutHome from "../LayoutHome";
import type { Metadata } from "next";
import AboutHero from "@/components/About/AboutHero";
import AboutSection from "@/components/About/AboutSection";
import ApproachSections from "@/components/About/AproachSection";
import AboutFeatureSection from "@/components/About/AboutFeatureSection";



export const metadata = {
  title: "Bloomiot - About us",
  description:
    "Discover Bloomiot's smart greenhouse solutions. Monitor and manage your greenhouse with our IoT web platform.",
  keywords:
    "smart greenhouse, IoT, agriculture, Bloomiot, greenhouse monitoring, greenhouse management",
};

const page = () => {
  return (
    <>
      <LayoutHome>
        <main>
          <div className="mt-24 md:mx-8 my-8">
            <AboutHero />
            <AboutSection />
          </div>
          <ApproachSections />
          <AboutFeatureSection />
        </main>
      </LayoutHome>
    </>
  );
};

export default page;
