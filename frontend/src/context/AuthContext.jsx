import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    // Check if user is authenticated from localStorage when app loads
    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            setIsAuthenticated(true); // If user data exists in localStorage, mark as authenticated
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);