import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Authentication";

function ProtectedRoute({ children }) {
  let { isLoggin } = useContext(AuthContext);
  console.log(isLoggin);
  if (isLoggin) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
