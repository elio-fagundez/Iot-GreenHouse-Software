import React from "react";
import LayoutHome from "../../LayoutHome";
import ServicesHero from "@/components/Services/ServicesHero";
import ServiceSection from "@/components/Services/ServiceSection";
import ServiceAditionalSection from "@/components/Services/ServiceAditionalSection";


export const metadata = {
    title: "Bloomiot - Installation and maintenance of equipment",
    description:
      "Discover Bloomiot's smart greenhouse solutions. Monitor and manage your greenhouse with our IoT web platform.",
    keywords:
      "smart greenhouse, IoT, agriculture, Bloomiot, greenhouse monitoring, greenhouse management",
  };


const page = () => {
 const personalizedService = [
  {
    title: "Diagnostic Visit",
    paragraphs: [
      "Our technical team travels to your greenhouse to evaluate the infrastructure, determine the ideal location for sensors and actuators, and propose the best installation design to ensure maximum efficiency and coverage.",
    ],
  },
  {
    title: "Professional Installation",
    paragraphs: [
      "Device Mounting: We place the sensors and actuators in the most strategic areas of your greenhouse.",
      "Platform Connection: We configure the communication modules so that the data automatically syncs with the Bloomiot cloud.",
      "Functionality Tests: We perform real-time checks to ensure that all variables are correctly recorded and controlled.",
    ],
  },
  {
    title: "On-Site Training",
    paragraphs: [
      "During the installation, we provide basic training so you can learn to use the platform, set up alerts, and make simple adjustments. The goal is for you to have the essential knowledge to manage your system from day one.",
    ],
  },
  {
    title: "Periodic Maintenance",
    paragraphs: [
      "Sensor Review: We calibrate and check the performance of each device to ensure accurate readings.",
      "Firmware Updates: Keep your equipment with the latest and most stable version, applying security and optimization improvements.",
      "Support and Replacements: If any device fails, we take care of repairing or replacing it quickly.",
    ],
  },
];

const additionalBenefits = [
  {
    title: "Optimal Performance Guarantee",
    paragraphs: [
      "By having the installation and maintenance performed by trained professionals, you minimize the risks of erroneous data readings or system interruptions.",
    ],
  },
  {
    title: "Time and Resource Savings",
    paragraphs: [
      "Leave the entire setup process in the hands of experts, avoiding installation errors that could be costly in the long run.",
    ],
  },
  {
    title: "Personalized Support",
    paragraphs: [
      "Every greenhouse is different, so we assess your specific needs and adjust the service accordingly.",
    ],
  },
  {
    title: "Trust and Security",
    paragraphs: [
      "We work with quality protocols to ensure the longevity of your IoT equipment and protect the investment you have made.",
    ],
  },
];


  return (
    <LayoutHome>
      <main>
        <div className="mt-24 md:mx-8 my-8">
          <ServicesHero
            backgroundImage="/maintenance.jpg"
            title="Installation and maintenance of equipment"
            subtitle="Therefore, we offer a specialized service for our clients in Santa Catarina, Brazil, with plans for expansion in the future."
            buttonText="Explore"
            buttonLink="#service-section"
          />
          <ServiceSection
            subtitle="What does this service consist of?"
            content={personalizedService}
            imageSrc="/about2.jpg"
            imageAlt="Growers analyzing data on tablet"
          />
          <ServiceAditionalSection
            subtitle="Benefits of Counting on Our Installation and Maintenance Service"
            content={additionalBenefits}
            imageSrc="/about2.jpg"
            imageAlt="Growers analyzing data on tablet"
          />

   
        </div>
      
      </main>
    </LayoutHome>
  );
};

export default page;
