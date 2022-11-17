import React, { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import NotifIcon from "../Notification/NotifIcon";
// import navLinks from "../../assets/dummy-data/navLinks";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const usertype = localStorage.getItem("usertype")
  useEffect(() => {
    
    
    if(usertype === "admin"){
     
       let navLinks = [
      {
        path: "/notification",
        icon:"ri-apps-2-line",
        display:"notif"
      },
        {
          path: "/dashboard",
          icon: "ri-apps-2-line",
          display: "Dashboard",
        },
        {
          path: "/request",
          //icon: "ri-taxi-line",
          display: "Request",
        },
        {
          path: "/report",
          //icon: "ri-shopping-bag-line",
          display: "Report",
        },
      
      
      
      ];
      setLinks(navLinks)
    }
    if(usertype === "fire"){
     let navLinks = [
        {
          path: "/admin/firedept",
          display: "Fire Department",
        },
      
       {
         path: "/report",
         //icon: "ri-shopping-bag-line",
         display: "Report",
       },
      
     
     ];
     setLinks(navLinks)
    }
    if(usertype === "police"){
      let navLinks = [
        {
          path: "/admin/policedept",
          display:"Police Department",
        },
      
       {
         path: "/report",
         //icon: "ri-shopping-bag-line",
         display: "Report",
       },
      
     
     ];
     setLinks(navLinks)
    }
  },[usertype])
  return (
    <div className="sidebar">
      <div className="sidebar__top">
       
        <h2>
          <span>
            {/* <i class="ri-taxi-line"></i> */}
          </span>{" "}
         Talon Uno
        </h2>
          
      </div>
     
      <div className="sidebar__content">
        <div className="menu">
          <ul className="nav__list">
            {links.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__link" : "nav__link"
                  }
                >
                  <i className={item.icon}></i>

                  {item.display}
                </NavLink> 
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__bottom">
          <span onClick={() => {
              localStorage.setItem("login", false)
              navigate('/login')
              }
              }>
            <i class="ri-logout-circle-r-line" to="/login" 
              >
                </i> Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;