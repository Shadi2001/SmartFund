import React from "react";

function Services() {
  return (
    <section id="services" >
    <div  className="container-fluid service pb-5">
      <div className="container pb-5">
        <div
          className="text-center mx-auto pb-5 wow fadeInUp"
          data-wow-delay="0.2s"
          style={{ maxWidth: "800px" }}
        >
          <h4 className="text-primary">Our Services</h4>
          <h1 className="display-5 mb-4">We Services provided best offer</h1>
          <p className="mb-0">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            adipisci facilis cupiditate recusandae aperiam temporibus corporis
            itaque quis facere, numquam, ad culpa deserunt sint dolorem autem
            obcaecati, ipsam mollitia hic.
          </p>
        </div>
        <div className="row g-4">
          {/* Service Items */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`col-md-6 col-lg-4 wow fadeInUp`}
              data-wow-delay={`${0.2 + 0.2 * ((i - 1) % 3)}s`}
            >
              <div className="service-item">
                <div className="service-img">
                  <img
                    src={`/img/service-${i}.jpg`}
                    className="img-fluid rounded-top w-100"
                    alt="Service"
                  />
                </div>
                <div className="rounded-bottom p-4">
                  <a href="#" className="h4 d-inline-block mb-4">
                    {
                      [
                        "Strategy Consulting",
                        "Financial Advisory",
                        "Managements",
                        "Supply Optimization",
                        "Hr Consulting",
                        "Marketing Consulting",
                      ][i - 1]
                    }
                  </a>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur, sint? Excepturi facilis neque nesciunt similique
                    officiis veritatis,
                  </p>
                  <a
                    className="btn btn-primary rounded-pill py-2 px-4"
                    href="#"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
}

export default Services;
