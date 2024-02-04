import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore, useListStore, useTodoStore } from "@/app/stores";
import { useEffect } from "react";
import axios from "axios";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, token, signout: logout, timeout } = useAuthStore();
  const { reset: resetList } = useListStore();
  const { reset: resetAuth } = useTodoStore();
  const navigate = useNavigate();
  useEffect(() => {
    resetAuth();
    resetList();
  }, [user, token]);
  useEffect(()=> {
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
  }, []);
  if (!user && !token) {
    return <Navigate to="/signin"/>;
  };
  return children;
};