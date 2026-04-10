import React from "react";
import { useParams } from "react-router-dom";

export default function PaymentSuccess() {
  const { paymentId } = useParams();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4 text-center" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h1 className="text-success mb-3">✅ Payment Successful!</h1>
          <p className="lead">Your payment has been processed successfully.</p>
          <hr />
          <p className="mb-0">
            <strong>Payment ID:</strong> {paymentId}
          </p>
        </div>
      </div>
    </div>
  );
}
