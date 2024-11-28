import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // New state to handle authentication check
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsCheckingAuth(false); // Once the auth state is determined, stop checking
  }, [isAuthenticated]);

  if (isCheckingAuth) {
    return <div>Loading...</div>; // Optional: show loading state while checking authentication
  }

  if (!isAuthenticated) {
    setIsModalOpen(true);
    return (
      <>
        {/* {isModalOpen && (
          <LoginModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )} */}
        <Navigate to="/login" state={{ from: location }} replace />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
