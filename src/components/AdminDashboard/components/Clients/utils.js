// Utility functions for client components

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatIncome = (income) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(income);
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'eligible':
      return 'text-primary';
    case 'pending':
      return 'text-warning';
    case 'ineligible':
      return 'text-danger';
    default:
      return 'text-secondary';
  }
};

export const getRoleBadge = (role) => {
  
  return (
    <span style={{ backgroundColor: '#007bff' }} className={`badge  text-white`}>
      {role.toUpperCase()}
    </span>
  );
}; 