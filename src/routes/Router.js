import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Request";
import SellCar from "../pages/Report";
import Settings from "../pages/Settings";
import Login from "../pages/login";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" element={<Login />} />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/sell-car" element={<SellCar />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Router;
