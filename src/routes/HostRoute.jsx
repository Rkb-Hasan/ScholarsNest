import LoadingSpinner from "../components/Shared/LoadingSpinner";
import PropTypes from "prop-types";

import useRoleBadge from "../hooks/useRoleBadge";
import { Navigate } from "react-router-dom";

const HostRoute = ({ children }) => {
  const [dbUser, isLoading] = useRoleBadge();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (dbUser.role === "host") return children;
  return <Navigate to="/dashboard"></Navigate>;
};

export default HostRoute;
HostRoute.propTypes = {
  children: PropTypes.element,
};
