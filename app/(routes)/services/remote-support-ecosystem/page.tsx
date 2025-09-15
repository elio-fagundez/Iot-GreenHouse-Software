import React from "react";
import LayoutHome from "../../LayoutHome";
import ServicesHero from "@/components/Services/ServicesHero";
import ServiceSection from "@/components/Services/ServiceSection";
import ServiceAditionalSection from "@/components/Services/ServiceAditionalSection";
import Link from "next/link";

export const metadata = {
  title: "Bloomiot - Remote Support Ecosystem",
  description:
    "Discover Bloomiot's smart greenhouse solutions. Monitor and manage your greenhouse with our IoT web platform.",
  keywords:
    "smart greenhouse, IoT, agriculture, Bloomiot, greenhouse monitoring, greenhouse management",
};

const page = () => {
  const supportRemote = [
    {
      title: "Immediate Responses",
      paragraphs: [
        "By having real-time support channels, you save time and prevent incidents from becoming major problems.",
      ],
    },
    {
      title: "Continuous Optimization",
      paragraphs: [
        "We not only address failures; we also guide you to make the most of your system, reducing energy and resource costs.",
      ],
    },
    {
      title: "Personalized Experience",
      paragraphs: [
        "Our team adapts to your level of knowledge, offering clear solutions without unnecessary technical jargon.",
      ],
    },
    {
      title: "Peace of Mind and Trust",
      paragraphs: [
        "With robust support backing your operations, you can focus on what really matters: the care and production of your crops.",
      ],
    },
  ];

  const Whychoice = [
    {
      title: "Multidisciplinary Team",
      paragraphs: [
        "We have engineers, agronomists, and IoT specialists ready to assist you.",
      ],
    },
    {
      title: "Constantly Evolving Platform",
      paragraphs: [
        "You receive updates, improvements, and assistance that adapt to your needs as your greenhouse grows or changes.",
      ],
    },
    {
      title: "Digital Proximity",
      paragraphs: [
        "Although we work remotely, we accompany you virtually at every stage of the process.",
      ],
    },
  ];

  const onlineHelpCenter = [
    {
      title: "Online Help Center",
      paragraphs: [
        "Knowledge Base: Find manuals, videos, and practical guides to solve the most common questions.",
        "Forums and Community: Share experiences, solutions, and best practices with other Bloomiot users.",
      ],
    },
    {
      title: "Live Support",
      paragraphs: [
        "Chat and Video Call: Connect with one of our specialists in real-time to solve technical problems or receive advice on configuring your greenhouse.",
        "Priority Tickets: If your question requires further investigation, we generate a support ticket to give you timely follow-up and notify you of the solution.",
      ],
    },
    {
      title: "Specialized Technical Assistance",
      paragraphs: [
        "Data Analysis and Optimization: Our team can review the history of your variables and recommend adjustments in irrigation, lighting, or ventilation control to improve production.",
        "Updates and Improvements: Through remote connections, we can update firmware and the web platform, ensuring you always have the latest features and security patches.",
      ],
    },
    {
      title: "24/7 Multichannel Support",
      paragraphs: [
        "Global Availability: We work remotely, which allows us to provide support to clients in different time zones.",
        "Automated Alerts: Set up notifications in your Bloomiot account to receive alerts by email or SMS when we detect any anomalies in your systems.",
      ],
    },
  ];

  return (
    <LayoutHome>
      <main>
        <div className="mt-24 md:mx-8 my-8">
          <ServicesHero
            backgroundImage="/remote.jpeg"
            title="Remote Support Ecosystem"
            subtitle="At Bloomiot, we understand that keeping a smart greenhouse running smoothly isn’t always easy. To support you every step of the way and ensure you get the most out of your devices and web platform, we’ve designed a Remote Support Ecosystem that provides you with fast, personalized, and constant assistance, no matter where you are."
            buttonText="Explore"
            buttonLink="#service-section"
          />

          <ServiceSection
            subtitle="Benefits of Our Remote Support Ecosystem"
            content={supportRemote}
            imageSrc="/about2.jpg"
            imageAlt="Growers analyzing data on tablet"
          />

          <ServiceAditionalSection
            subtitle="What does this service consist of?"
            content={onlineHelpCenter}
            imageSrc="/about2.jpg"
            imageAlt="Growers analyzing data on tablet"
          />

          <ServiceSection
            subtitle="Why Choose Bloomiot Remote Support?"
            content={Whychoice}
            imageSrc="/about2.jpg"
            imageAlt="Growers analyzing data on tablet"
          />
        </div>
        <div className="w-full bg-gray-50 p-8">
          <div className="text-center mb-16 space-y-4 mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-500">
              Ready to feel the security of having an expert team at your side,
              no matter the place or time?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If you want to make the leap to smart agriculture and have a
              <span className="text-[#00A651]">
                {" "}
                Contact us and join our Remote Support Ecosystem!
              </span>{" "}
              At Bloomiot, we are committed to your success in smart farming.
            </p>
            <Link href="/#contact">
              <button className="rounded-full mt-8 bg-[#008D36] px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600">
                Contact us
              </button>
            </Link>
          </div>
        </div>
      </main>
    </LayoutHome>
  );
};

export default page;
