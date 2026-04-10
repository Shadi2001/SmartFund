import React, { useMemo, useState } from 'react';

// Editable JSON matrices to manage display content
const defaultLoanTypes = [
  { id: 'eductional', name: 'Eductional Loan', description: 'support for tuition,and other academic expenses.', icon: 'fa-solid fa-user-graduate' },
  { id: 'medical', name: 'Medical Loan', description: 'provides financial support for healthcare expenses.', icon: 'fa-solid fa-kit-medical' },
  { id: 'micro', name: 'Micro Projects Loan', description: 'achieve a specific goal within a short time', icon: 'fa-solid fa-briefcase' }
];

const defaultInvestors = [
  { id: 'inv-0', name: 'Central Bank Of Syria', image: '/img/ctb.jpg' },
  { id: 'inv-1', name: 'Commercial Bank Of Syria', image: '/img/cmmercialBank.jpg' },
  { id: 'inv-2', name: 'Syrian Real Estate Bank', image: '/img/reb.jpg' },
  { id: 'inv-3', name: 'Syrian Industrial Bank', image: '/img/ib.jpg' },
  { id: 'inv-4', name: 'Popular Credit Bank', image: '/img/pcb.jpg' },
];

const InfoSection = ({ loanTypes = defaultLoanTypes, investors = defaultInvestors }) => {
  const [activeTab, setActiveTab] = useState('loanTypes');

  const loanTypeCards = useMemo(() => loanTypes, [loanTypes]);
  const investorCards = useMemo(() => investors, [investors]);

  return (
    <div className="bg-white rounded shadow p-4">
      <h5 className="mb-4" style={{ color: '#828282', fontWeight: 600 }}>Info</h5>

      <ul className="nav nav-tabs mb-4" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'loanTypes' ? 'active' : ''}`}
            onClick={() => setActiveTab('loanTypes')}
            type="button"
            role="tab"
          >
            <i className="fas fa-list me-2"></i>
            Loan Types
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'investors' ? 'active' : ''}`}
            onClick={() => setActiveTab('investors')}
            type="button"
            role="tab"
          >
            <i className="fas fa-users me-2"></i>
            Investors
          </button>
        </li>
      </ul>

      <div className="tab-content">
        <div className={`tab-pane fade ${activeTab === 'loanTypes' ? 'show active' : ''}`}>
          <div className="row g-3">
            {loanTypeCards.map((lt) => (
              <div key={lt.id} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-3">
                    <div className="d-flex align-items-start mb-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                           style={{backgroundColor: '#007bff', width: '48px', height: '48px'}}>
                        <i className={`${lt.icon} text-white`}></i>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-bold">{lt.name}</h6>
                        <small className="text-muted">{lt.description}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {loanTypeCards.length === 0 && (
            <div className="text-center py-4 text-muted">No loan types configured</div>
          )}
        </div>

        <div className={`tab-pane fade ${activeTab === 'investors' ? 'show active' : ''}`}>
          <div className="row g-3">
            {investorCards.map((inv) => (
              <div key={inv.id} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  {inv.image && (
                    <img 
                      src={inv.image} 
                      alt={inv.name} 
                      className="card-img-top"
                      style={{ objectFit: 'cover', width: '100%', height: 180, backgroundColor: '#f8f9fa' }} 
                    />
                  )}
                  <div className="card-body p-3 d-flex align-items-center">
                    <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{backgroundColor: '#007bff', width: '44px', height: '44px'}}>
                      <span className="text-white fw-bold">{inv.name?.charAt(0)?.toUpperCase()}</span>
                    </div>
                    <h6 className="mb-0 fw-bold">{inv.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {investorCards.length === 0 && (
            <div className="text-center py-4 text-muted">No investors configured</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;


