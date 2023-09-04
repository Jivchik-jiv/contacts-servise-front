import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../app/routes";
import { useSelector } from "react-redux";
import { selectToken } from "../features/Auth/authSlice";

const PrivateRoute = () => {
  const token = useSelector(selectToken);

  return <>{token ? <Outlet /> : <Navigate to={routes.signin} />}</>;
};

export default PrivateRoute;
