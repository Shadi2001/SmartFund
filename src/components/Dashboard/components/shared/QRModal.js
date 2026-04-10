import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../DashboardContext';
import { QRCodeCanvas } from 'qrcode.react';

const QRModal = () => {
  const { 
    showQRModal, 
    selectedPayment, 
    paymentProcessing, 
    setShowQRModal, 
    setSelectedPayment, 
    processPayment 
  } = useDashboard();
  
  const [qrCodeValue, setQrCodeValue] = useState('');

  useEffect(() => {
    if (selectedPayment) {
      const paymentId = selectedPayment.id || selectedPayment._id;
      const qrLink = `http://192.168.245.118:3000/api/visit/${paymentId}`;
      setQrCodeValue(qrLink);
    }
  }, [selectedPayment]);

  if (!showQRModal || !selectedPayment) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: '2rem',
          maxWidth: 400,
          width: '90%',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setShowQRModal(false);
            setSelectedPayment(null);
          }}
          style={{
            position: 'absolute',
            top: 10,
            right: 15,
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>

        <h4 style={{ color: '#2e00d5', marginBottom: '1rem' }}>Payment QR Code</h4>
        
        {/* QR Code */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: 8,
            border: '1px solid #dee2e6'
          }}
        >
          {qrCodeValue ? (
            <QRCodeCanvas
              value={qrCodeValue}
              size={200}
              level="M"
              includeMargin={true}
              style={{ borderRadius: 8 }}
            />
          ) : (
            <div
              style={{
                width: 200,
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                color: '#6c757d'
              }}
            >
              Loading QR Code...
            </div>
          )}
        </div>

        <p style={{ color: '#666', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
          Scan this QR code to visit payment page
        </p>

        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Complete your payment of <strong>${selectedPayment.amount?.toLocaleString() || '0'}</strong>
        </p>

        {/* Payment Details */}
        <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: 8, marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Payment ID:</span>
            <span style={{ fontWeight: 500 }}>{selectedPayment.id || selectedPayment._id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Due Date:</span>
            <span style={{ fontWeight: 500 }}>
              {selectedPayment.dueDate ? new Date(selectedPayment.dueDate).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Status:</span>
            <span style={{ fontWeight: 500, color: '#dc3545' }}>Pending</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QRModal;
