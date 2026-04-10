import React from 'react';

function FAQ() {
  return (
    <section id='FAQ'>
    <div className="container-fluid faq-section pb-5">
      <div className="container pb-5 overflow-hidden">
        <div
          className="text-center mx-auto pb-5 wow fadeInUp"
          data-wow-delay="0.2s"
          style={{ maxWidth: '800px' }}
        >
          <h4 className="text-primary">FAQs</h4>
          <h1 className="display-5 mb-4">Frequently Asked Questions</h1>
          <p className="mb-0">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            adipisci facilis cupiditate recusandae aperiam temporibus corporis
            itaque quis facere, numquam, ad culpa deserunt sint dolorem autem
            obcaecati, ipsam mollitia hic.
          </p>
        </div>
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.2s">
            <div className="accordion accordion-flush bg-light rounded p-5" id="accordionFlushSection">
              {[
                {
                  id: 'One',
                  question: 'What Does This Tool Do?',
                  answer: 'Placeholder content for this accordion, which is intended to demonstrate the .accordion-flush class. This is the first item\'s accordion body.'
                },
                {
                  id: 'Two',
                  question: 'What Are The Disadvantages Of Online Trading?',
                  answer: 'Placeholder content for this accordion, which is intended to demonstrate the .accordion-flush class. This is the second item\'s accordion body. Let\'s imagine this being filled with some actual content.'
                },
                {
                  id: 'Three',
                  question: 'Is Online Trading Safe?',
                  answer: 'Placeholder content for this accordion, which is intended to demonstrate the .accordion-flush class. This is the second item\'s accordion body. Let\'s imagine this being filled with some actual content.'
                },
                {
                  id: 'Four',
                  question: 'What Is Online Trading, And How Dose It Work?',
                  answer: 'Placeholder content for this accordion, which is intended to demonstrate the .accordion-flush class. This is the second item\'s accordion body. Let\'s imagine this being filled with some actual content.'
                },
                {
                  id: 'Five',
                  question: 'Which App Is Best For Online Trading?',
                  answer: 'Placeholder content for this accordion, which is intended to demonstrate the .accordion-flush class. This is the second item\'s accordion body. Let\'s imagine this being filled with some actual content.'
                },
                {
                  id: 'Six',
                  question: 'How To Create A Trading Account?',
                  answer: 'Placeholder content for this accordion, which is intended to demonstrate the .accordion-flush class. This is the third item\'s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.'
                }
              ].map((item, idx) => (
                <div key={item.id} className={`accordion-item${idx === 0 ? ' rounded-top' : idx === 5 ? ' rounded-bottom' : ''}`}>
                  <h2 className="accordion-header" id={`flush-heading${item.id}`}>
                    <button
                      className={`accordion-button collapsed${idx === 0 ? ' rounded-top' : ''}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapse${item.id}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapse${item.id}`}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`flush-collapse${item.id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`flush-heading${item.id}`}
                    data-bs-parent="#accordionFlushSection"
                  >
                    <div className="accordion-body">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.2s">
            <div className="bg-primary rounded">
              <img src="/img/about-2.png" className="img-fluid w-100" alt="FAQ Visual" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default FAQ; 