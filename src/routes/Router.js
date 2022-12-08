import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Request";
import SellCar from "../pages/Report";
// import Settings from "../pages/Settings";
import Login from "../pages/login";
import Request from "../pages/Request";
import Report from "../pages/Report";
import FireDept from "../pages/FireDep";
import PoliceDept from "../pages/policedep";
import NotifIcon from "../components/Notification/NotifIcon";
import Blotter from "../pages/Blotter";
import BLotterCheckout from "../pages/Blotter/BlotterCheckout";
import Signup from "../pages/signup";
import UserActivity from "../pages/UserActivity";
// import Blotter from "../pages/Blotter";
const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" element={<Login />} />}
      />
       <Route path="/useractivity" element={<UserActivity />} />
      <Route path="/addusers" element={<Signup />} />
      <Route path="/makeblotter" element={<BLotterCheckout />} />
      <Route path="/blotter" element={<Blotter />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report" element={<Report />} />
      <Route path="/request" element={<Request />} />
      {/* <Route path="/settings" element={<Settings />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin/firedept" element={<FireDept />} />
      <Route path="/admin/policedept" element={<PoliceDept />} />
      <Route path="/notifications" element={<NotifIcon />} />
    </Routes>
  );
};

export default Router;
