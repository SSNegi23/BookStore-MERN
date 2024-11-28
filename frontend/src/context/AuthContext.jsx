import { createContext, useContext, useEffect, useState } from "react";
import { clearUserData, getUserData, saveUserData } from "../utils/authStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = (data) => {
    saveUserData(data);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearUserData();
    setIsAuthenticated(false);
  };

  // Check if user is authenticated from localStorage when app loads
  useEffect(() => {
    setIsLoading(true);
    const userData = getUserData();
    if (userData) {
      setIsAuthenticated(true); // If user data exists in localStorage, mark as authenticated
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
