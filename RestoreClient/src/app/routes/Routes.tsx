import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import CartPage from "../../features/cart/CartPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RequireAuth from "./RequireAuth";
import CheckoutSuccess from "../../features/checkout/CheckoutSuccess";
import OrdersPage from "../../features/orders/OrdersPage";
import OrderDetailsPage from "../../features/orders/OrderDetailsPage";
import InventoryPage from "../../features/admin/InventoryPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // errorElement: <ErrorPage />,
        children: [
          {element: <RequireAuth/>, children:[
            {
              path: "checkout",
              element: <CheckoutPage />,
            },
            {
              path: "checkout/success",
              element: <CheckoutSuccess/>
            },
            {
              path: "orders",
              element: <OrdersPage/>
            },
            {
              path: "orders/:id",
              element: <OrderDetailsPage/>
            },
            {
              path: "inventory",
              element: <InventoryPage/>
            }
          ]},
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "catalog",
            element: <Catalog />
          },
          {
            path: "catalog/:id",
            element: <ProductDetails />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
          {
            path: "contact",
            element: <ContactPage />,
          },
          {
            path: "cart",
            element: <CartPage />,
          },
          {
            path: "login",
            element: <LoginForm />,
          },
          {
            path: "register",
            element: <RegisterForm />,
          },
          {
            path: "server-error",
            element: <ServerError />,
          },
          {
            path: "not-found",
            element: <NotFound />,
          },
          {
            path: "*",
            element: <Navigate replace to="/not-found" />,
          },
        ],
    }
])