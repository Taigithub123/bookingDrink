import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const HomeLayout = lazy(() => import("../layouts/HomeLayout.js"));
const LoginLayout = lazy(() => import("../layouts/LoginLayout.js"));
/***** Pages ****/

const Home = lazy(() => import("../views/home/Home.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const Product = lazy(() => import("../views/Product.js"));
const ProductAdd = lazy(() => import("../views/ProductAdd.js"));
const ProductDetail = lazy(() => import("../views/home/ProductDetail.js"));
const Category = lazy(() => import("../views/Category.js"));
const Login1 = lazy(() => import("../views/Login1.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <LoginLayout />,
    children: [{ path: "", element: <Login1 /> },
    { path: "product/:id", exact: true, element: <ProductDetail /> },
    ],
  },
  {
    path: "/Home",
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
