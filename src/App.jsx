import React from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CalendarPage from './pages/CalendarPage'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path: "/about",
    element: <AboutPage/>,
  },
  {
    path: "/calendar",
    element: <CalendarPage/>,
  },
  {
    path: "/",
    element: <HomePage/>,
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App