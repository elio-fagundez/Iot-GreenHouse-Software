import React from "react";
import Head from "next/head";
import LayoutHome from "../LayoutHome";
import { ContactSection } from "@/components/Contact/ContactSection";

export const metadata = {
  title: "Bloomiot - Contact us",
  description:
    "Discover Bloomiot's smart greenhouse solutions. Monitor and manage your greenhouse with our IoT web platform.",
  keywords:
    "smart greenhouse, IoT, agriculture, Bloomiot, greenhouse monitoring, greenhouse management",
};

const page = () => {
  return (
    <>
      <Head>
        <title>Contact Us - Bloomiot</title>
        <meta name="description" content="Get in touch with Bloomiot for any inquiries or support." />
        <meta name="keywords" content="Bloomiot, contact, support, inquiries" />
        <meta name="author" content="Bloomiot" />
      </Head>
      <LayoutHome>
        <main>
          <ContactSection />
        </main>
      </LayoutHome>
    </>
  );
};

export default page;