import React from "react";
import LayoutHome from "../../LayoutHome";
import ServicesHero from "@/components/Services/ServicesHero";
import ServiceSection from "@/components/Services/ServiceSection";
import ServiceAditionalSection from "@/components/Services/ServiceAditionalSection";
import Link from "next/link";

export const metadata = {
  title:
    "Bloomiot - Advanced Data Analysis and Optimization of Agricultural Processes",
  description:
    "Discover Bloomiot's smart greenhouse solutions. Monitor and manage your greenhouse with our IoT web platform.",
  keywords:
    "smart greenhouse, IoT, agriculture, Bloomiot, greenhouse monitoring, greenhouse management",
};

const page = () => {
  const advancedDataAnalysis = [
    {
      title: "Data Collection and Processing",
      paragraphs: [
        "Real-Time Data: We use smart sensors installed in your greenhouse to collect variables such as temperature, humidity, CO₂, irrigation level, and more.",
        "Secure Cloud Storage: All data is automatically recorded on our platform, ensuring integrity and accessibility.",
      ],
    },
    {
      title: "Statistical Analysis and Predictive Models",
      paragraphs: [
        "Pattern Identification: Through advanced algorithms, we detect trends in your crops (e.g., temperature spikes or humidity behaviors).",
        "Predictions and Alerts: We use predictive models to notify you in advance about events such as sudden climate changes or pest risks.",
      ],
    },
    {
      title: "Personalized Process Optimization",
      paragraphs: [
        "Efficient Resource Use: We help you adjust your irrigation, ventilation, and lighting systems to use water and energy responsibly.",
        "Crop Planning: Based on historical data and trends, we generate recommendations to improve yields and plan more strategic harvests.",
      ],
    },
    {
      title: "Reports and Practical Recommendations",
      paragraphs: [
        "Detailed Reports: Receive periodic reports with clear visualizations, comparative tables, and actionable conclusions.",
        "Agronomic Best Practices: Our multidisciplinary team integrates the obtained information with agronomic knowledge to offer you specific action guides.",
      ],
    },
  ];

  const onlineHelpCenter = [
    {
      title: "Evidence-Based Decisions",
      paragraphs: [
        "Leave intuition behind and rely on concrete information to optimize every phase of your production.",
      ],
    },
    {
      title: "Cost Reduction",
      paragraphs: [
        "By using resources more efficiently, you reduce expenses on water, fertilizers, and energy.",
      ],
    },
    {
      title: "Risk Prevention",
      paragraphs: [
        "Early detection of adverse conditions or anomalies that could affect your yield.",
      ],
    },
    {
      title: "Sustainable Productivity",
      paragraphs: [
        "Increase the quality and quantity of your crops while caring for the environment and maintaining the health of your plants.",
      ],
    },
  ];

  const advancedDataAnalysisBenefits = [
    {
      title: "Specialized Experience",
      paragraphs: [
        "Our team combines a passion for agriculture with extensive knowledge in data science, ensuring solutions focused on tangible results.",
      ],
    },
    {
      title: "Robust and Integrated Technology",
      paragraphs: [
        "All Bloomiot devices and platform work together, making data collection and analysis seamless processes.",
      ],
    },
    {
      title: "Support and Training",
      paragraphs: [
        "We provide continuous advice to help you interpret the information and apply real improvements to your cultivation processes.",
      ],
    },
    {
      title: "Scalability",
      paragraphs: [
        "Whether you manage a small greenhouse or a larger agricultural operation, our solutions adapt to your current and future needs.",
      ],
    },
  ];

  return (
    <LayoutHome>
      <main>
        <div className="mt-24 md:mx-8 my-8">
          <ServicesHero
            backgroundImage="/analisis.jpg"
            title="Advanced Data Analysis and Optimization of Agricultural Processes"
            subtitle="At Bloomiot, we believe that information is the key to achieving more efficient and productive crops. Our Advanced Data Analytics service allows you to discover patterns, anticipate risks and make better decisions at all stages of your agricultural production. We combine the potential of IoT with data science techniques to offer you a complete view and optimize your processes in a sustainable way."
            buttonText="Explore"
            buttonLink="#service-section"
          />
          <ServiceSection
            subtitle="What does this service consist of?"
            content={advancedDataAnalysis}
            imageSrc="/about2.jpg"
            imageAlt="Growers analyzing data on tablet"
          />
          <ServiceAditionalSection
            subtitle="Benefits of Our Advanced Data Analysis"
            content={onlineHelpCenter}
            imageSrc="/about2.jpg"
            imageAlt="Growers analyzing data on tablet"
          />

          <ServiceSection
            subtitle="Why Choose Bloomiot Service?"
            content={advancedDataAnalysisBenefits}
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
