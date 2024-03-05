import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client' // Correct import for React 18
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext' // Ensure this path is correct

import Layout from './Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ContactPage from './pages/Contact.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import TestPage from './pages/TestPage.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import EditProfile from './pages/EditProfile.jsx'

// Custom route component to protect routes
const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext) // Use useContext to access AuthContext

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="contact" element={<ContactPage />} />
            <Route path="test" element={<TestPage />} />
            <Route path="edit-profile" element={<EditProfile />} />
            {/* Catch-all route */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

// Correct way to use ReactDOM.createRoot for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
