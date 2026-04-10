import React from 'react';
import { getRoleBadge } from './utils';

const ProfileTab = ({ selectedUser, formatDate, formatIncome, getStatusColor }) => {
  if (!selectedUser) return null;

  return (
    <div className="row">
      <div className="col-md-4 text-center mb-3">
        <div className=" rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
             style={{ width: '80px', height: '80px', backgroundColor: '#007bff' }}>
          <span className="text-white fw-bold fs-3">
            {selectedUser.userFirstName.charAt(0).toUpperCase()}
          </span>
        </div>
        <h5 className="fw-bold">
          {selectedUser.userFirstName} {selectedUser.userLastName}
        </h5>
        <p className="text-muted">{selectedUser.email}</p>
        <div className="mb-2">
          {getRoleBadge(selectedUser.role)}
        </div>
        <span className={`fw-bold ${getStatusColor(selectedUser.status)}`}>
          {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
        </span>
      </div>
      <div className="col-md-8">
        <div className="row g-3">
          <div className="col-6">
            <label className="fw-bold text-muted">Phone Number</label>
            <p>{selectedUser.phoneNumber || 'N/A'}</p>
          </div>
          <div className="col-6">
            <label className="fw-bold text-muted">Date of Birth</label>
            <p>{selectedUser.DateOfBirth ? formatDate(selectedUser.DateOfBirth) : 'N/A'}</p>
          </div>
          <div className="col-6">
            <label className="fw-bold text-muted">Gender</label>
            <p className="text-capitalize">{selectedUser.gender || 'N/A'}</p>
          </div>
          <div className="col-6">
            <label className="fw-bold text-muted">Credit ID</label>
            <p>{selectedUser.creditID || 'N/A'}</p>
          </div>
          <div className="col-6">
            <label className="fw-bold text-muted">Income</label>
            <p>{selectedUser.income ? formatIncome(selectedUser.income) : 'N/A'}</p>
          </div>
          <div className="col-6">
            <label className="fw-bold text-muted">Loan Role</label>
            <p>{selectedUser.loanRole ? selectedUser.loanRole.join(', ') : 'N/A'}</p>
          </div>
          <div className="col-12">
            <label className="fw-bold text-muted">Address</label>
            <p>{selectedUser.address || 'N/A'}</p>
          </div>
          <div className="col-6">
            <label className="fw-bold text-muted">Verified</label>
            <p>
              <span className={`badge ${selectedUser.isVerified ? 'bg-primary' : 'bg-warning'}`}>
                {selectedUser.isVerified ? 'Yes' : 'No'}
              </span>
            </p>
          </div>
          <div className="col-6">
            <label className="fw-bold text-muted">Active</label>
            <p>
              <span className={`badge ${selectedUser.isActive ? 'bg-primary' : 'bg-danger'}`}>
                {selectedUser.isActive ? 'Yes' : 'No'}
              </span>
            </p>
          </div>
          <div className="col-6">
            <label className="fw-bold text-muted">Created</label>
            <p>{formatDate(selectedUser.createdAt)}</p>
          </div>
          <div className="col-6">
            <label className="fw-bold text-muted">Last Updated</label>
            <p>{formatDate(selectedUser.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab; 