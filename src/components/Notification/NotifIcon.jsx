import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { List, Paper } from '@mui/material';
import { useEffect } from 'react';

import { Container } from '@mui/system';

export default function NotifIcon() {
    const [report, setReport] = useState([])
    const [request, setRequest] = useState([])
    const [statuss, setStatuss] = useState('')
    
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const getData = async () => {
      try {
          const res = await axios.get("https://barangay-talon-uno.vercel.app/log")
  
          console.log("data: ", res.data.reqlog.filter( (i) => i.email === localStorage.getItem("email") ) );
          console.log("data: ", res.data.replog);
          setRequest( res.data.reqlog.filter( (i) => i.email === localStorage.getItem("email") )  );
          setReport(res.data.replog)
      } catch (error) {
          console.log(error);
      }
  }
  
//   useEffect(() => {
  
//     getData();
  
//       if( localStorage.getItem("T") !== null ) {
//         dispatch(login(true))
//           console.log("fetched")
//       } else {
//           console.log("loggedout");
//       }
  
  
//   }, []);
  // const handleFilter = async (status) => {
   
  //  return await axios
  //  .get(`https://barangay-talon-uno.vercel.app/log?process=${status}`)
  //  .then((response) => {
  
  //   setReport(response.data.replog.filter( (i) => i.email === localStorage.getItem("email") ))
  //   setStatus(response.data);
  
  //  })
  //  .catch((err) => console.log(err));
  // }
    //  useEffect(() => {
    //      if (localStorage.getItem("T") !== null) {
    //          // let token = localStorage.getItem("T");
    //          dispatch(login(true))
    //          // validateToken(token) = value true or false
    //          //    setisloggedin(validateToken(token));
  
    //          //let email = localStorage.getItem("email");
    //          //validateToken({ token, email, navigate });
    //          // setisloggedin(validateToken({ token, email, navigate }));
    //           //setisloggedin(true);
    //      }else {
    //          dispatch(login(false))
    //          //setisloggedin(false)
    //      }
    //  }, [navigate]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
     
  
      { report.map( (user,index) => (
        
        <>
      
         
          {/* filter by timestamp === newest*/}
      
        {
            user.reports.map((rep, index) => (
       
        <MenuItem key={index} sx={{width:400,mr:3}} alignItems="flex-start">
         <Timeline >
      <TimelineItem >
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <Paper component="card" sx={{width:260, mr:6}}>
        <List style={{maxHeight: '100%', overflow: 'auto'}}>
        <TimelineContent><b><Typography textTransform="capitalize"  > {rep.name} </Typography> Added a new activity</b></TimelineContent>
        <TimelineContent>Type of Activity: {rep.report}</TimelineContent>
        <TimelineContent>Status: {rep.process}</TimelineContent>
        </List>
        </Paper>
       
      </TimelineItem>
    </Timeline>
        </MenuItem>
       
         ))
    }
      
      </>
     
        ))
    }
   
    </React.Fragment>
  );
}