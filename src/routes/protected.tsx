import { Navigate, Outlet, useParams } from "react-router-dom";
import { isAuthenticated } from "../utils/isAuthenticated";
import NotFound from "../pages/NotFound";

export const ProtectedRoutesProduct = (): JSX.Element => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};
export const ProtectedRoutesLogin = (): JSX.Element => {
  if (isAuthenticated()) {
    return <Navigate to="/product" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export const ProtectedRoutesProductID = (): JSX.Element => {
  const { id } = useParams();
  if (isNaN(Number(id)) || Number(id) <= 0) {
    return <NotFound />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
