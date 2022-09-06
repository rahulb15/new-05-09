import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({component: Component, ...rest }) {

  return localStorage.getItem("jwt") ? <Component/> : <Navigate to="/" />;
}
