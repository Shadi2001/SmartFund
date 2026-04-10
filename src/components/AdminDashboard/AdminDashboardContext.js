import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { ToastContext } from "../ToastContext";

const AdminDashboardContext = createContext();

// When no auth token exists (common local dev) or when explicitly enabled,
// seed mock data so the dashboard renders without the backend.
const shouldUseMockAdminData = () => {
  const token = localStorage.getItem("token");
  const explicitMock = localStorage.getItem("useMockAdminData") === "true";
  return explicitMock || !token;
};

const MOCK_USERS = [
  {
    _id: "mock_user_001",
    userFirstName: "Amina",
    userLastName: "Rahman",
    email: "amina.rahman@example.com",
    role: "borrower",
    status: "eligible",
    phoneNumber: "+1-415-555-0134",
    DateOfBirth: "1995-04-18T00:00:00.000Z",
    gender: "female",
    creditID: "CRD-10492-AX",
    income: 72000,
    loanRole: ["Borrower"],
    address: "221B Market St, San Francisco, CA",
    isVerified: true,
    isActive: true,
    createdAt: "2025-01-12T09:15:00.000Z",
    updatedAt: "2026-02-20T12:40:00.000Z",
  },
];

const MOCK_ACTIVE_LOANS_BY_USER_ID = {
  mock_user_001: {
    summary: {
      totalActiveLoans: 2,
      asBorrower: { totalAmount: 125000 },
      asSponsor: { totalSponsoredAmount: 82000 },
      totalRemainingBalance: 61450,
    },
    activeLoans: [
      {
        contractId: "mock_contract_1001",
        loanType: { type: "Medical Loan", term: "12 months" },
        loanDetails: {
          amount: 75000,
          remainingBalance: 38200,
          startDate: "2025-12-01T00:00:00.000Z",
          endDate: "2026-11-30T00:00:00.000Z",
          interestRate: 8.5,
        },
        paymentStats: {
          progressPercentage: 62,
          total: 18500,
          paid: 11450,
          unpaid: 7050,
          overdue: 0,
        },
        userRole: "Borrower",
        participants: {
          borrower: { firstName: "Amina", lastName: "Rahman" },
          sponsor1: { firstName: "Diego", lastName: "Martinez" },
        },
        payments: [
          {
            id: "mock_payment_1",
            amount: 1550,
            dueDate: "2026-02-15T00:00:00.000Z",
            status: "paid",
          },
          {
            id: "mock_payment_2",
            amount: 1550,
            dueDate: "2026-03-15T00:00:00.000Z",
            status: "due",
          },
          {
            id: "mock_payment_3",
            amount: 1550,
            dueDate: "2026-04-15T00:00:00.000Z",
            status: "overdue",
          },
        ],
      },
      {
        contractId: "mock_contract_1002",
        loanType: { type: "Micro Projects Loan", term: "6 months" },
        loanDetails: {
          amount: 50000,
          remainingBalance: 23250,
          startDate: "2026-01-10T00:00:00.000Z",
          endDate: "2026-07-09T00:00:00.000Z",
          interestRate: 6.75,
        },
        paymentStats: {
          progressPercentage: 34,
          total: 9800,
          paid: 3320,
          unpaid: 6480,
          overdue: 240,
        },
        userRole: "Borrower",
        participants: {
          borrower: { firstName: "Amina", lastName: "Rahman" },
          sponsor1: { firstName: "Sofia", lastName: "Khan" },
          sponsor2: { firstName: "Noah", lastName: "Brooks" },
        },
        payments: [
          {
            id: "mock_payment_4",
            amount: 1633,
            dueDate: "2026-02-01T00:00:00.000Z",
            status: "paid",
          },
          {
            id: "mock_payment_5",
            amount: 1633,
            dueDate: "2026-03-01T00:00:00.000Z",
            status: "due",
          },
        ],
      },
    ],
  },
};

const MOCK_COMPLETED_LOANS_BY_USER_ID = {
  mock_user_001: {
    summary: {
      asBorrower: { count: 1, totalAmount: 45000 },
      asSponsor: { count: 1, totalSponsoredAmount: 45000 },
    },
    completedLoans: [
      {
        contractId: "mock_contract_9001",
        loanType: { type: "Educational Loan", term: "9 months" },
        loanDetails: {
          amount: 45000,
          termMonths: 9,
          interestRate: 7.9,
          startDate: "2025-02-01T00:00:00.000Z",
        },
        completedAt: "2025-10-29T00:00:00.000Z",
        userRole: "Borrower",
        participants: {
          borrower: { firstName: "Amina", lastName: "Rahman" },
          sponsor1: { firstName: "Mia", lastName: "Chen" },
        },
      },
    ],
  },
};

const MOCK_STATS_DATA = {
  totalUsers: 128,
  totalFunds: 640000,
  fundsAccepted: 42,
  fundsRejected: 98000,
};

const MOCK_PIE_CHART_DATA = {
  Educational: 18,
  Medical: 17,
  Micro: 7,
};

const MOCK_PENDING_CONTRACTS = [
  {
    id: "mock_contract_2001",
    loanDetails: {
      typeTermName: "Medical Loan - 12 months",
      amount: 125000,
    },
    borrower: { firstName: "Amina", lastName: "Rahman" },
    createdAt: "2026-03-01T10:30:00.000Z",
    status: "pending",
  },
];

const MOCK_CONTRACT_DOCUMENTS_BY_CONTRACT_ID = {
  mock_contract_2001: [
    {
      id: "mock_doc_3001",
      type: "Proof of Income",
      uploadedAt: "2026-03-02T10:00:00.000Z",
      documentFile: {
        url: "https://via.placeholder.com/1200x800.png?text=Proof+of+Income",
      },
    },
    {
      id: "mock_doc_3002",
      type: "KYC / ID Document",
      uploadedAt: "2026-03-03T15:20:00.000Z",
      documentFile: {
        url: "https://via.placeholder.com/1200x800.png?text=KYC+%2F+ID+Document",
      },
    },
  ],
};

const MOCK_NOTIFICATIONS = [
  {
    _id: "mock_notif_001",
    message: "New pending contract submitted by Amina Rahman.",
    createdAt: "2026-03-15T14:00:00.000Z",
  },
  {
    _id: "mock_notif_002",
    message: "Document review required: Proof of Income (Mock Contract).",
    createdAt: "2026-03-20T10:00:00.000Z",
  },
];

export const useAdminDashboard = () => {
  const context = useContext(AdminDashboardContext);
  if (!context) {
    throw new Error(
      "useAdminDashboard must be used within an AdminDashboardProvider"
    );
  }
  return context;
};

export const AdminDashboardProvider = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const { ShowHideToast } = useContext(ToastContext);

  // Section state
  const [section, setSection] = useState("stats");

  // Stats state
  const [statsData, setStatsData] = useState(MOCK_STATS_DATA);
  const [statsLoading, setStatsLoading] = useState(true); // Start with true for initial load
  const [statsLastFetched, setStatsLastFetched] = useState(null);
  const [initialStatsLoaded, setInitialStatsLoaded] = useState(false);

  // Review state
  const [pendingContracts, setPendingContracts] = useState(
    shouldUseMockAdminData() ? MOCK_PENDING_CONTRACTS : []
  );
  const [selectedContract, setSelectedContract] = useState(null);
  const [contractDocuments, setContractDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectingDocument, setRejectingDocument] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  // Notifications state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(
    shouldUseMockAdminData() ? MOCK_NOTIFICATIONS : []
  );
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [markAllReadLoading, setMarkAllReadLoading] = useState(false);

  //pie chart data
  const [pieChartData, setPieChartData] = useState(MOCK_PIE_CHART_DATA);

  // Users data
  const [usersData, setUsersData] = useState(
    shouldUseMockAdminData() ? MOCK_USERS : []
  );
  const [usersLoading, setUsersLoading] = useState(false);
  const [userDetailsLoading, setUserDetailsLoading] = useState(false);

  // Completed loans data
  const [completedLoansData, setCompletedLoansData] = useState(null);
  const [completedLoansLoading, setCompletedLoansLoading] = useState(false);

  // Active loans data
  const [activeLoansData, setActiveLoansData] = useState(null);
  const [activeLoansLoading, setActiveLoansLoading] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      if (shouldUseMockAdminData()) {
        setUsersData(MOCK_USERS);
        return;
      }
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/admins/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.users) {
          setUsersData(data.users);
        }
      } else {
        console.error("Failed to fetch users");
        ShowHideToast("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      ShowHideToast("Error fetching users");
    } finally {
      setUsersLoading(false);
    }
  };

  // Fetch a single user's full details by ID
  const fetchUserById = async (userId) => {
    if (!userId) return null;
    setUserDetailsLoading(true);
    try {
      if (shouldUseMockAdminData()) {
        return MOCK_USERS.find((u) => u._id === userId) || null;
      }
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/admins/users/${userId}` , {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Support different shapes: { success, user }, or direct user
        const detailedUser = data?.user || data;
        return detailedUser || null;
      } else {
        console.error("Failed to fetch user details");
        ShowHideToast("Failed to fetch user details");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      ShowHideToast("Error fetching user details");
      return null;
    } finally {
      setUserDetailsLoading(false);
    }
  };

  // Fetch completed loans for a specific user
  const fetchCompletedLoans = async (userId) => {
    setCompletedLoansLoading(true);
    try {
      if (shouldUseMockAdminData()) {
        const mock =
          MOCK_COMPLETED_LOANS_BY_USER_ID[userId] || {
            summary: {
              asBorrower: { count: 0, totalAmount: 0 },
              asSponsor: { count: 0, totalSponsoredAmount: 0 },
            },
            completedLoans: [],
          };
        setCompletedLoansData(mock);
        return;
      }
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/admins/users/${userId}/completed-loans`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCompletedLoansData(data);
        }
      } else {
        console.error("Failed to fetch completed loans");
        ShowHideToast("Failed to fetch completed loans");
      }
    } catch (error) {
      console.error("Error fetching completed loans:", error);
      ShowHideToast("Error fetching completed loans");
    } finally {
      setCompletedLoansLoading(false);
    }
  };

  // Fetch active loans for a specific user
  const fetchActiveLoans = async (userId) => {
    setActiveLoansLoading(true);
    try {
      if (shouldUseMockAdminData()) {
        const mock =
          MOCK_ACTIVE_LOANS_BY_USER_ID[userId] || {
            summary: {
              totalActiveLoans: 0,
              asBorrower: { totalAmount: 0 },
              asSponsor: { totalSponsoredAmount: 0 },
              totalRemainingBalance: 0,
            },
            activeLoans: [],
          };
        setActiveLoansData(mock);
        return;
      }
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/admins/users/${userId}/active-loans`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setActiveLoansData(data);
        }
      } else {
        console.error("Failed to fetch active loans");
        ShowHideToast("Failed to fetch active loans");
      }
    } catch (error) {
      console.error("Error fetching active loans:", error);
      ShowHideToast("Error fetching active loans");
    } finally {
      setActiveLoansLoading(false);
    }
  };

  // Fetch admin dashboard statistics
  const fetchAdminStats = async () => {
    // Prevent duplicate requests within 10 seconds (reduced from 30)
    const now = Date.now();
    if (statsLastFetched && now - statsLastFetched < 10000) {
      return;
    }

    setStatsLoading(true);
    try {
      if (shouldUseMockAdminData()) {
        setStatsData(MOCK_STATS_DATA);
        setPieChartData(MOCK_PIE_CHART_DATA);
        setStatsLastFetched(now);
        setInitialStatsLoaded(true);
        return;
      }
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/admins/dashboard/stats",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.statistics) {
          setStatsData({
            totalUsers: data.statistics.users.total || 0,
            totalFunds: data.statistics.loans.total || 0,
            fundsAccepted: data.statistics.contracts.approved || 0,
            fundsRejected: data.statistics.loans.totalFundedAmount || 0,
          });
          const types =
            (data.loanTypeDistribution && data.loanTypeDistribution.types) ||
            {};
          const educationalCount = types["Educational Loan"]?.count ?? 0;
          const medicalCount = types["Medical Loan"]?.count ?? 0;
          const microCount = types["Micro Projects Loan"]?.count ?? 0;
          setPieChartData({
            Educational: educationalCount,
            Medical: medicalCount,
            Micro: microCount,
          });
          setStatsLastFetched(now);
          setInitialStatsLoaded(true);
        }
      } else {
        console.error("Failed to fetch admin stats");
      }
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  // Fetch pending contracts from API
  const fetchPendingContracts = async () => {
    setLoading(true);
    try {
      if (shouldUseMockAdminData()) {
        setPendingContracts(MOCK_PENDING_CONTRACTS);
        setError(null);
        return;
      }
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/admins/contracts/pending-documents",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(response);

        // Handle different possible response structures
        if (Array.isArray(data)) {
          setPendingContracts(data);
        } else if (data && Array.isArray(data.pendingDocuments)) {
          setPendingContracts(data.pendingDocuments);
        } else if (data && Array.isArray(data.contracts)) {
          setPendingContracts(data.contracts);
        } else {
          console.warn("Unexpected API response structure:", data);
          setPendingContracts([]);
        }
        setError(null);
      } else {
        console.error("Failed to fetch pending contracts");
        setError("Failed to fetch pending contracts");
      }
    } catch (error) {
      console.error("Error fetching pending contracts:", error);
      setError("Error fetching pending contracts");
    } finally {
      setLoading(false);
    }
  };

  //fetch contract documents
  const fetchContractDocuments = async (contractId) => {
    setLoading(true);
    try {
      if (shouldUseMockAdminData()) {
        setContractDocuments(
          MOCK_CONTRACT_DOCUMENTS_BY_CONTRACT_ID[contractId] || []
        );
        setError(null);
        return;
      }
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/admins/contracts/${contractId}/pending-documents`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Contract documents response:", data); // Debug log
        
        // Handle different possible response structures
        let documents = [];
        if (Array.isArray(data)) {
          documents = data;
        } else if (data && Array.isArray(data.pendingDocuments)) {
          documents = data.pendingDocuments;
        } else if (data && Array.isArray(data.documents)) {
          documents = data.documents;
        } else {
          console.warn("Unexpected documents response structure:", data);
          documents = [];
        }
        
        setContractDocuments(documents);
        setError(null);
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch contract documents:", response.status, errorText);
        setError(`Failed to fetch contract documents: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching contract documents:", error);
      setError("Error fetching contract documents");
    } finally {
      setLoading(false);
    }
  };

  // Document approval/rejection API call
  const handleDocumentAction = async (documentId, action) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      let requestBody = {};

      if (action === "approve") {
        requestBody = {
          status: "approved",
          rejectionReason: "",
          adminNotes: "",
        };
      } else if (action === "reject") {
        // For rejection, we'll show a modal to get rejection reason and admin notes
        setRejectingDocument({ id: documentId, type: "Document" });
        setShowRejectionModal(true);
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/admins/documents/${documentId}/review`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        ShowHideToast(`Document ${documentId} ${action}d successfully`);
        // Refresh the contract documents to update the list
        if (selectedContract) {
          fetchContractDocuments(selectedContract.id);
        }
      } else {
        console.error(`Failed to ${action} document`);
        ShowHideToast(`Failed to ${action} document. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${action}ing document:`, error);
      ShowHideToast(`Error ${action}ing document. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Handle document rejection with reason and notes
  const handleDocumentRejection = async () => {
    if (!rejectingDocument) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const requestBody = {
        status: "rejected",
        rejectionReason: rejectionReason,
        adminNotes: adminNotes,
      };

      const response = await fetch(
        `http://localhost:3000/api/admins/documents/${rejectingDocument.id}/review`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        ShowHideToast(`Document ${rejectingDocument.id} rejected successfully`);
        // Close modal and reset form
        setShowRejectionModal(false);
        setRejectingDocument(null);
        setRejectionReason("");
        setAdminNotes("");
        // Refresh the contract documents to update the list
        if (selectedContract) {
          fetchContractDocuments(selectedContract.id);
        }
      } else {
        console.error("Failed to reject document");
        ShowHideToast("Failed to reject document. Please try again.");
      }
    } catch (error) {
      console.error("Error rejecting document:", error);
      ShowHideToast("Error rejecting document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications from API
  const fetchNotifications = async () => {
    setNotificationsLoading(true);
    try {
      if (shouldUseMockAdminData()) {
        setNotifications(MOCK_NOTIFICATIONS);
        return;
      }
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/contracts/notifications",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Notifications API response:", data); // Debug log
        // Check if notifications exist in the response (API returns { notifications: [...] })
        if (data.notifications && Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
        } else {
          console.warn("No notifications array in response:", data);
          setNotifications([]);
        }
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setNotificationsLoading(false);
    }
  };

  // Mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    if (!notificationId) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/contracts/notifications/${notificationId}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Remove the notification from the list
        setNotifications((prev) =>
          prev.filter((notif) => (notif._id || notif.id) !== notificationId)
        );
        ShowHideToast("Notification marked as read!");
      } else {
        console.error("Failed to mark notification as read");
        ShowHideToast("Failed to mark notification as read. Please try again.");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      ShowHideToast("Failed to mark notification as read. Please try again.");
    }
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = async () => {
    if (notifications.length === 0) return;

    setMarkAllReadLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/contracts/notifications/read-all",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setNotifications([]);
        ShowHideToast("All notifications marked as read!");
      } else {
        console.error("Failed to mark all notifications as read");
        ShowHideToast(
          "Failed to mark all notifications as read. Please try again."
        );
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      ShowHideToast(
        "Failed to mark all notifications as read. Please try again."
      );
    } finally {
      setMarkAllReadLoading(false);
    }
  };

  // Initialize data when component mounts - prioritize stats first
  useEffect(() => {
    // Load stats immediately for main dashboard
    fetchAdminStats();
    
    // Defer other API calls to reduce initial latency
    const timeoutId = setTimeout(() => {
      fetchPendingContracts();
      fetchUsers();
      fetchNotifications();
    }, 100); // Small delay to let stats load first
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Fetch data when section changes
  useEffect(() => {
    if (section === "review") {
      fetchPendingContracts();
    }
    if (section === "stats") {
      // Only fetch stats if we haven't fetched recently or if it's the first time
      if (!statsLastFetched || statsData.totalUsers === 0) {
        fetchAdminStats();
      }
    }
    if (section === "clients") {
      fetchUsers();
    }
  }, [section]);

  useEffect(() => {
    if (selectedContract) {
      fetchContractDocuments(selectedContract.id);
    }
  }, [selectedContract]);

  const value = {
    // State
    user,
    logout,
    section,
    statsData,
    statsLoading,
    initialStatsLoaded,
    pendingContracts,
    selectedContract,
    contractDocuments,
    loading,
    error,
    showRejectionModal,
    rejectingDocument,
    rejectionReason,
    adminNotes,
    showNotifications,
    notifications,
    notificationsLoading,
    markAllReadLoading,
    usersData,
    usersLoading,
    userDetailsLoading,
    completedLoansData,
    completedLoansLoading,
    activeLoansData,
    activeLoansLoading,

    // Setters
    setSection,
    setSelectedContract,
    setShowRejectionModal,
    setRejectingDocument,
    setRejectionReason,
    setAdminNotes,
    setShowNotifications,

    // Functions
    fetchAdminStats,
    fetchUsers,
    fetchCompletedLoans,
    fetchActiveLoans,
    fetchPendingContracts,
    fetchContractDocuments,
    fetchNotifications,
    fetchUserById,
    handleDocumentAction,
    handleDocumentRejection,
    markNotificationAsRead,
    markAllNotificationsAsRead,

    //pie chart data
    pieChartData,
  };

  return (
    <AdminDashboardContext.Provider value={value}>
      {children}
    </AdminDashboardContext.Provider>
  );
};
