import React from "react";
import "../../assets/css/css/style.css";
import "../../assets/css/css/bootstrap.min.css";
import { Route, Routes, Link } from "react-router-dom";
function HeroCarousel() {
  return (
    <div className="header-carousel owl-carousel">
      <div className="header-carousel-item">
        <img
          src="/img/carousel-2.jpg"
          className="img-fluid w-100"
          alt="Image"
        />
        <div className="carousel-caption">
          <div className="container">
            <div className="row g-5">
              <div className="col-12 animated fadeInUp">
                <div className="text-center">
                  <h4 className="text-primary text-uppercase fw-bold mb-4">
                    Welcome To SmartFund
                  </h4>
                  <h1 className="display-4 text-uppercase text-white mb-4">
                    Invest your money with higher return
                  </h1>
                  <p className="mb-5 fs-5">
                    To secure funding to launch and grow innovative projects
                    that drive success
                  </p>
                  <div className="d-flex justify-content-center flex-shrink-0 mb-4">
                
                  <Link to={"/login"} > <button className="btn btn-primary rounded-pill py-3 px-4 px-md-5 ms-2" > Login/SignUp 
                    
                  </button>
                   </Link>
                 
                 
                  
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <h2 className="text-white me-2">Follow Us:</h2>
                    <div className="d-flex justify-content-end ms-2">
                      <a
                        className="btn btn-md-square btn-light rounded-circle me-2"
                        href=""
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        className="btn btn-md-square btn-light rounded-circle mx-2"
                        href=""
                      >
                        <i className="fab fa-youtube"></i>
                      </a>
                      <a
                        className="btn btn-md-square btn-light rounded-circle mx-2"
                        href=""
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a
                        className="btn btn-md-square btn-light rounded-circle ms-2"
                        href=""
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
