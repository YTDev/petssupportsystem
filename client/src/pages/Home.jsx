import React from "react";
import Navbar from "../components/common/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/common/Footer";

import AdoptionJourney from "../components/AdoptionJourney";
import FaqSection from "../components/FaqSection";
import StatsSection from "../components/StatsSection";
import AdoptionForm from "../components/forms/AdoptionForm";

function Home() {
  return (
    <>
      <div className="bg-[#207CC8] bg-gradient-to-b from-[#103D62] from-0% to-[#207CC8] to-90% shadow text-[#f9e5bd]">
        <Navbar />
        <HeroSection />
      </div>
      <div className="">
        <StatsSection />
        <AdoptionJourney />
        <FaqSection />
        <AdoptionForm />
      </div>
      <Footer />
    </>
  );
}

export default Home;
