import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [token]);

  const login = async (data) => {
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(data);
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      setLoading(false);
      return false;
    }
  };

  const register = async (data) => {
    setLoading(true);
    setError("");
    try {
      await registerUser(data);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || "Register failed");
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 