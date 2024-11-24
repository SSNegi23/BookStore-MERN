import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(); // Set the user as authenticated
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Login</h1>
      <button onClick={handleLogin} className="p-2 bg-blue-500 text-white mt-4">
        Login
      </button>
    </div>
  );
};

export default Login;
