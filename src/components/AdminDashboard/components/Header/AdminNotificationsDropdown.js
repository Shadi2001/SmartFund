import React, { useState, useEffect } from 'react';
import { useAdminDashboard } from '../../AdminDashboardContext';

const AdminNotificationsDropdown = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const {
    notifications,
    notificationsLoading,
    markAllReadLoading,
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = useAdminDashboard();

  // Effect to handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications) {
        const notificationsDropdown = event.target.closest('.position-relative');
        if (!notificationsDropdown) {
          setShowNotifications(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <div className="position-relative">
      <button
        style={{ 
          background: "transparent", 
          color: "white", 
          border: "none",
          padding: "8px 12px"
        }}
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <i className="fas fa-bell"></i>
        {notifications.length > 0 && (
          <span 
            className="badge rounded-pill ms-1" 
            style={{ 
              background: 'red', 
              color: 'white', 
              fontSize: '0.6rem',
              padding: '2px 4px',
              position:"absolute",
              
            }}
          >
            {notifications.length}
          </span>
        )}
      </button>
      
      {/* Notifications Dropdown */}
      {showNotifications && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            width: 320,
            background: 'white',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            borderRadius: 8,
            zIndex: 10,
            color: '#222',
            marginTop: '8px'
          }}
          className="p-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>Notifications</div>
          {notificationsLoading ? (
            <div className="text-muted" style={{ padding: '16px 0', textAlign: 'center' }}>
              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-muted" style={{ padding: '16px 0', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: '#ddd', marginBottom: '8px' }}>
                <i className="fas fa-bell-slash"></i>
              </div>
              No notifications
              <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                New notifications will appear here
              </div>
            </div>
          ) : (
            <>
              {/* Scrollable notifications container */}
              <div 
                style={{ 
                  maxHeight: '240px',
                  overflowY: 'auto',
                  marginBottom: '8px'
                }}
              >
                {notifications.map((notif, index) => (
                  <div 
                    key={notif._id || notif.id || index} 
                    style={{ 
                      borderBottom: index < notifications.length - 1 ? '1px solid #eee' : 'none', 
                      padding: '8px 0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ flex: 1, textAlign: 'left', paddingRight: '8px' }}>
                      <div style={{ fontSize: 14, color: '#222', marginBottom: '2px' }}>{notif.message}</div>
                      <div style={{ fontSize: 12, color: '#888' }}>
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationAsRead(notif._id || notif.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#28a745',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        transition: 'background-color 0.2s ease',
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      title="Mark as read"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  </div>
                ))}
              </div>
              {/* Mark All as Read Button */}
              <div style={{ borderTop: '1px solid #eee', paddingTop: 12, marginTop: 8 }}>
                <button
                  onClick={markAllNotificationsAsRead}
                  disabled={markAllReadLoading}
                  className="btn btn-sm w-100"
                  style={{
                    background: '#0343f2',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 500
                  }}
                >
                  {markAllReadLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Marking...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check-double me-2"></i>
                      Mark All as Read
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminNotificationsDropdown;
