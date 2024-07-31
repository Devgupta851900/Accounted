/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.profile);

  if (token && user) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
