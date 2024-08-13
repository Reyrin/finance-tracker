import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components";

export const PrivateLayout: FC = () => {
  const location = useLocation();
  const auth = useAuth();

  return (
    <div className="font-roboto min-h-screen bg-primaryColor pb-20 text-white ">
      <Header />

      <div className="container">
        {auth.user ? (
          <Outlet />
        ) : (
          <Navigate to="/login" state={{ from: location }} />
        )}
      </div>
    </div>
  );
};
