import React from "react";
import LayoutHome from "../../LayoutHome";
import ServicesHero from "@/components/Services/ServicesHero";
import ServiceSection from "@/components/Services/ServiceSection";

export const metadata = {
  title: "Bloomiot - Customized products",
  description:
    "Discover Bloomiot's smart greenhouse solutions. Monitor and manage your greenhouse with our IoT web platform.",
  keywords:
    "smart greenhouse, IoT, agriculture, Bloomiot, greenhouse monitoring, greenhouse management",
};

const page = () => {
  const personalizedService = [
    {
      title: "Needs Analysis",
      paragraphs: [
        "We start with a consulting session to thoroughly understand your project: type of crop, greenhouse size, variables you want to monitor, and the level of control you seek.",
      ],
    },
    {
      title: "Custom Design and Configuration",
      paragraphs: [
        "Based on the analysis, our team of engineers develops a technical and economic proposal that includes the sensors, actuators, and specific firmware for your requirements. We can integrate parameters such as temperature, humidity, CO₂, pH, automated irrigation, and more.",
      ],
    },
    {
      title: "Hardware Manufacturing and Installation",
      paragraphs: [
        "Once the proposal is accepted, we manufacture or assemble the necessary devices (with the special characteristics we agree upon) and configure them to work immediately in your environment.",
      ],
    },
    {
      title: "Implementation and Commissioning",
      paragraphs: [
        "Our team guides you through the installation and offers remote support to ensure everything is connected correctly. We conduct tests to verify that each variable is being measured and controlled properly.",
      ],
    },
    {
      title: "Training and Follow-up",
      paragraphs: [
        "We not only deliver the equipment but also accompany you with training sessions so you can learn to use the platform and make the most of each feature. Additionally, we offer support plans and continuous updates.",
      ],
    },
  ];

  return (
    <LayoutHome>
      <main>
        <div className="mt-24 md:mx-8 my-8">
          <ServicesHero
            backgroundImage="/customerproducts.webp"
            title="Do you have specific automation or monitoring needs in your greenhouse?"
            subtitle="At Bloomiot we understand that each crop is unique, which is why we offer you a comprehensive service for developing and adapting customized IoT solutions. Our goal is to fine-tune every detail so that your greenhouse works just the way you imagine it."
            buttonText="Explore"
            buttonLink="#service-section"
          />
          <ServiceSection
            subtitle="What does this service consist of?"
            content={personalizedService}
            imageSrc="/about2.jpg"
            imageAlt="Growers analyzing data on tablet"
          />
        </div>
      </main>
    </LayoutHome>
  );
};

export default page;
