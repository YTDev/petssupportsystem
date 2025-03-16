import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Check for existing token on load
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          // Set default authorization header for all requests
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          
          // Verify token with backend (optional but recommended)
          const response = await axios.get("/api/users/me");
          setUser(response.data);
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          setToken(null);
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", { email, password });
      
      // Store token and set user
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    // Clear auth header
    delete axios.defaults.headers.common["Authorization"];
  };

  const register = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/register", values);
      
      // Store token and set user
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/users/${user.id}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        login, 
        register, 
        logout, 
        updateProfile, 
        isAuthenticated: !!user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};