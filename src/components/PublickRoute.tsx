import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../app/routes";
import { useSelector } from "react-redux";
import { selectToken } from "../features/Auth/authSlice";

const PublicRoute = () => {
  const token = useSelector(selectToken);

  return <>{token ? <Navigate to={routes.contacts} /> : <Outlet />}</>;
};

export default PublicRoute;
