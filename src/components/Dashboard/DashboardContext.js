import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { ToastContext } from "../ToastContext";

const DashboardContext = createContext();

// Mock data used when the backend isn't running (e.g., local UI demo).
const MOCK_USER_ID = "mock_user_001";

const MOCK_USER_PROFILE = {
  email: "user@smartfund.local",
  phoneNumber: "+1-415-555-0147",
  DateOfBirth: "1994-07-09T00:00:00.000Z",
  gender: "female",
  creditID: "CRD-10492-MK",
  income: 72000,
  address: "55 Ocean View Ave, San Francisco, CA",
  password: "UserPass123!",
};

const MOCK_NOTIFICATIONS = [
  {
    _id: "mock_notif_u_001",
    message: "Your monthly payment is scheduled soon.",
    createdAt: "2026-03-10T10:00:00.000Z",
  },
  {
    _id: "mock_notif_u_002",
    message: "A sponsor request update is available in your dashboard.",
    createdAt: "2026-03-18T09:30:00.000Z",
  },
];

const MOCK_USER_LOANS = [
  {
    extractedId: "mock_loan_001",
    loanTypeName: "Medical Loan",
    userRole: "Borrower",
    startDate: "2026-01-10T00:00:00.000Z",
  },
  {
    extractedId: "mock_loan_002",
    loanTypeName: "Micro Projects Loan",
    userRole: "Borrower",
    startDate: "2026-02-01T00:00:00.000Z",
  },
];

const MOCK_LOAN_DETAILS_BY_ID = {
  mock_loan_001: {
    loan: {
      loanTypeName: "Medical Loan",
      interestRate: 8.5,
      startDate: "2026-01-10T00:00:00.000Z",
      endDate: "2026-12-10T00:00:00.000Z",
      loanTermMonths: 12,
      status: "active",
      loanAmount: 75000,
    },
    totalAmount: 75000,
    paidAmount: 30000,
    remainingAmount: 45000,
    payments: [
      {
        _id: "mock_pay_u_001",
        dueDate: "2026-02-15T00:00:00.000Z",
        amount: 5500,
        status: "paid",
      },
      {
        _id: "mock_pay_u_002",
        dueDate: "2026-03-15T00:00:00.000Z",
        amount: 5500,
        status: "pending",
      },
      {
        _id: "mock_pay_u_003",
        dueDate: "2026-04-15T00:00:00.000Z",
        amount: 5500,
        status: "late",
      },
    ],
    sponsors: [
      {
        id: "mock_sponsor_001",
        name: "Diego Martinez",
        email: "diego.martinez@example.com",
      },
    ],
  },
  mock_loan_002: {
    loan: {
      loanTypeName: "Micro Projects Loan",
      interestRate: 6.75,
      startDate: "2026-02-01T00:00:00.000Z",
      endDate: "2026-07-31T00:00:00.000Z",
      loanTermMonths: 6,
      status: "active",
      loanAmount: 50000,
    },
    totalAmount: 50000,
    paidAmount: 14000,
    remainingAmount: 36000,
    payments: [
      {
        _id: "mock_pay_u_004",
        dueDate: "2026-03-01T00:00:00.000Z",
        amount: 3300,
        status: "pending",
      },
      {
        _id: "mock_pay_u_005",
        dueDate: "2026-04-01T00:00:00.000Z",
        amount: 3300,
        status: "pending",
      },
    ],
    sponsors: [
      {
        id: "mock_sponsor_002",
        name: "Sofia Khan",
        email: "sofia.khan@example.com",
      },
      {
        id: "mock_sponsor_003",
        name: "Noah Brooks",
        email: "noah.brooks@example.com",
      },
    ],
  },
};

const MOCK_SPONSORS = [
  { id: "mock_sponsor_001", name: "Diego Martinez", email: "diego.martinez@example.com" },
  { id: "mock_sponsor_002", name: "Sofia Khan", email: "sofia.khan@example.com" },
];

const MOCK_PENDING_CONTRACTS = [
  {
    _id: "mock_contract_u_001",
    status: "pending_document_upload",
    typeTerm: { name: "Medical Loan" },
    loanAmount: 125000,
    startDate: "2026-03-01T10:30:00.000Z",
    loanTermMonths: 12,
    sponsor1: { firstName: "Amina", lastName: "Rahman" },
    sponsor2: { firstName: "Diego", lastName: "Martinez" },
  },
];

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const { token, dashboardData } = useContext(AuthContext);
  const { ShowHideToast } = useContext(ToastContext);

  const shouldUseMockUserDashboard =
    localStorage.getItem("useMockUserData") === "true" || !token;

  // Notifications state
  const [notifications, setNotifications] = useState(
    shouldUseMockUserDashboard ? MOCK_NOTIFICATIONS : []
  );
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [markAllReadLoading, setMarkAllReadLoading] = useState(false);

  // Sponsor requests state
  const [sponsorRequests, setSponsorRequests] = useState(
    shouldUseMockUserDashboard ? [] : []
  );
  const [sponsorRequestsLoading, setSponsorRequestsLoading] = useState(false);
  const [processingRequest, setProcessingRequest] = useState(null);

  // User loans state
  const [userLoans, setUserLoans] = useState(
    shouldUseMockUserDashboard ? MOCK_USER_LOANS : []
  );
  const [userLoansLoading, setUserLoansLoading] = useState(false);

  // Selected loan state
  const [selectedLoan, setSelectedLoan] = useState(
    shouldUseMockUserDashboard ? "mock_loan_001" : null
  );
  const [selectedLoanData, setSelectedLoanData] = useState(
    shouldUseMockUserDashboard ? MOCK_LOAN_DETAILS_BY_ID.mock_loan_001 : undefined
  );
  const [selectedLoanLoading, setSelectedLoanLoading] = useState(false);

  // Sponsors state
  const [sponsors, setSponsors] = useState(
    shouldUseMockUserDashboard ? MOCK_SPONSORS : []
  );
  const [sponsorsLoading, setSponsorsLoading] = useState(false);

  // Pending contracts state
  const [pendingContracts, setPendingContracts] = useState(
    shouldUseMockUserDashboard ? MOCK_PENDING_CONTRACTS : []
  );
  const [pendingContractsLoading, setPendingContractsLoading] = useState(false);

  // Profile state
  const [userProfileData, setUserProfileData] = useState(
    shouldUseMockUserDashboard
      ? { ...MOCK_USER_PROFILE, _id: MOCK_USER_ID, userId: MOCK_USER_ID }
      : null
  );
  const [profileLoading, setProfileLoading] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  // Payment state
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!token) {
      if (shouldUseMockUserDashboard) {
        setNotifications(MOCK_NOTIFICATIONS);
      }
      return;
    }

    setNotificationsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setNotificationsLoading(false);
    }
  };

  // Fetch sponsor requests
  const fetchSponsorRequests = async () => {
    if (!token) return;

    setSponsorRequestsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/notifications/sponsor-requests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSponsorRequests(response.data.sponsorRequests || []);
    } catch (error) {
      console.error("Error fetching sponsor requests:", error);
      setSponsorRequests([]);
    } finally {
      setSponsorRequestsLoading(false);
    }
  };

  // Fetch user loans
  const fetchUserLoans = async () => {
    if (!token) {
      if (shouldUseMockUserDashboard) {
        setUserLoans(MOCK_USER_LOANS);
      }
      return;
    }

    setUserLoansLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/loans/user-loans",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (Array.isArray(response.data)) {
        const loansWithIds = response.data.map((loan, index) => {
          const loanId =
            loan.LoanId || loan._id || loan.id || loan.loanId || loan.loanID;
          return {
            ...loan,
            extractedId: loanId || `temp_${index}`,
          };
        });
        setUserLoans(loansWithIds);
      } else {
        setUserLoans([]);
      }
    } catch (error) {
      console.error("Error fetching user loans:", error);
      setUserLoans([]);
    } finally {
      setUserLoansLoading(false);
    }
  };

  // Fetch loan details
  const fetchLoanDetails = async (loanId) => {
    if (!loanId) return;

    if (!token) {
      if (shouldUseMockUserDashboard) {
        const mock = MOCK_LOAN_DETAILS_BY_ID[loanId] || null;
        setSelectedLoanData(mock);
        setSelectedLoan(mock ? loanId : null);
      }
      return;
    }

    setSelectedLoanLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/loans/${loanId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && response.data.loan) {
        const loanData = {
          ...response.data,
          loan: {
            ...response.data.loan,
            loanTypeName: response.data.typeTermID || "Unknown Type",
            _id: loanId,
          },
          totalAmount:
            response.data.totalAmount ||
            response.data.totalA ||
            response.data.loan?.loanAmount ||
            0,
          paidAmount: response.data.paidAmount || 0,
          remainingAmount: response.data.remainingAmount || 0,
          payments: response.data.payments || [],
        };

        setSelectedLoanData(loanData);
        setSelectedLoan(loanId);
      } else {
        setSelectedLoanData(null);
        setSelectedLoan(null);
      }
    } catch (error) {
      
      ShowHideToast("Failed to fetch loan details. Please try again.","error");
    } finally {
      setSelectedLoanLoading(false);
    }
  };

  // Fetch sponsors
  const fetchSponsors = async () => {
    if (!token) {
      if (shouldUseMockUserDashboard) {
        setSponsors(MOCK_SPONSORS);
      }
      return;
    }

    setSponsorsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/loans/active",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSponsors(response.data.sponsors || []);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
      setSponsors([]);
    } finally {
      setSponsorsLoading(false);
    }
  };

  // Fetch pending contracts
  const fetchPendingContracts = async () => {
    if (!token) {
      if (shouldUseMockUserDashboard) {
        setPendingContracts(MOCK_PENDING_CONTRACTS);
      }
      setPendingContractsLoading(false);
      return;
    }

    setPendingContractsLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:3000/api/contracts/pending-contracts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response)
      if (response.data && response.data.pendingContracts) {
        setPendingContracts(response.data.pendingContracts);
      } else {
        setPendingContracts([]);
      }
    } catch (error) {
      console.error("Error fetching pending contracts:", error);
      setPendingContracts([]);
    } finally {
      setPendingContractsLoading(false);
    }
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!token) {
      if (shouldUseMockUserDashboard) {
        setUserProfileData(MOCK_USER_PROFILE);
        setEditFormData({
          firstName: "",
          lastName: "",
          email: MOCK_USER_PROFILE.email,
          password: MOCK_USER_PROFILE.password,
          phoneNumber: MOCK_USER_PROFILE.phoneNumber,
          DateOfBirth: MOCK_USER_PROFILE.DateOfBirth
            ? MOCK_USER_PROFILE.DateOfBirth.split("T")[0]
            : "",
          gender: MOCK_USER_PROFILE.gender,
          income: MOCK_USER_PROFILE.income || "",
          creditID: MOCK_USER_PROFILE.creditID,
          address: MOCK_USER_PROFILE.address,
        });
      }
      return;
    }

    setProfileLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success && response.data.user) {
        setUserProfileData(response.data.user);
        setEditFormData({
          firstName: response.data.user.firstName || "",
          lastName: response.data.user.lastName || "",
          email: response.data.user.email || "",
          password: response.data.user.password || "",
          phoneNumber: response.data.user.phoneNumber || "",
          DateOfBirth: response.data.user.DateOfBirth
            ? response.data.user.DateOfBirth.split("T")[0]
            : "",
          gender: response.data.user.gender || "",
          income: response.data.user.income || "",
          creditID: response.data.user.creditID || "",
          address: response.data.user.address || "",
        });

        if (response.data.user.profilePhoto) {
          const imageUrl = `http://localhost:3000${response.data.user.profilePhoto}`;
          setProfileImage(imageUrl);
        } else if (response.data.user.profileImage) {
          setProfileImage(response.data.user.profileImage);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setProfileLoading(false);
    }
  };

  // Mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    if (!token || !notificationId) return;

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/notifications/${notificationId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (
        response.data.success ||
        response.data.message === "Notification marked as read"
      ) {
        setNotifications((prev) =>
          prev.filter((notif) => (notif._id || notif.id) !== notificationId)
        );
        ShowHideToast("Notification marked as read!","success");   
      }
    } catch (error) {
      
      ShowHideToast("Failed to mark notification as read. Please try again.","error");
    }
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = async () => {
    if (!token || notifications.length === 0) return;

    setMarkAllReadLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/notifications/read-all",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "All notifications marked as read") {
        setNotifications([]);
        ShowHideToast("All notifications marked as read!","success");
      }
    } catch (error) {
      
      ShowHideToast("Failed to mark notifications as read. Please try again.","error");
    } finally {
      setMarkAllReadLoading(false);
    }
  };

  // Handle sponsor request action
  const handleSponsorRequestAction = async (request, action) => {
    if (!token || !request) return;

    setProcessingRequest(request.id);

    try {
      const endpoint = action === "accept" ? "accept" : "reject";
      const response = await axios.post(
        `http://localhost:3000/api/notifications/sponsor-requests/${request.contractId}/${endpoint}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success || response.status === 200) {
        ShowHideToast(`Sponsor request ${action}d successfully!`,"success");
        setSponsorRequests((prev) =>
          prev.filter((req) => req.id !== request.id)
        );
      } else {
        ShowHideToast(`Failed to ${action} sponsor request. Please try again.`,"error");   
      }
    } catch (error) {
      console.error(`Error ${action}ing sponsor request:`, error);
      ShowHideToast(`Failed to ${action} sponsor request. Please try again.`,"error");
    } finally {
      setProcessingRequest(null);
    }
  };

  // Process payment
  const processPayment = async (paymentId) => {
    if (!token || !paymentId) return;

    setPaymentProcessing(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/payments/process/${paymentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setShowQRModal(false);
      setSelectedPayment(null);
      ShowHideToast("Payment processed successfully!","success");
    } catch (error) {
      
      ShowHideToast("Payment failed. Please try again.","error");
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Delete pending contract
  const deleteContract = async (contractId) => {
    if (!token || !contractId) return false;

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/contracts/${contractId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success || response.status === 200) {
        setPendingContracts((prev) =>         
          prev.filter((contract) => {
            const id = contract._id || contract.id || contract.contractId || contract.contract?.id || contract.contract?._id;
            return id !== contractId;
          })
        );
        ShowHideToast("Contract deleted successfully!","success");
        return true;
      } else {
        ShowHideToast("Failed to delete contract. Please try again.","error");
        return false;
      }
    } catch (error) {
            
      ShowHideToast("Failed to delete contract. Please try again.","error");
      return false;
    }
  };

  // Initialize data when component mounts
  useEffect(() => {
    if (token) {
      fetchNotifications();
      fetchSponsorRequests();
      fetchUserProfile();
    }
  }, [token]);

  const value = {
    // State
    notifications,
    notificationsLoading,
    markAllReadLoading,
    sponsorRequests,
    sponsorRequestsLoading,
    processingRequest,
    userLoans,
    userLoansLoading,
    selectedLoan,
    selectedLoanData,
    selectedLoanLoading,
    sponsors,
    sponsorsLoading,
    pendingContracts,
    pendingContractsLoading,
    userProfileData,
    profileLoading,
    isEditingProfile,
    editFormData,
    profileImage,
    profileImagePreview,
    showQRModal,
    selectedPayment,
    paymentProcessing,
    dashboardData,

    // Setters
    setNotifications,
    setSponsorRequests,
    setUserLoans,
    setSelectedLoan,
    setSelectedLoanData,
    setSponsors,
    setPendingContracts,
    setUserProfileData,
    setIsEditingProfile,
    setEditFormData,
    setProfileImage,
    setProfileImagePreview,
    setShowQRModal,
    setSelectedPayment,

    // Functions
    fetchNotifications,
    fetchSponsorRequests,
    fetchUserLoans,
    fetchLoanDetails,
    fetchSponsors,
    fetchPendingContracts,
    fetchUserProfile,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    handleSponsorRequestAction,
    processPayment,
    deleteContract,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
