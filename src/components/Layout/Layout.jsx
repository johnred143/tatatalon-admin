import React from "react";
import { useLocation } from "react-router-dom";
import Login from "../../pages/login";
import Router from "../../routes/Router";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";

const Layout = () => {
  const location = useLocation();
  console.log(location.pathname)
  
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
