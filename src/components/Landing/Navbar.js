import React from "react";
import "../../assets/css/css/style.css";
import "../../assets/css/css/bootstrap.min.css";
import Services from "./Services.js";

const AboutScroll = () => {
  const section = document.getElementById('about');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' }); 
  }
};

const ServicesScroll = () => {
  const section = document.getElementById('services');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' }); 
  }
};





function Navbar() {
  return (
    <div className="container-fluid position-relative p-0">
      <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
        <a href="#" className="navbar-brand p-0">
          <h2 style={{ textTransform: "uppercase", color: "#0343f2" }}>
            <i style={{ paddingRight: "5px" }} className="fas fa-search-dollar"></i>
            Smartfund
          </h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 ">
            <a href="#" className="nav-item nav-link active">
              Home
            </a>
            <a onClick={AboutScroll} className="nav-item nav-link">
              About
            </a>
            <a onClick={ServicesScroll} className="nav-item nav-link">
              Services
            </a>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link" data-bs-toggle="dropdown">
                <span className="dropdown-toggle">Pages</span>
              </a>
              <div className="dropdown-menu m-0">
                <a href="#" className="dropdown-item">
                  Our Features
                </a>
                <a href="#" className="dropdown-item">
                  Our team
                </a>
                <a href="#" className="dropdown-item">
                  Testimonial
                </a>
                <a href="#" className="dropdown-item">
                  Our offer
                </a>
                <a href="#" className="dropdown-item">
                  FAQs
                </a>
                <a href="#" className="dropdown-item">
                  404 Page
                </a>
              </div>
            </div>
            <a href="#" className="nav-item nav-link">
              Contact Us
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
