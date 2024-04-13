import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import UserSignInPage from './pages/UserSignInPage';
import UserRegistrationPage from './pages/UserRegistrationPage'
import AdminSignInPage from './pages/AdminSignInPage'
import AdminDashboardPage from './pages/AdminDashboardPage';
import "bootstrap-icons/font/bootstrap-icons.css";
import AddNewBookPage from './pages/AddNewBookPage';
import AddNewCategoryPage from './pages/AddNewCategoryPage';
import InventoryPage from './pages/InventoryPage';
import AddInventoryPage from './pages/AddInventoryPage'
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import FAQPage from './pages/FAQPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path: "/dashboard",
    element: <div>Hello Thirs!</div>,
  },
  {
    path: "/faq",
    element: <FAQPage />,
  },
  {
    path: "/categories",
    element: <CategoriesPage></CategoriesPage>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path: "/category/:categoryId",
    element: <CategoryPage></CategoryPage>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path: "/user",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <UserSignInPage />,
      },
      {
        path: "register",
        element: <UserRegistrationPage />,
      },
    ],
  },
  {
    path: "/admin",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <AdminSignInPage />,
      },
      {
        path: "dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "add_book",
        element: <AddNewBookPage />,
      },
      {
        path: "add_category",
        element: <AddNewCategoryPage />,
      },
      {
        path: "add_inventory",
        element: <AddInventoryPage />,
      },
      {
        path: "inventory",
        element: <InventoryPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer></ToastContainer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
