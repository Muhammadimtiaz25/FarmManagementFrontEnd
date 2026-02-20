import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Agritecdashboard from "./pages/Agritecdashboard";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SupportChat from "./pages/SupportChat";
import AboutPage from "./pages/AboutPage";
import Reviews from "./pages/Reviews";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<Reviews />} />
   
        <Route
          path="/AdminDashboard"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
             </PrivateRoute>
          }
        />


        <Route
          path="/Agritecdashboard"
          element={
            <PrivateRoute allowedRoles={['farmer']}>
              <Agritecdashboard />
             </PrivateRoute>
          }
        />

        <Route
          path="/Dashboard"
          element={
             <PrivateRoute allowedRoles={['farmer']}>
              <Dashboard />
             </PrivateRoute>
          }
        />
        <Route path="/supportchat" element={<SupportChat />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
