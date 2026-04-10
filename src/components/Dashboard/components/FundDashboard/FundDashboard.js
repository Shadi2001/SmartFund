import React from 'react';
import { useDashboard } from '../../DashboardContext';
import LoanSelector from './LoanSelector';
import SummaryCards from './SummaryCards';
import LoanDetails from './LoanDetails';
import PaymentHistory from './PaymentHistory';

const FundDashboard = () => {
  const { 
    selectedLoanData, 
    selectedLoan, 
    selectedLoanLoading, 
    setSelectedLoan, 
    setSelectedLoanData,
    dashboardData 
  } = useDashboard();

  const data = dashboardData || { totalAmount: 0, paidAmount: 0, remainingAmount: 0, payments: [] };

  return (
    <>
      {/* LOANS Button and Dropdown */}
      <div className="row justify-content-end mb-4">
        <div className="col-md-3">
          <LoanSelector />
        </div>
      </div>

      {/* Selected Loan Indicator */}
      {selectedLoanData && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="bg-white rounded shadow p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="mb-1" style={{ color: '#2e00d5', fontWeight: 600 }}>
                    Selected Loan: {selectedLoanData.loan?.loanTypeName || 'Unknown Type'}
                  </h6>
                  
                </div>
                <div className="d-flex align-items-center gap-2">
                  {selectedLoanLoading && (
                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      setSelectedLoan(null);
                      setSelectedLoanData(null);
                    }}
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <SummaryCards selectedLoanData={selectedLoanData} data={data} />

      {/* Loan Details Section */}
      {selectedLoanData && <LoanDetails selectedLoanData={selectedLoanData} />}

      {/* Payment History Table */}
      <PaymentHistory selectedLoanData={selectedLoanData} data={data} />
    </>
  );
};

export default FundDashboard;
