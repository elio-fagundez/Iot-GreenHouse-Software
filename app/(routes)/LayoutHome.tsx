"use client";
import Footer from "@/components/Landing/footer";
import { Navbar } from "@/components/Landing/landingnavbar";
import React from "react";
import { useUserId } from "../../src/hooks/useUserId";

const LayoutHome = ({ children }: { children: React.ReactNode}) => {
  const { userId, loading } = useUserId();
  const isAuthenticated = !!userId;

  console.log("userId", userId);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <>
      <Navbar HasUser={isAuthenticated} />
      {children}
      <Footer />
    </>
  );
};

export default LayoutHome;