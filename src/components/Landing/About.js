import React from 'react';

function About() {
  return (
    <section id='about'>
    <div className="container-fluid about py-5">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-xl-7 wow fadeInLeft" data-wow-delay="0.2s">
            <div>
              <h4 className="text-primary">About Us</h4>
              <h1 className="display-5 mb-4">
                Meet our company unless miss the opportunity
              </h1>
              <p className="mb-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum velit temporibus repudiandae ipsa, eaque perspiciatis cumque incidunt tenetur sequi reiciendis.
              </p>
              <div className="row g-4">
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <div className="d-flex">
                    <div>
                      <i className="fas fa-lightbulb fa-3x text-primary"></i>
                    </div>
                    <div className="ms-4">
                      <h4>Business Consuluting</h4>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <div className="d-flex">
                    <div>
                      <i className="bi bi-bookmark-heart-fill fa-3x text-primary"></i>
                    </div>
                    <div className="ms-4">
                      <h4>Year Of Expertise</h4>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <a href="#" className="btn btn-primary rounded-pill py-3 px-5 flex-shrink-0">Discover Now</a>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex">
                    <i className="fas fa-phone-alt fa-2x text-primary me-4"></i>
                    <div style={{ marginLeft: '15px' }}>
                      <h4>Call Us</h4>
                      <p className="mb-0 fs-5" style={{ letterSpacing: '1px' }}>+01234567890</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 wow fadeInRight" data-wow-delay="0.2s">
            <div className="rounded position-relative overflow-hidden">
              {/* <img src="img/rb_18985.png" className="img-fluid rounded w-100" alt="" /> */}
              <div className="rounded-bottom">
                <img src="/img/3529858.png" className="img-fluid rounded-bottom w-100" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default About; 