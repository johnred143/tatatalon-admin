import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../../pages/login";
import Router from "../../routes/Router";
import showNotification from "../Notification/Notif";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";

const Layout = () => {
  const location = useLocation();
  const navigate =useNavigate();
  console.log(location.pathname)
  useEffect(() => {
    if (localStorage.getItem("login")){
      navigate("/dashboard")
      // showNotification()
      
    }else{
      navigate("/login")
    }
  },[])
  return (
   
    <div className="layout">
     { location.pathname === "/login" &&
      <Login/>
     }
    
      { location.pathname !== "/login" && <div>
        
       <Sidebar />
      <div className="main__layout">
        <TopNav />
    
       
        <Router />
      </div>
      </div>}
    </div>
   
  );
};

export default Layout;
