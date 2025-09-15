import Footer from "@/components/Landing/footer";
import { Navbar } from "@/components/Landing/landingnavbar";
import { auth } from "@clerk/nextjs";
import React from "react";

const LayoutHome = ({ children }: { children: React.ReactNode}) => {

const { userId } = auth();

const isAuthenticated = userId !== null;

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