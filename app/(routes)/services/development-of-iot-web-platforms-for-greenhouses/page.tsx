import React from "react";
import LayoutHome from "../../LayoutHome";
import ServicesHero from "@/components/Services/ServicesHero";
import ServiceSection from "@/components/Services/ServiceSection";
import ServiceAditionalSection from "@/components/Services/ServiceAditionalSection";
import Link from "next/link";

export const metadata = {
  title: "Bloomiot - Development of IoT Web Platforms for Greenhouses",
  description:
    "Discover Bloomiot's smart greenhouse solutions. Monitor and manage your greenhouse with our IoT web platform.",
  keywords:
    "smart greenhouse, IoT, agriculture, Bloomiot, greenhouse monitoring, greenhouse management",
};

const page = () => {
  const personalizedService = [
    {
      title: "Requirements Analysis",
      paragraphs: [
        "We start with a thorough evaluation of your technical and operational needs: what variables do you want to visualize? Do you need trend graphs, real-time alerts, or specialized report sections? Our team of IoT and web development experts will define the scope and key functionalities of the platform with you.",
      ],
    },
    {
      title: "Interface and User Experience Design",
      paragraphs: [
        "Our goal is to create a pleasant interface that is easy to navigate and adapted to any device (computer, tablet, or smartphone). We know that simplicity is essential for you to review your greenhouse information without complications.",
      ],
    },
    {
      title: "Technical Development and IoT Device Integration",
      paragraphs: [
        "Integrating your smart greenhouse with the platform is a smooth process thanks to our APIs and communication protocols. We develop the software layer that receives, processes, and displays your sensor data, ensuring the security and reliability of the information.",
      ],
    },
    {
      title: "Testing and Optimization",
      paragraphs: [
        "Before final delivery, we conduct exhaustive tests to ensure that the data flows correctly and that the platform is stable. We optimize loading speed, graph visualization, and alert response.",
      ],
    },
    {
      title: "Delivery, Training, and Maintenance",
      paragraphs: [
        "Once the platform is ready, we provide the necessary training for you to make the most of the available tools. We also offer support and update plans so you can expand or improve your platform according to your crop's needs.",
      ],
    },
  ];

  const platformBenefits = [
    {
      title: "24/7 Access",
      paragraphs: [
        "Monitor the status of your greenhouse anytime and anywhere, no matter how many kilometers separate you from your crops.",
      ],
    },
    {
      title: "Immediate Alerts",
      paragraphs: [
        "Set up notifications and alarms to receive emails or messages when a variable goes out of the established ranges.",
      ],
    },
    {
      title: "Reports and Data Analysis",
      paragraphs: [
        "Get detailed reports on productivity, resource usage, and crop behavior. With this data, you can make more accurate and timely decisions.",
      ],
    },
    {
      title: "Scalability and Customization",
      paragraphs: [
        "As your project grows or your requirements become more complex, the platform can be expanded to manage more variables, users, or advanced analysis functions.",
      ],
    },
  ];

  return (
    <LayoutHome>
      <main>
        <div className="mt-24 md:mx-8 my-8">
          <ServicesHero
            backgroundImage="/development.jpg"
            title="Are you looking for a professional web solution to monitor and manage your greenhouse variables in real time?"
            subtitle="At Bloomiot we offer you our IoT Web Platform Development service, focused specifically on the greenhouse cultivation environment. We design intuitive interfaces, adapted to your particular needs, so that you can access your data from any device with an internet connection."
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
            subtitle="Benefits of Our Web Platform"
            content={platformBenefits}
            imageSrc="/about2.jpg"
            imageAlt="Growers analyzing data on tablet"
          />
        </div>
        <div className="w-full bg-gray-50 p-8">
          <div className="text-center mb-16 space-y-4 mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
              Do you need a custom web platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If you want to make the leap to smart agriculture and have a
              <span className="text-[#00A651]">
                {" "}
                specialized IoT web solution for greenhouses
              </span>
              , you are in the right place.{" "}
              <span className="text-[#00A651]">Contact us</span> and together we
              will create the tool that boosts the efficiency and productivity
              of your crops.
            </p>
            <Link href="/#contact">
              <button className="rounded-full mt-8 bg-[#008D36] px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600">
                Contact
              </button>
            </Link>
          </div>
        </div>
      </main>
    </LayoutHome>
  );
};

export default page;
