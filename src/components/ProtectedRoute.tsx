import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import AdminLogin from "@/components/AdminLogin";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setIsLoggingOut(false);
      } else {
        if (isAuthenticated === true) {
          // User was logged in and now logged out
          setIsLoggingOut(true);
          navigate("/", { replace: true });
          return;
        }
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [navigate, isAuthenticated]);

  // Show nothing while logging out to prevent flash
  if (isLoggingOut) {
    return null;
  }

  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin onClose={() => {}} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;