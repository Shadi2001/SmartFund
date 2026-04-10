import React, { useState } from 'react';

function Offer() {
  const [activeTab, setActiveTab] = useState(1);
  const tabTitles = [
    'Lending money for investment of your new projects',
    'Lending money for investment of your new projects',
    'Mobile payment is more flexible and easy for all investors',
    'all transaction is kept free for the member of pro traders',
  ];

  return (
    <section id='offer'>
      <div className="container-fluid offer-section pb-5">
        <div className="container pb-5">
          <div
            className="text-center mx-auto pb-5 wow fadeInUp"
            data-wow-delay="0.2s"
            style={{ maxWidth: '1000px' }}
          >
            <h4 className="text-primary">Our Offer</h4>
            <h1 className="display-5 mb-4">Benefits We offer</h1>
            <p className="mb-0">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
              adipisci facilis cupiditate recusandae aperiam temporibus corporis
              itaque quis facere, numquam, ad culpa deserunt sint dolorem autem
              obcaecati, ipsam mollitia hic.
            </p>
          </div>
          <div className="ms-3 row g-4  align-items-center justify-content-center ">
            <div className="col-xl-5 wow     fadeInLeft" data-wow-delay="0.2s">
              <div className="nav nav-pills bg-light rounded p-5">
                {tabTitles.map((title, idx) => (
                  <button
                    key={idx}
                    className={`accordion-link p-4 mb-4${activeTab === idx + 1 ? ' active' : ''}${idx === tabTitles.length - 1 ? ' mb-0' : ''}`}
                    style={{
                      border: 'none',
                      background: activeTab === idx + 1 ? '#0443f2' : 'none',
                      borderRadius: activeTab === idx + 1 ? '20px' : 'none',
                      color: activeTab === idx + 1 ? '#fff' : '#000',
                      textAlign: 'left',
                      width: '100%',
                      outline: 'none',
                      transition:'0.5s ease-in'
                    }}
                    onClick={() => setActiveTab(idx + 1)}
                  >
                    <h5 className="mb-0">{title}</h5>
                  </button>
                ))}
              </div>
            </div>
            <div className="col-xl-7 wow fadeInRight" data-wow-delay="0.4s">
              <div className="tab-content">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    id={`collapse${['One', 'Two', 'Three', 'Four'][i - 1]}`}
                    className={`tab-pane fade show p-0${activeTab === i ? ' active' : ''}`}
                    style={{ display: activeTab === i ? 'block' : 'none' }}
                  >
                    <div className="row g-1 justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                      <div className="d-flex justify-content-centerbetween align-items-center">
                        <img
                          src={`/img/offer-${i}.jpg`}
                          className="img-fluid w-100 rounded"
                          alt="Offer"
                          style={{ maxWidth: '450px', height: 'auto' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Offer; 