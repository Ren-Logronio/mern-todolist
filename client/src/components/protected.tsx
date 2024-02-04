import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/stores";
import { useEffect } from "react";
import axios from "axios";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, token, signout: logout, timeout } = useAuthStore();
  const navigate = useNavigate();
  useEffect(()=> {
    console.log("trigger verify");
    if (user && token) {
      axios.post('/api/auth/verify/', {}, { headers: { authorization: `local ${token}` } }).then((res) => {
        if(res.data) {
          return;
        } else {
          timeout();
          navigate('/signin');
        }
      }).catch((err: Error) => {
        timeout();
        navigate('/signin');
      })
    }
  },);
  if (!user && !token) {
    return <Navigate to="/signin"/>;
  };
  return children;
};