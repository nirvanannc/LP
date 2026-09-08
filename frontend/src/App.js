import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { PrefillProvider } from "@/context/PrefillContext";
import { Header } from "@/components/Header";
import { MobileCTABar } from "@/components/MobileCTABar";
import { Footer } from "@/components/Footer";
import { LandingPage } from "@/components/LandingPage";
import { ServiceDetail } from "@/components/ServiceDetail";
import AdminLeads from "@/components/AdminLeads";

const SiteShell = () => (
  <div className="bg-sand text-ink min-h-screen antialiased">
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>
    </main>
    <Footer />
    <MobileCTABar />
  </div>
);

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
      <PrefillProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/leads" element={<AdminLeads />} />
            <Route path="*" element={<SiteShell />} />
          </Routes>
        </BrowserRouter>
      </PrefillProvider>
    </LanguageProvider>
  );
}

export default App;
