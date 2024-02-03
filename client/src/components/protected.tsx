import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/app/stores";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, token } = useAuthStore();
  if (!user && !token) {
    return <Navigate to="/login" />;
  }
  return children;
};