import React from 'react';
import DecryptedText from '../../../DecryptedText';

const SummaryCards = ({ selectedLoanData, data }) => {
  return (
    <div className="row g-4 justify-content-center mb-4">
      <div className="col-md-4">
        <div
          className="card h-100"
          style={{
            background: "#1976D2",
            color: "white",
            border: "none",
            borderRadius: 16,
          }}
        >
          <div className="card-body text-center">
            <div
              className="fw-bold mb-2"
              style={{ fontSize: "1.2rem" }}
            >
              Total Fund
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 700 }}>
             <DecryptedText animateOn="view" revealDirection="center" text={`$${selectedLoanData && selectedLoanData.loan?.loanAmount ? selectedLoanData.loan.loanAmount : data.totalAmount}`} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div
          className="card h-100"
          style={{
            background: "#009688",
            color: "white",
            border: "none",
            borderRadius: 16,
          }}
        >
          <div className="card-body text-center">
            <div
              className="fw-bold mb-2"
              style={{ fontSize: "1.2rem" }}
            >
              Payments Paid
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 700 }}>
              <DecryptedText animateOn="view" revealDirection="center" text={`$${selectedLoanData && selectedLoanData.paidAmount ? selectedLoanData.paidAmount : data.paidAmount}`} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div
          className="card h-100"
          style={{
            background: "#03A9F4",
            color: "white",
            border: "none",
            borderRadius: 16,
          }}
        >
          <div className="card-body text-center">
            <div
              className="fw-bold mb-2"
              style={{ fontSize: "1.2rem" }}
            >
              Payments Remaining
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 700 }}>
              <DecryptedText animateOn="view" revealDirection="center" text={`$${selectedLoanData && selectedLoanData.remainingAmount !== undefined ? selectedLoanData.remainingAmount : data.remainingAmount}`} />   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
