import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { MobileCTABar } from "@/components/MobileCTABar";
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
import { Footer } from "@/components/Footer";

function App() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="bg-sand text-ink min-h-screen antialiased">
        <Header />
        <main>
          <Hero />
          <Ribbon />
          <Recognition />
          <SelfCheck />
          <About />
          <Services />
          <WhatToExpect />
          <Testimonials />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
        <MobileCTABar />
      </div>
    </LanguageProvider>
  );
}

export default App;
