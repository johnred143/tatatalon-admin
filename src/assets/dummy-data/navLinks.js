const usertype = localStorage.getItem("usertype")
let navLinks = [];
if(usertype === "admin"){
   navLinks = [
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
}
if(usertype === "fire"){
  navLinks = [
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
}
if(usertype === "police"){
  navLinks = [
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
}
// const navLinks = [
//   {
//     path: "/dashboard",
//     icon: "ri-apps-2-line",
//     display: "Dashboard",
//   },
//   {
//     path: "/request",
//     //icon: "ri-taxi-line",
//     display: "Request",
//   },
//   {
//     path: "/report",
//     //icon: "ri-shopping-bag-line",
//     display: "Report",
//   },
//   {
//     path: "/admin/firedept",
//     display: "Fire Department",
//   },
//   {
//     path: "/admin/policedept",
//     display:"Police Department",
//   }

// ];

export default navLinks;
