import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
<<<<<<< HEAD
import Bookings from "../pages/Request";
import SellCar from "../pages/Report";
import Settings from "../pages/Settings";
import Login from "../pages/login";
=======

import Report from "../pages/Report";
import Request from "../pages/Request";
>>>>>>> 266d7c4b50bdd1fb849ea3941273cdb001cac3f8

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" element={<Login />} />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/sell-car" element={<SellCar />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/dashboard" element={<Dashboard />} />
=======
      <Route path="/report" element={<Report />} />
      <Route path="/request" element={<Request />} />
      
>>>>>>> 266d7c4b50bdd1fb849ea3941273cdb001cac3f8
    </Routes>
  );
};

export default Router;
