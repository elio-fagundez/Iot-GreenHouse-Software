"use client";
import Footer from "@/components/Landing/footer";
import { Navbar } from "@/components/Landing/landingnavbar";
import React from "react";
import { useAuth } from "../../src/hooks/useAuth";

const LayoutHome = ({ children }: { children: React.ReactNode}) => {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;

  console.log("user", user);
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
