import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const HomeLayout = lazy(() => import("../layouts/HomeLayout.js"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout.js"));
/***** Pages ****/

const Home = lazy(() => import("../views/home/Home.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const Product = lazy(() => import("../views/Product.js"));
const ProductAdd = lazy(() => import("../views/ProductAdd.js"));
const ProductDetail = lazy(() => import("../views/home/ProductDetail.js"));
const Category = lazy(() => import("../views/Category.js"));
const Login = lazy(() => import("../views/Login"));
const Register = lazy(() => import("../views/Register"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [{ path: "", element: <Home /> },
    { path: "product/:id", exact: true, element: <ProductDetail /> },
    ],
  },
  {
    path: "/admin",
    element: <FullLayout />,
    children: [
      { path: "", element: <Navigate to="starter" /> },
      { path: "starter", exact: true, element: <Starter /> },
      { path: "product", exact: true, element: <Product /> },
      { path: "product/add", exact: true, element: <ProductAdd /> },
      { path: "category", exact: true, element: <Category /> },
    ],
  },
];

export default ThemeRoutes;
