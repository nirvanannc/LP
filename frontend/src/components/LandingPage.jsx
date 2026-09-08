import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Ribbon } from "@/components/Ribbon";
import { Recognition } from "@/components/Recognition";
import { SelfCheck } from "@/components/SelfCheck";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { WhatToExpect } from "@/components/WhatToExpect";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Insights } from "@/components/Insights";

export const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Hero />
      <SelfCheck />
      <Ribbon />
      <Recognition />
      <About />
      <Services />
      <WhatToExpect />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Insights />
    </>
  );
};

export default LandingPage;
