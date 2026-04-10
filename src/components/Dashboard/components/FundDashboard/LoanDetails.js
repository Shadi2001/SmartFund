import React from 'react';

const LoanDetails = ({ selectedLoanData }) => {
  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="bg-white rounded shadow p-4">
          <h6 className="mb-3" style={{ color: '#2e00d5', fontWeight: 600 }}>
            Loan Details
          </h6>
          <div className="row g-3">
            <div className="col-md-3">
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>Loan Type</div>
              <div className="fw-bold">{selectedLoanData.loan?.loanTypeName || 'N/A'}</div>
            </div>
            <div className="col-md-3">
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>Interest Rate</div>
              <div className="fw-bold">{selectedLoanData.loan?.interestRate || 'N/A'}%</div>
            </div>
            <div className="col-md-3">
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>Start Date</div>
              <div className="fw-bold">
                {selectedLoanData.loan?.startDate ? new Date(selectedLoanData.loan.startDate).toLocaleDateString() : 'N/A'}
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>End Date</div>
              <div className="fw-bold">
                {selectedLoanData.loan?.endDate ? new Date(selectedLoanData.loan.endDate).toLocaleDateString() : 'N/A'}
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>Term (Months)</div>
              <div className="fw-bold">{selectedLoanData.loan?.loanTermMonths || 'N/A'}</div>
            </div>
            <div className="col-md-3">
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>Status</div>
              <div className="fw-bold">
                <span
                  className={`badge rounded-pill px-2 py-1 ${
                    selectedLoanData.loan?.status === 'completed' ? 'bg-success' :
                    selectedLoanData.loan?.status === 'active' ? 'bg-primary' :
                    selectedLoanData.loan?.status === 'pending' ? 'bg-warning text-dark' :
                    'bg-secondary'
                  }`}
                  style={{ fontSize: '0.8rem' }}
                >
                  {selectedLoanData.loan?.status ? selectedLoanData.loan.status.charAt(0).toUpperCase() + selectedLoanData.loan.status.slice(1) : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
