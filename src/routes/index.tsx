import { Navigate, useRoutes } from "react-router-dom";
import LogIn from "../pages/SignUp-Login/LogIn";
import SignUp from "../pages/SignUp-Login/SignUp";
import ProductList from "../pages/ProductList/ProductList";
import EditProduct from "../pages/EditProduct";
import AddNewProduct from "../pages/AddNewProduct";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";
import {
  ProtectedRoutesLogin,
  ProtectedRoutesProduct,
  ProtectedRoutesProductID,
} from "./protected";
import LoginSignupLayout from "../components/Layout/LoginSignupLayout";
import MainLayout from "../components/Layout/MainLayout";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/auth" />,
    },
    {
      path: "/auth",
      element: <ProtectedRoutesLogin />,
      children: [
        {
          path: "/auth",
          element: <LoginSignupLayout />,
          children: [
            {
              index: true,
              element: <Navigate to="/auth/login" />,
            },
            {
              path: "/auth/signup",
              element: <SignUp />,
            },
            {
              path: "/auth/login",
              element: <LogIn />,
            },
          ],
        },
      ],
    },
    {
      path: "/product",
      element: <ProtectedRoutesProduct />,
      children: [
        {
          path: "/product",
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <ProductList />,
            },
            {
              path: "/product/add",
              element: <AddNewProduct />,
            },
            {
              path: "/product/:id",
              element: <ProtectedRoutesProductID />,
              children: [
                {
                  index: true,
                  element: <ProductDetail />,
                },

                {
                  path: "/product/:id/edit",
                  element: <EditProduct />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <>{routes}</>;
};

export default AppRoutes;
