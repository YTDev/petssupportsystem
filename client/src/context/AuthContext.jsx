import React, { createContext, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      // Make a POST request to the backend login endpoint
      const response = await axios.post("/login", {
        email,
        password,
      });

      // Check if the response is successful
      if (response.status === 200) {
        const User = response.data; // Assuming your backend returns user data
        setUser(User);
        return User; // Return the user data
      }
    } catch (error) {
      // Handle errors (e.g., invalid credentials)
      console.error("Error during login:", error); // Log the entire error for debugging

      // Check if error response exists and has a message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed: An unknown error occurred.";
      throw new Error(errorMessage); // Throw the error with a detailed message
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (values) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (values.email === "exists@test.com") {
          reject(new Error("Registration failed: Email already exists."));
        } else {
          const fakeUser = {
            email: values.email,
            fullName: values.fullName,
            role: values.role,
          };
          setUser(fakeUser);
          resolve(fakeUser);
        }
      }, 1500);
    });
  };

  const updateProfile = async (updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          reject(new Error("No user to update."));
        } else {
          const updatedUser = { ...user, ...updates };
          console.log("updated user: " + JSON.stringify(updatedUser));
          setUser(updatedUser);
          resolve(updatedUser);
        }
      }, 1500);
    });
  };
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
