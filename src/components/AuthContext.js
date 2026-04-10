import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [pendingSignupData, setPendingSignupData] = useState(null);
  // Loan application form data
  const [formData, setFormData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [dashboardData, setDashboardData] = useState(() => {
    try {
      const cached = localStorage.getItem("dashboardData");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  // Send loan application form data to API
  const sendFormData = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contracts/apply",
        formData,
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to submit loan application"
      );
      setLoading(false);
      return null;
    }
  };

  // LOGIN with axios
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    // Mock login: lets you demo the dashboards without a running backend.
    // If credentials match, we set `user` locally and do NOT call the API.
    const MOCK_LOGINS = [
      {
        email: "user@smartfund.local",
        password: "UserPass123!",
        role: "user",
        firstName: "Taylor",
        lastName: "Johnson",
      },
      {
        email: "admin@smartfund.local",
        password: "AdminPass123!",
        role: "admin",
        firstName: "Admin",
        lastName: "SmartFund",
      },
    ];

    const normalizedEmail = (email || "").trim().toLowerCase();
    const normalizedPassword = password || "";
    const mock = MOCK_LOGINS.find(
      (a) =>
        a.email.toLowerCase() === normalizedEmail &&
        a.password === normalizedPassword
    );

    if (mock) {
      // Clear any leftover auth header from previous sessions.
      delete axios.defaults.headers.common["Authorization"];

      const mockDashboardData = {
        totalAmount: 75000,
        paidAmount: 30000,
        remainingAmount: 45000,
        payments: [
          {
            _id: "mock_pay_001",
            dueDate: "2026-02-15T00:00:00.000Z",
            amount: 5500,
            status: "paid",
          },
          {
            _id: "mock_pay_002",
            dueDate: "2026-03-15T00:00:00.000Z",
            amount: 5500,
            status: "pending",
          },
          {
            _id: "mock_pay_003",
            dueDate: "2026-04-15T00:00:00.000Z",
            amount: 5500,
            status: "late",
          },
        ],
      };

      const mockUserDetails =
        mock.role === "admin"
          ? {
              phoneNumber: "+1-212-555-0199",
              DateOfBirth: "1988-09-02T00:00:00.000Z",
              gender: "male",
              creditID: "CRD-00001-ADM",
              income: 150000,
              address: "1 Admin Plaza, New York, NY",
              password: normalizedPassword,
            }
          : {
              phoneNumber: "+1-415-555-0147",
              DateOfBirth: "1994-07-09T00:00:00.000Z",
              gender: "female",
              creditID: "CRD-10492-MK",
              income: 72000,
              address: "55 Ocean View Ave, San Francisco, CA",
              password: normalizedPassword,
            };

      const normalizedUser = {
        _id: `mock_${mock.role}_001`,
        email: mock.email,
        role: mock.role.toLowerCase(),
        firstName: mock.firstName,
        lastName: mock.lastName,
        userFirstName: mock.firstName,
        userLastName: mock.lastName,
        fullName: `${mock.firstName} ${mock.lastName}`.trim(),
        profilePhoto: null,
        ...mockUserDetails,
        // Used by some UI to decide if apply/loan actions should be available
        loanStatus: {
          hasActiveLoan: false,
          hasActiveLoanAsBorrower: false,
          hasActiveLoanAsSponsor: false,
          borrowerActiveLoanCount: 0,
          sponsorActiveLoanCount: 0,
        },
      };

      setUser(normalizedUser);
      try {
        localStorage.setItem("userRole", normalizedUser.role);
        // Persist mock dashboard data for user dashboard components.
        if (normalizedUser.role !== "admin") {
          localStorage.setItem(
            "dashboardData",
            JSON.stringify(mockDashboardData)
          );
        }
      } catch {}
      // Intentionally do not set `token` for mock mode (other contexts use `!token` to decide to seed mock data).
      if (normalizedUser.role !== "admin") {
        setDashboardData(mockDashboardData);
      } else {
        setDashboardData(null);
      }
      setLoading(false);
      return true;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      if (response.data.user) {
        // Normalize user data structure for consistency
        const userData = response.data.user;

        const normalizedUser = {
          ...userData,
          // Ensure we have both firstName/lastName and userFirstName/userLastName for compatibility
          firstName: userData.firstName || userData.userFirstName || "",
          lastName: userData.lastName || userData.userLastName || "",
          userFirstName: userData.userFirstName || userData.firstName || "",
          userLastName: userData.userLastName || userData.lastName || "",
          // Normalize role to lowercase for consistent routing checks
          role: (userData.role || "user").toLowerCase(),
          // Create a fullName property for easier access
          fullName:
            userData.fullName ||
            `${userData.firstName || userData.userFirstName || ""} ${
              userData.lastName || userData.userLastName || ""
            }`.trim() ||
            "User",
          // Handle profilePhoto field for admin users - construct full URL if it's a relative path
          profilePhoto: userData.profilePhoto
            ? userData.profilePhoto.startsWith("http")
              ? userData.profilePhoto
              : `http://localhost:3000${userData.profilePhoto}`
            : null,
          // Store loanStatus for controlling Apply Form button state
          loanStatus: userData.loanStatus || {
            hasActiveLoan: false,
            hasActiveLoanAsBorrower: false,
            hasActiveLoanAsSponsor: false,
            borrowerActiveLoanCount: 0,
            sponsorActiveLoanCount: 0,
          },
        };

        setUser(normalizedUser);
        try {
          localStorage.setItem("userRole", normalizedUser.role || "user");
        } catch {}
      }

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        console.log(response.data.token);
      }

      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
      setLoading(false);
      return false;
    }
  };

  // Validate token on app startup
  useEffect(() => {
    const validateToken = async () => {
      setLoading(true);
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          // Set the token first
          setToken(storedToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;

          // Try to get user profile to validate token
          const response = await axios.get(
            "http://localhost:3000/api/users/profile",
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );

          if (response.data.success && response.data.user) {
            // Ensure we have all the necessary user data
            const userData = response.data.user;
            const storedRole = (() => {
              try {
                return localStorage.getItem("userRole");
              } catch {
                return null;
              }
            })();

            // Create a consistent user object structure
            const normalizedUser = {
              ...userData,
              // Ensure we have both firstName/lastName and userFirstName/userLastName for compatibility
              firstName: userData.firstName || userData.userFirstName || "",
              lastName: userData.lastName || userData.userLastName || "",
              userFirstName: userData.userFirstName || userData.firstName || "",
              userLastName: userData.userLastName || userData.lastName || "",
              // Normalize role; prefer stored role on refresh to avoid backend mismatch
              role: (storedRole || userData.role || "user").toLowerCase(),
              // Create a fullName property for easier access
              fullName:
                userData.fullName ||
                `${userData.firstName || userData.userFirstName || ""} ${
                  userData.lastName || userData.userLastName || ""
                }`.trim() ||
                "User",
              // Handle profilePhoto field for admin users - construct full URL if it's a relative path
              profilePhoto: userData.profilePhoto
                ? userData.profilePhoto.startsWith("http")
                  ? userData.profilePhoto
                  : `http://localhost:3000${userData.profilePhoto}`
                : null,
              // Store loanStatus for controlling Apply Form button state
              loanStatus: userData.loanStatus || {
                hasActiveLoan: false,
                hasActiveLoanAsBorrower: false,
                hasActiveLoanAsSponsor: false,
                borrowerActiveLoanCount: 0,
                sponsorActiveLoanCount: 0,
              },
            };

            setUser(normalizedUser);
            try {
              localStorage.setItem("userRole", normalizedUser.role || "user");
            } catch {}
          } else {
            // Invalid token, clear it
            localStorage.removeItem("token");
            localStorage.removeItem("userRole");
            setToken(null);
            setUser(null);
            delete axios.defaults.headers.common["Authorization"];
          }
        } catch (error) {
          // Token is invalid, clear it
          console.error("Token validation failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          setToken(null);
          setUser(null);
          delete axios.defaults.headers.common["Authorization"];
        }
      }
      setLoading(false);
    };

    validateToken();
  }, []);

  // getting user contract data - load as soon as token exists; cache to localStorage
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/api/loans/active", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setDashboardData(response.data);
          try {
            localStorage.setItem(
              "dashboardData",
              JSON.stringify(response.data)
            );
          } catch {}
        })
        .catch((error) => {
          console.error("Error fetching loan data:", error);
        });
    }
  }, [token]);

  // Send verification code (signup)
  const sendVerificationCode = async (signupData) => {
    setLoading(true);
    setError(null);
    try {
      // This is where you POST to your backend
      await axios.post("http://localhost:3000/api/users/register", signupData);
      setPendingSignupData(signupData);
      setVerificationCodeSent(true);
      setLoading(false);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to send verification code"
      );
      setLoading(false);
      return false;
    }
  };

  // Verify code and complete signup
  const verifyCode = async (verificationCode) => {
    setLoading(true);
    setError(null);
    try {
      // POST the email and code to your backend for verification
      // Example endpoint: '/api/verify-code'
      const response = await axios.post(
        "http://localhost:3000/api/users/verify",
        {
          email: pendingSignupData.email,
          code: verificationCode,
          userData: pendingSignupData,
        }
      );
      setUser(response.data.user); // Adjust according to your backend response
      setVerificationCodeSent(false);
      setPendingSignupData(null);
      setLoading(false);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Invalid verification code"
      );
      setLoading(false);
      return false;
    }
  };

  // Placeholder signup function (keeping for backward compatibility)
  const signup = async (signupData) => {
    return await sendVerificationCode(signupData);
  };

  // Add this function for image upload
  const uploadImage = async (file, contractId, documentName) => {
    const formData = new FormData();
    formData.append("documentFile", file);
    formData.append("documentName", documentName);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/upload/${contractId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.document; // Returns the uploaded document object
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to upload image"
      );
      return null;
    }
  };

  // Update user profile
  const updateUserProfile = async (
    updateData,
    selectedFile = null,
    baselineUser = null
  ) => {
    setLoading(true);
    setError(null);

    try {
      let response;

      if (selectedFile) {
        // If there's a file, send as form-data
        const formData = new FormData();

        // Add the file
        formData.append("profilePhoto", selectedFile);

        // Add other form fields that have changed
        Object.keys(updateData).forEach((key) => {
          const baseline = baselineUser || user || {};
          const originalValue =
            key === "firstName"
              ? baseline.firstName ?? baseline.userFirstName ?? ""
              : key === "lastName"
              ? baseline.lastName ?? baseline.userLastName ?? ""
              : baseline[key];
          const newValue = updateData[key];

          // Only include if the value has changed and is not empty
          if (
            newValue !== originalValue &&
            newValue !== "" &&
            newValue !== null &&
            newValue !== undefined
          ) {
            const mappedKey =
              key === "firstName"
                ? "userFirstName"
                : key === "lastName"
                ? "userLastName"
                : key;
            formData.append(mappedKey, newValue);
          }
        });

        response = await axios.put(
          "http://localhost:3000/api/users/update",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // If no file, send as JSON
        const filteredData = {};

        // Only include fields that have changed
        Object.keys(updateData).forEach((key) => {
          const baseline = baselineUser || user || {};
          const originalValue =
            key === "firstName"
              ? baseline.firstName ?? baseline.userFirstName ?? ""
              : key === "lastName"
              ? baseline.lastName ?? baseline.userLastName ?? ""
              : baseline[key];
          const newValue = updateData[key];

          // Only include if the value has changed and is not empty
          if (
            newValue !== originalValue &&
            newValue !== "" &&
            newValue !== null &&
            newValue !== undefined
          ) {
            const mappedKey =
              key === "firstName"
                ? "userFirstName"
                : key === "lastName"
                ? "userLastName"
                : key;
            filteredData[mappedKey] = newValue;
          }
        });

        response = await axios.put(
          "http://localhost:3000/api/users/update",
          filteredData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.data.success) {
        // Update the user state with the new data, maintaining normalized structure
        const updatedUserData = response.data.user;
        const normalizedUser = {
          ...updatedUserData,
          // Ensure we have both firstName/lastName and userFirstName/userLastName for compatibility
          firstName:
            updatedUserData.firstName || updatedUserData.userFirstName || "",
          lastName:
            updatedUserData.lastName || updatedUserData.userLastName || "",
          userFirstName:
            updatedUserData.userFirstName || updatedUserData.firstName || "",
          userLastName:
            updatedUserData.userLastName || updatedUserData.lastName || "",
          // Create a fullName property for easier access
          fullName:
            updatedUserData.fullName ||
            `${
              updatedUserData.firstName || updatedUserData.userFirstName || ""
            } ${
              updatedUserData.lastName || updatedUserData.userLastName || ""
            }`.trim() ||
            "User",
        };

        setUser(normalizedUser);
        setLoading(false);
        return { success: true, user: normalizedUser };
      } else {
        setError("Failed to update profile");
        setLoading(false);
        return { success: false, error: "Failed to update profile" };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Error updating profile";
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setDashboardData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("chatbot_messages"); // Clear chatbot chat history
    delete axios.defaults.headers.common["Authorization"];
    setVerificationCodeSent(false);
    setPendingSignupData(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        dashboardData,
        login,
        signup,
        logout,
        verificationCodeSent,
        sendVerificationCode,
        verifyCode,
        formData,
        setFormData,
        sendFormData,
        uploadImage,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
