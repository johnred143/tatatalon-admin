import React from "react";
import "../styles/dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";


import RecommendCarCard from "../components/UI/RecommendCarCard";

import recommendCarsData from "../assets/dummy-data/recommendCars";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import NotifIcon from "../components/Notification/NotifIcon";
import { Container } from "@mui/system";



const Dashboard = () => {
  const[totalreq,settotalreq] =useState(0)
  const [report, setReport] = useState([])
  const[totalblotter,setTotalblotter] =useState(0)
  const[totalrep,settotalrep] =useState(0)
  const[totaluser,settotaluser] =useState(0)
  const[totalpending,settotalpending] =useState(0)
  useEffect(()=>{
  try {
    async function fetchData(){
    const con=  await  axios.get("https://barangay-talon-uno.vercel.app/log")
settotalreq(con.data.sumreq)
settotalrep(con.data.sumrep)
settotalpending(con.data.total)
settotaluser(con.data.user)
setReport(con.data.replog)
setTotalblotter(con.data.sumblot)
    console.log(con.data)
    }
    fetchData();
    } catch (error) {
console.log(error)
      
    }
  },[])
  
  console.log(totaluser);
  const carObj = {
    title: "Total Request",
    totalNumber: totalreq,
    //icon: "ri-police-car-line",
  };
  
  const tripObj = {
    title: "Total Reports",
    totalNumber: totalrep,
   //icon: "ri-steering-2-line",
  };
  
  const clientObj = {
    title: "Users",
    totalNumber: totaluser,
    //icon: "ri-user-line",
  };
  
  const distanceObj = {
    title: "Pending Request & Report",
    totalNumber: totalpending,
    //icon: "ri-timer-flash-line",
  };
  const blotObj = {
    title: "Pending Blotter",
    totalNumber: totalblotter,
    //icon: "ri-timer-flash-line",
  };


  return (
   
  
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
       
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
         
        </div>
        <br/>
        <div className="dashboard__cards">
        <SingleCard item={blotObj} />
        </div>
        {/* <div className="statics">
          <div className="stats">
            <h3 className="stats__title"></h3>
            <MileChart />
          </div>

          <div className="stats">
            <h3 className="stats__title"></h3>
            <CarStatsChart />
          </div>
        </div> */}

        <div className="recommend__cars-wrapper">
          {recommendCarsData.map((item) => (
            <RecommendCarCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>

    
  );
};

export default Dashboard;
