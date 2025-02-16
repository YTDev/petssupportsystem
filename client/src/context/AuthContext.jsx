import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@test.com" && password !== "fail") {
          const fakeUser = { email, name: "John Doe", role: "adopter" };
          setUser(fakeUser);
          resolve(fakeUser);
        } else {
          reject(new Error("Login failed: Invalid credentials."));
        }
      }, 1500);
    });
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
            name: values.fullName,
            role: values.role,
          };
          setUser(fakeUser);
          resolve(fakeUser);
        }
      }, 1500);
    });
  };
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
