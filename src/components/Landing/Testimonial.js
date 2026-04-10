import React from "react";

function Testimonial() {
  const Clients = [
    {
      name: "John Doe",
      profession: "CEO, Company Name",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis blanditiis excepturi quisquam temporibus voluptatum reprehenderit culpa, quasi corrupti laborum accusamus.",
      rating: 5,
      image: "/img/testimonial-1.jpg",
      key: 1,
    },
    {
      name: "Jane Smith",
      profession: "CTO, Company Name",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis blanditiis excepturi quisquam temporibus voluptatum reprehenderit culpa, quasi corrupti laborum accusamus.",
      rating: 4,
      image: "/img/testimonial-2.jpg",
      key: 2,
    },
    {
      name: "Jane Smith",
      profession: "CTO, Company Name",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis blanditiis excepturi quisquam temporibus voluptatum reprehenderit culpa, quasi corrupti laborum accusamus.",
      rating: 4,
      image: "/img/testimonial-3.jpg",
      key: 3,
    },
  ];

  const testimonials = Clients.map((client) => {
    return (
      <div key={client.key} className="testimonial-item">
        <div className="testimonial-quote-left">
          <i className="fas fa-quote-left fa-2x"></i>
        </div>
        <div className="testimonial-img">
          <img src={client.image} className="img-fluid" alt="Testimonial" />
        </div>
        <div className="testimonial-text">
          <p className="mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            blanditiis excepturi quisquam temporibus voluptatum reprehenderit
            culpa, quasi corrupti laborum accusamus.
          </p>
        </div>
        <div className="testimonial-title">
          <div>
            <h4 className="mb-0">{client.name}</h4>
            <p className="mb-0">{client.profession}</p>
          </div>
          <div className="d-flex text-primary">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>
        <div className="testimonial-quote-right">
          <i className="fas fa-quote-right fa-2x"></i>
        </div>
      </div>
    );
  });

  return (
    <div className="container-fluid testimonial pb-5">
      <div className="container pb-5">
        <div
          className="text-center mx-auto pb-5 wow fadeInUp"
          data-wow-delay="0.2s"
          style={{ maxWidth: "800px" }}
        >
          <h4 className="text-primary">Testimonial</h4>
          <h1 className="display-5 mb-4">Our Clients Riviews</h1>
          <p className="mb-0">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            adipisci facilis cupiditate recusandae aperiam temporibus corporis
            itaque quis facere, numquam, ad culpa deserunt sint dolorem autem
            obcaecati, ipsam mollitia hic.
          </p>
        </div>
        <div className="testimonial-flex-row">{testimonials}</div>
      </div>
    </div>
  );
}

export default Testimonial;
