import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
function Home() {
  return (
    <>
      <div className=" bg-[#207CC8] bg-gradient-to-b from-[#103D62] from-0% to-[#207CC8] to-90% shadow text-[#f9e5bd]">
        <Navbar />
        <HeroSection />
      </div>
    </>
  );
}

export default Home;
