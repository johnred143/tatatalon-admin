import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Request";
import SellCar from "../pages/Report";
import Settings from "../pages/Settings";
import Report from "../pages/Report";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" element={<Dashboard />} />}
      />
      <Route path="/dashboard"d element={<Dashboard />} />
      <Route path="/report" element={<Report />} />
      <Route path="/request" element={<Request />} />
     
    </Routes>
  );
};

export default Router;
