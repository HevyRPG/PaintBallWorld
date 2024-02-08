import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ContactPage from "./pages/Contact.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<HomePage />}></Route>
      <Route path="calendar" element={<CalendarPage />}></Route>
      <Route path="about" element={<AboutPage />}></Route>
      <Route path="register" element={<RegisterPage />}></Route>
      <Route path="login" element={<LoginPage />}></Route>
      <Route path="contact" element={<ContactPage />}></Route>
      <Route path="dashboard" element={<DashboardPage />}></Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
