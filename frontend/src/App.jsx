import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Spinner from "./components/Spinner";
import routes from "./routes/routes";

// Dynamic imports
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const CreateBooks = React.lazy(() => import("./pages/CreateBooks"));
const ShowBook = React.lazy(() => import("./pages/ShowBook"));
const EditBook = React.lazy(() => import("./pages/EditBook"));
const DeleteBook = React.lazy(() => import("./pages/DeleteBook"));

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Suspense fallback={<Spinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.signup} element={<Signup />} />
              <Route path={routes.home} element={<Home />} />

              {/* Protected Routes */}
              <Route
                path={routes.createBook}
                element={
                  <ProtectedRoute>
                    <CreateBooks />
                  </ProtectedRoute>
                }
              />
              <Route
                path={routes.showBook}
                element={
                  <ProtectedRoute>
                    <ShowBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path={routes.editBook}
                element={
                  <ProtectedRoute>
                    <EditBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path={routes.deleteBook}
                element={
                  <ProtectedRoute>
                    <DeleteBook />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
