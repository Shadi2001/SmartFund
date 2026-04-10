import React from 'react';
import { useDashboard } from '../../DashboardContext';

const PaymentHistory = ({ selectedLoanData, data }) => {
  const { setShowQRModal, setSelectedPayment, paymentProcessing } = useDashboard();

  const openPaymentModal = (payment) => {
    setSelectedPayment(payment);
    setShowQRModal(true);
  };

  return (
    <div className="bg-white rounded shadow p-4" style={{ marginBottom: "2rem" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5
          style={{ color: "#828282", fontWeight: 600 }}
        >
          Payment
          {selectedLoanData && (
            <span className="ms-2" style={{ fontSize: '0.9rem', color: '#2e00d5' }}>
              - {selectedLoanData.loan?.loanTypeName || 'Selected Loan'}
            </span>
          )}
        </h5>
        {/* Refresh button positioned in top right corner */}
        <button 
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            // Add refresh functionality here if needed
            window.location.reload();
          }}
          title="Refresh payment history"
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead style={{ background: "#f5f6fa" }}>
            <tr>
              <th style={{ color: "#828282", fontWeight: 500 }}>
                Date
              </th>
              <th style={{ color: "#828282", fontWeight: 500 }}>
                Amount
              </th>
              <th style={{ color: "#828282", fontWeight: 500 }}>
                Status
              </th>
              <th style={{ color: "#828282", fontWeight: 500 }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedLoanData ? (
              // Show loan-specific payment data
              selectedLoanData.payments && Array.isArray(selectedLoanData.payments) && selectedLoanData.payments.length > 0 ? (
                selectedLoanData.payments.map((payment, index) => (
                  <tr key={payment._id || index}>
                    <td style={{ fontWeight: 500 }}>
                      {payment.dueDate ? new Date(payment.dueDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{ fontWeight: 500 }}>
                      ${payment.amount ? payment.amount.toLocaleString() : '0'}
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 ${
                          payment.status && payment.status.toLowerCase() === "paid"
                            ? "bg-success"
                            : payment.status && payment.status.toLowerCase() === "pending"
                            ? "bg-warning text-dark"
                            : payment.status && payment.status.toLowerCase() === "late"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                        style={{ fontSize: "1rem", fontWeight: 500 }}
                      >
                        {payment.status
                          ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1)
                          : "Unknown"}
                      </span>
                    </td>
                    <td>
                      {payment.status && payment.status.toLowerCase() !== "paid" && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => openPaymentModal(payment)}
                          disabled={paymentProcessing}
                        >
                          {paymentProcessing ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Processing...
                            </>
                          ) : (
                            "Pay"
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No payment history for this loan
                  </td>
                </tr>
              )
            ) : (
              // Show default dashboard payment data
              Array.isArray(data.payments) && data.payments.length > 0 ? (
                data.payments.map((payment) => (
                  <tr key={payment._id || Math.random()}>
                    <td style={{ fontWeight: 500 }}>
                      {payment.dueDate || payment.date ? new Date(payment.dueDate || payment.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{ fontWeight: 500 }}>
                      ${payment.amount ? payment.amount.toLocaleString() : '0'}
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 ${
                          payment.status && payment.status.toLowerCase() === "paid"
                            ? "bg-success"
                            : payment.status && payment.status.toLowerCase() === "pending"
                            ? "bg-warning text-dark"
                            : payment.status && payment.status.toLowerCase() === "late"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                        style={{ fontSize: "1rem", fontWeight: 500 }}
                      >
                        {payment.status
                          ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1)
                          : "Unknown"}
                      </span>
                    </td>
                    <td>
                      {payment.status && payment.status.toLowerCase() !== "paid" && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => openPaymentModal(payment)}
                          disabled={paymentProcessing}
                        >
                          {paymentProcessing ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Processing...
                            </>
                          ) : (
                            "Pay"
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No payment history</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
