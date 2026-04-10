import React from 'react';
import { getStatusColor, getRoleBadge } from './utils';

const ClientsList = ({ usersData, usersLoading, onCardClick }) => {
  if (usersLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="row g-3">
        {usersData.map((user) => (
          <div key={user._id} className="col-md-6 col-lg-4">
            <div 
              className="card border-0 shadow-sm h-100" 
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              onClick={() => onCardClick(user)}
            >
              <div className="card-body p-3">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                       style={{backgroundColor: '#007bff', width: '50px', height: '50px' }}>
                    <span className="text-white fw-bold fs-5">
                      {user.userFirstName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-bold">
                      {user.userFirstName} {user.userLastName}
                    </h6>
                    <small className="text-muted">{user.email}</small>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {getRoleBadge(user.role)}
                  </div>
                  <div>
                    <span className={`fw-bold ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {usersData.length === 0 && !usersLoading && (
        <div className="text-center py-4">
          <div className="text-muted">No users found</div>
        </div>
      )}
    </div>
  );
};

export default ClientsList; 