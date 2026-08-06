import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { MobileCTABar } from "@/components/MobileCTABar";
import { Footer } from "@/components/Footer";
import { LandingPage } from "@/components/LandingPage";
import { ServiceDetail } from "@/components/ServiceDetail";

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
      <BrowserRouter>
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
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
