import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {Typography, Paper} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Report() {
  const [expanded, setExpanded] = React.useState("");
  const [replog, setReplog] = useState([])
  const getData = async () => {
    try {
        const res = await axios.get("https://barangay-talon-uno.vercel.app/log")

        // console.log("data: ", res.data.replog.map( i => ({
        //   ...i,
        //   reports: i.reports.filter( a => a.report === "Crime Related" )
        // }) ) );

        switch (localStorage.getItem("usertype")) {
          case "police":
            setReplog(res.data.replog.map( i => ({
              ...i,
              reports: i.reports.filter( a => a.report === "Crime Related" )
            }) ) )
            break;
          case "fire":
            setReplog(res.data.replog.map( i => ({
              ...i,
              reports: i.reports.filter( a => a.report === "Fire" )
            }) ) )
            break;  
          default:
            setReplog(res.data.replog)
            break;
        }

    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
  getData();
},[])

const handleSubmit = async({id, email,process}) => {
    try{
      const res = await axios.post("https://barangay-talon-uno.vercel.app/admin/update", {
       ref: id,
         email: email,
         status: process
      })
        console.log(res.data)
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Status Changed',
          showConfirmButton: true,
          timer: 1500
        })
    }catch(error){
        console.log(error)
    }
  console.log(id,email,process)
}
  const handleExpandClick = (e) => {
    if ( e === expanded) {
      setExpanded("123123");
    } else {
      setExpanded(e);

    }
    console.log(e)
  };

  return (
    <Container sx={{mt:15}}>
      
      <Box>
        {
          replog.map(( users, index ) => ( 
              <React.Fragment key={index}>
                 <Typography variant="h6" color="white">
          Email: {users.email}
        </Typography> 
        {
          users.reports.map((rep, index ) => (
              <React.Fragment key={index}>
<Card sx={{ maxWidth: 345,mt:5 }} style={{backgroundColor: "#16213E "}}>
     <ExpandMore
         expand={expanded === rep._id ? true : false}
         onClick={ () => handleExpandClick(rep._id)}
         aria-expanded={expanded}
         aria-label="show more"
       >
         <ExpandMoreIcon />
       </ExpandMore>
     <Collapse in={expanded === rep._id ? true : false} timeout="auto" unmountOnExit>
     
     <CardContent>
       
       <Typography variant="body2" color="white">
         Name: {rep.name}
       </Typography>
     </CardContent>
    
     <CardContent>
       <Typography variant="body2" color="white">
         Address: {rep.addressdetail}
       </Typography>
     </CardContent>
     
     <CardContent>
       <Typography variant="body2" color="white">
         Report Type: {rep.report}
       </Typography>
     </CardContent>
     <CardContent>
       <Typography variant="body2" color="white">
         Status: {rep.process}
       </Typography>
     </CardContent>
     </Collapse>
     <CardActions disableSpacing>
       <IconButton disabled={ rep.process === "Cancelled" && true } aria-label="add to favorites" onClick={ () => handleSubmit({id:rep.ref, email:users.email, process:"Cancelled"})} color="error">
         <CancelIcon /> 
         <Typography>
           cancel
         </Typography>
       </IconButton>
       <IconButton disabled={ rep.process === "Pending" && true } aria-label="share" onClick={ () => handleSubmit({id:rep.ref, email:users.email, process:"Pending"})} color="warning">
         <PendingActionsIcon />
         <Typography>
           pending
         </Typography>
       </IconButton>
       <IconButton
         disabled={ rep.process === "Success" && true }
         onClick={ () => handleSubmit({id:rep.ref, email:users.email, process:"Success"})}
         color="success"
       >
        
         <CheckCircleIcon />
         <Typography>
           done
         </Typography>
       </IconButton>
     </CardActions>
    
   </Card>
              </React.Fragment>

          ))
        }
              </React.Fragment>
          ))
        }
     
     
      
      </Box>
    </Container>
  
  );
}
