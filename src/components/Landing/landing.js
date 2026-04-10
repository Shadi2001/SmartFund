import React from "react";
import Navbar from "./Navbar";
import HeroCarousel from "./HeroCarousel";
import About from "./About";
import Testimonial from "./Testimonial";
import Footer from "./Footer";
import Offer from "./Offer";
import Team from "./Team";
import Services from "./Services";
import FAQ from "./FAQ"   



function Landing() {
  return (
    <div>
    
      <Navbar />
      <HeroCarousel />
      <About />
      <Services/>
      <Offer />
      <Team />
      <Testimonial />
      <FAQ/>
      <Footer />
    </div>
  );
}

export default Landing;