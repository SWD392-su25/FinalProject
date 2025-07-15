// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";

import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import HomePage from "./components/HomePage";
import EventDetail from "./components/event/EventDetail";
import RegisterEvent from "./components/event/RegisterEvent";
import RegisterSuccess from "./components/event/RegisterSuccess";
import RegistrationHistory from "./components/student/RegistrationHistory";
import EventCalendar from "./components/event/EventCalendar";
import EventManagement from "./components/admin/EventManagement";
import LecturerManagement from "./components/admin/LecturerManagement";
import StudentManagement from "./components/admin/StudentManagement";

import { Toolbar } from "@mui/material";

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user && user.role === "Admin";
};

const App = () => {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/forgot-password", "/register"];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <div
      className="app-wrapper"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {!shouldHideHeader && <Header />}
      {!shouldHideHeader && <Toolbar />}{" "}
      {/* đẩy nội dung xuống dưới AppBar fixed */}
      <div className="content-wrap" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail/:eventID" element={<EventDetail />} />
          <Route path="/register/:eventID" element={<RegisterEvent />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/history" element={<RegistrationHistory />} />
          <Route path="/event-calendar" element={<EventCalendar />} />

          {/* Các route chỉ dành cho Admin */}
          <Route
            path="/admin/events"
            element={
              isAdmin() ? <EventManagement /> : <Navigate to="/unauthorized" />
            }
          />
          <Route
            path="/admin/students"
            element={
              isAdmin() ? (
                <StudentManagement />
              ) : (
                <Navigate to="/unauthorized" />
              )
            }
          />
          <Route
            path="/admin/lecturers"
            element={
              isAdmin() ? (
                <LecturerManagement />
              ) : (
                <Navigate to="/unauthorized" />
              )
            }
          />
        </Routes>
      </div>
      {!shouldHideHeader && <Footer />}
    </div>
  );
};

export default App;
