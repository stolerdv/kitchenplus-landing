import "../styles/fonts.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { PainPoints } from "./components/PainPoints";
import { Features } from "./components/Features";
import { ForProfessionals } from "./components/ForProfessionals";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { DownloadModal } from "./components/DownloadModal";
import { useRegion } from "../hooks/useRegion";
import { LangProvider } from "../contexts/LangContext";

export default function App() {
  const region = useRegion();

  return (
    <LangProvider initialLang={region.locale}>
      <div
        style={{
          fontFamily: "Manrope, sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <Navbar />
        <Hero />
        <Stats />
        <PainPoints />
        <Features />
        <ForProfessionals />
        <Pricing currency={region.currency} />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
        <DownloadModal />
      </div>
    </LangProvider>
  );
}