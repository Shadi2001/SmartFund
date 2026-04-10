import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';


// Renders overdue users from a fixed API endpoint
const Overdue = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch overdue payments from API
    const fetchOverdue = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const response = await axios.get('http://localhost:3000/api/admins/borrowers/late-payments');
        
        if (response.data.success) {
          setRows(response.data.borrowers || []);
        } else {
          setErrorMessage('Failed to load overdue payments');
        }
      } catch (err) {
        console.error('Error fetching overdue payments:', err);
        setErrorMessage('Failed to load overdue payments');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOverdue();
  }, []);

  // Define specific headers for overdue data
  const headers = useMemo(() => [
    'fullName',
    'email', 
    'latePaymentsCount',
    'totalOverdueAmount',
    'oldestDueDate',
    'latestDueDate'
  ], []);

  const formatHeader = (key) => {
    const headerMap = {
      'fullName': 'Borrower Name',
      'email': 'Email',
      'latePaymentsCount': 'Late Payments',
      'totalOverdueAmount': 'Total Overdue',
      'oldestDueDate': 'Oldest Due Date',
      'latestDueDate': 'Latest Due Date'
    };
    return headerMap[key] || key;
  };

  const formatValue = (key, row) => {
    if (!row) return '';
    
    switch (key) {
      case 'fullName':
        return `${row.user?.firstName || ''} ${row.user?.lastName || ''}`.trim() || 'Unknown';
      case 'email':
        return row.user?.email || 'No email';
      case 'latePaymentsCount':
        return (
          <span className="badge bg-warning text-dark">
            {row.metrics?.latePaymentsCount || 0}
          </span>
        );
      case 'totalOverdueAmount':
        return `$${(row.metrics?.totalOverdueAmount || 0).toLocaleString()}`;
      case 'oldestDueDate':
      case 'latestDueDate':
        const date = row.metrics?.[key];
        return date ? new Date(date).toLocaleDateString() : 'N/A';
      default:
        return String(row[key] || '');
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h5 className="mb-4" style={{ color: "#828282", fontWeight: 600 }}>
        Overdue Payments
      </h5>

      {isLoading && (
        <div
          style={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2">Loading overdue payments...</span>
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && rows.length === 0 && (
        <div
          style={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#aaa',
            fontSize: 18,
          }}
        >
          No overdue payments available
        </div>
      )}

      {!isLoading && !errorMessage && rows.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
              <tr>
                {headers.map((key) => (
                  <th key={key} className="text-nowrap" style={{ whiteSpace: 'nowrap' }}>
                    {formatHeader(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.borrowerId || idx}>
                  {headers.map((key) => (
                    <td key={key}>
                      {formatValue(key, row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Overdue;
