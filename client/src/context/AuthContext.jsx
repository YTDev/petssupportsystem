import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  // Configure axios with the base URL
  axios.defaults.baseURL = API_URL;

  // Set up authentication header when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Set Authorization header:", `Bearer ${token}`);
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Check if there's a stored token on initial load
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          console.log("Verifying token:", token);

          try {
            const response = await axios.get("/users/me");
            console.log("User data from /me endpoint:", response.data);
            setUser(response.data);
          } catch (meError) {
            console.log(
              "Couldn't use /me endpoint, trying email lookup:",
              meError.message
            );

            const email = localStorage.getItem("userEmail");
            if (email) {
              const response = await axios.get(`/users/email/${email}`);
              console.log("User data from email lookup:", response.data);

              // Save full user data
              if (response.data) {
                setUser(response.data);
              } else {
                throw new Error("User data not found");
              }
            } else {
              throw new Error("No user email found in storage");
            }
          }
        } catch (error) {
          console.error("Token verification failed:", error);

          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          setToken(null);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      console.log("Attempting login with:", email);

      const response = await axios.post("/users/login", { email, password });
      console.log("Login response:", response.data);

      const { token: authToken, user: userData } = response.data;

      // Ensure we have user ID
      if (!userData || !userData.id) {
        console.warn("Login response missing user ID:", userData);
        // Try to extract user ID from token if possible
        userData.id = extractUserIdFromToken(authToken);
      }

      // Store auth data
      localStorage.setItem("token", authToken);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userId", userData.id);

      setToken(authToken);
      setUser(userData);

      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  // Helper function to extract user ID from JWT token
  const extractUserIdFromToken = (token) => {
    try {
      // JWT tokens have three parts separated by periods
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.id;
    } catch (e) {
      console.error("Error extracting user ID from token:", e);
      return null;
    }
  };

  const register = async (userData, role) => {
    try {
      // Select the appropriate endpoint based on role
      const endpoint =
        role === "shelter" ? "/shelters/register" : "/users/register";

      const response = await axios.post(endpoint, userData);
      console.log("Registration response:", response.data);

      const { token: authToken, user: userData2 } = response.data;

      // Ensure we have user ID
      if (!userData2 || !userData2.id) {
        console.warn("Registration response missing user ID:", userData2);
        // Try to extract user ID from token if possible
        userData2.id = extractUserIdFromToken(authToken);
      }

      // Store auth data
      localStorage.setItem("token", authToken);
      localStorage.setItem("userEmail", userData.email);
      localStorage.setItem("userId", userData2.id);

      setToken(authToken);
      setUser(userData2);

      return userData2;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  const logout = () => {
    // Clear stored data
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");

    // Reset state
    setToken(null);
    setUser(null);

    // Remove auth header
    delete axios.defaults.headers.common["Authorization"];

    console.log("User logged out");
  };

  const updateProfile = async (updates) => {
    try {
      if (!user) {
        throw new Error("No user is logged in");
      }

      // Ensure we have the user ID
      const userId = user.id || localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found");
      }

      // Determine the correct endpoint based on user role
      const endpoint =
        user.shelterName || user.role === "shelter"
          ? `/shelters/${userId}`
          : `/users/${userId}`;

      console.log(
        "Updating profile at endpoint:",
        endpoint,
        "with data:",
        updates
      );

      const response = await axios.put(endpoint, updates);
      console.log("Profile update response:", response.data);

      // Update the user in state
      setUser({ ...user, ...response.data });
      return response.data;
    } catch (error) {
      console.error("Profile update error:", error);
      throw new Error(
        error.response?.data?.message ||
          "Profile update failed. Please try again."
      );
    }
  };

  // Get the current user ID
  const getUserId = () => {
    return user?.id || localStorage.getItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        getUserId,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
