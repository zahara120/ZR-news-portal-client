import { createBrowserRouter, redirect } from "react-router-dom";
import { MainLayout } from "./layouts/main";
import { CMSLayout } from "./layouts/admin";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { NewsDetail } from "./pages/NewsDetail";
import AdminListNews from "./pages/admin/AdminListNews";
import AdminListCategory from "./pages/admin/AdminListCategory";
import AdminAddUser from "./pages/admin/AdminAddUser";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <NewsDetail />,
      },
    ],
  },
  // admin
  {
    element: <CMSLayout />,
    path: "/cms",
    loader: () => {
      const isLogin = localStorage.getItem("token");
      return !isLogin ? redirect("/login") : null;
    },
    children: [
      {
        path: "news",
        element: <AdminListNews />,
      },
      {
        path: "categories",
        element: <AdminListCategory />,
      },
      {
        path: "addUser",
        element: <AdminAddUser />,
      },
    ],
  },
  {
    path: "/login",
    loader: () => {
      const isLogin = localStorage.getItem("token");
      return isLogin ? redirect("/cms/news") : null;
    },
    element: <Login />,
  },
]);
