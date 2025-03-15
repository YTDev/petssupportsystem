import React from "react";
import Navbar from "../components/common/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/common/Footer";
// import Steps from "../components/steps";

function Home() {
  return (
    <>
      <div className="bg-[#207CC8] bg-gradient-to-b from-[#103D62] from-0% to-[#207CC8] to-90% shadow text-[#f9e5bd]">
        <Navbar />
        <HeroSection />
      </div>
      {/* <Steps /> */}
      <Footer />
    </>
  );
}

export default Home;
