import React from 'react';

const ActiveLoansTab = ({ activeLoansLoading, activeLoansData, formatDate }) => {
  if (activeLoansLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!activeLoansData) {
    return (
      <div className="text-center py-5">
        <div className="text-muted">
          <i className="fas fa-info-circle fa-3x mb-3"></i>
          <h5>No Data</h5>
          <p>Click on the "Active Loans" tab to load data.</p>
        </div>
      </div>
    );
  }

  const { summary, activeLoans } = activeLoansData;

  return (
    <div>
      {/* Summary Section */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div 
            className="card text-white h-100"
            style={{
              background: "#1976D2",
              border: "none",
              borderRadius: 16,
            }}
          >
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <h4 className="text-white mb-0">{summary.totalActiveLoans}</h4>
              <small>Total Active Loans</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div 
            className="card text-white h-100"
            style={{
              background: "#009688",
              border: "none",
              borderRadius: 16,
            }}
          >
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <h4 className="text-white mb-0">${summary.asBorrower.totalAmount.toLocaleString()}</h4>
              <small>Total Borrowed Amount</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div 
            className="card text-white h-100"
            style={{
              background: "#03A9F4",
              border: "none",
              borderRadius: 16,
            }}
          >
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <h4 className="text-white mb-0">${summary.asSponsor.totalSponsoredAmount.toLocaleString()}</h4>
              <small>Total Sponsored Amount</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div 
            className="card text-white h-100"
            style={{
              background: "#FF9800",
              border: "none",
              borderRadius: 16,
            }}
          >
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <h4 className="text-white mb-0">${summary.totalRemainingBalance.toLocaleString()}</h4>
              <small>Payments Remaining</small>
            </div>
          </div>
        </div>
      </div>

      {/* Active Loans List */}
      <h6 className="mb-4 fw-bold">Active Loans Details</h6>
      {activeLoans.length === 0 ? (
        <div className="text-center py-4">
          <div className="text-muted">
            <i className="fas fa-clock fa-2x mb-2"></i>
            <p>No active loans found.</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {activeLoans.map((loan, index) => (
            <div key={loan.contractId} className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  {/* Header Section - Loan Info and Key Metrics */}
                  <div className="row align-items-center mb-4">
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center me-3" 
                             style={{ width: '48px', height: '48px' }}>
                          <i className="fas fa-clock text-white fs-5"></i>
                        </div>
                        <div>
                          <h5 className="mb-1 fw-bold">{loan.loanType.type}</h5>
                          <p className="mb-0 text-muted">{loan.loanType.term}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="row g-3">
                        <div className="col-md-3">
                          <div className="text-center">
                            <div className="fw-bold text-primary mb-1">Amount</div>
                            <div className="fs-5 fw-bold">${loan.loanDetails.amount.toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center">
                            <div className="fw-bold text-primary mb-1">Remaining</div>
                            <div className="fs-5 fw-bold text-warning">${loan.loanDetails.remainingBalance.toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center">
                            <div className="fw-bold text-primary mb-1">Progress</div>
                            <div className="progress mb-1" style={{ height: '8px' }}>
                              <div 
                                className="progress-bar bg-primary" 
                                style={{ width: `${loan.paymentStats.progressPercentage}%` }}
                              ></div>
                            </div>
                            <small className="fw-bold">{loan.paymentStats.progressPercentage}%</small>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center">
                            <div className="fw-bold text-primary mb-1">Role</div>
                            <span className="badge bg-primary fs-6 px-3 py-2">{loan.userRole}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Loan Details Section */}
                  <div className="row g-4 mb-4">
                    <div className="col-md-4">
                      <div className="p-3 bg-light rounded">
                        <h6 className="fw-bold mb-3">Loan Information</h6>
                        <div className="row g-2">
                          <div className="col-6">
                            <small className="text-muted d-block">Start Date</small>
                            <div className="fw-bold">{formatDate(loan.loanDetails.startDate)}</div>
                          </div>
                          <div className="col-6">
                            <small className="text-muted d-block">End Date</small>
                            <div className="fw-bold">{formatDate(loan.loanDetails.endDate)}</div>
                          </div>
                          <div className="col-12 mt-2">
                            <small className="text-muted d-block">Interest Rate</small>
                            <div className="fw-bold">{loan.loanDetails.interestRate}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="p-3 bg-light rounded">
                        <h6 className="fw-bold mb-3">Payment Statistics</h6>
                        <div className="row g-2">
                          <div className="col-6">
                            <small className="text-muted d-block">Total</small>
                            <div className="fw-bold">{loan.paymentStats.total}</div>
                          </div>
                          <div className="col-6">
                            <small className="text-muted d-block">Paid</small>
                            <div className="fw-bold text-primary">{loan.paymentStats.paid}</div>
                          </div>
                          <div className="col-6">
                            <small className="text-muted d-block">Unpaid</small>
                            <div className="fw-bold text-warning">{loan.paymentStats.unpaid}</div>
                          </div>
                          <div className="col-6">
                            <small className="text-muted d-block">Overdue</small>
                            <div className="fw-bold text-danger">{loan.paymentStats.overdue}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="p-3 bg-light rounded">
                        <h6 className="fw-bold mb-3">Participants</h6>
                        <div className="d-flex flex-column gap-2">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" 
                                 style={{ width: '28px', height: '28px' }}>
                              <small className="text-white fw-bold">B</small>
                            </div>
                            <span className="fw-bold">
                              {loan.participants.borrower.firstName} {loan.participants.borrower.lastName}
                            </span>
                          </div>
                          {loan.participants.sponsor1 && (
                            <div className="d-flex align-items-center">
                              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" 
                                   style={{ width: '28px', height: '28px' }}>
                                <small className="text-white fw-bold">S1</small>
                              </div>
                              <span className="fw-bold">
                                {loan.participants.sponsor1.firstName} {loan.participants.sponsor1.lastName}
                              </span>
                            </div>
                          )}
                          {loan.participants.sponsor2 && (
                            <div className="d-flex align-items-center">
                              <div className="bg-info rounded-circle d-flex align-items-center justify-content-center me-2" 
                                   style={{ width: '28px', height: '28px' }}>
                                <small className="text-white fw-bold">S2</small>
                              </div>
                              <span className="fw-bold">
                                {loan.participants.sponsor2.firstName} {loan.participants.sponsor2.lastName}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* All Payments Section */}
                  <div className="mt-4">
                    <h6 className="fw-bold mb-3">All Payments</h6>
                    <div className="row g-3">
                      {loan.payments.map((payment) => (
                        <div key={payment.id} className="col-md-3 col-lg-2">
                          <div className="p-3 bg-light rounded border">
                            <div className="d-flex flex-column align-items-center text-center">
                              <div className="fw-bold fs-6 mb-1">${payment.amount}</div>
                              <div className="text-muted small mb-2">{formatDate(payment.dueDate)}</div>
                              <span className={`badge ${
                                payment.status === 'paid' ? 'bg-success' : 
                                payment.status === 'overdue' ? 'bg-danger' : 'bg-warning'
                              }`}>
                                {payment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveLoansTab; 