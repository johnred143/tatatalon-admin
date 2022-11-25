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
import {Typography, Paper, Grid, TextField, Button} from '@mui/material';
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
import { Stack } from '@mui/system';
import moment from 'moment'
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

export default function Request() {
  const [expanded, setExpanded] = React.useState("");
  const [reqlog, setReqlog] = useState([])
  const [search, setSearch] = useState('')
  const [statuss, setStatuss] = useState('')
 
  console.log(search)
  const getData = async () => {
    try {
        const res = await axios.get("https://barangay-talon-uno.vercel.app/log")

        console.log("data: ", res.data.reqlog );
      setReqlog(res.data.reqlog  );
    } catch (error) {
        console.log(error);
    }
}
useEffect(() => {
  getData();
},[])
const handleSubmit = async({id, email,process}) => {
    try{
      const res = await axios.post("https://barangay-talon-uno.vercel.app/admin/request", {
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
        window.location.reload('/request');
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
    <Container  bgcolor="#f2f4fb" sx={{ flexGrow: 1, p:2,mt:15 }}>
      <TextField 
     label="Search for User Request" 
     color="secondary"
     focused 
     fullWidth 
      sx={{ input: { color: 'white' }, mb:2, width: 1200 }}
     onChange={(e) => setSearch(e.target.value)}
     />
      <Typography color="white"> Filter Status By: </Typography>
      <Stack direction="row" spacing={1}>
      <Button variant="contained" color="error" onClick={() => setStatuss("Cancelled")}>
        Cancelled
      </Button>
      <Button variant="contained" color="warning" onClick={() => setStatuss("Pending")}>
        Pending
      </Button>
      <Button variant="contained" color="success" onClick={() => setStatuss("Success")}>
        Success
      </Button>
      <Button variant="contained" color="primary" onClick={() => setStatuss("")}>
        Show All
      </Button>
    </Stack>
    
   
  
    <Box sx={{ flexGrow: 1, p:5,  }} alignItems="flex-start">
    <Grid container spacing={{ xs: 5, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="flex-start ">
        {
          reqlog.map(( users, index )=> ( 
              <React.Fragment key={index}>
                 <Typography variant="h6" color="white">
          {/* Email: {users.email} */}
        </Typography> 
        {
          users.request.filter((item) => { return statuss === '' ? item : item.process.includes(statuss);}).filter((item) => { return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);}).map((rep, index )=> (
              <React.Fragment key={index}>
<Card sx={{ maxWidth: 345,mt:5,mr:3 }} style={{backgroundColor: "#fff "}}>
{rep.name} <br/>
        Time: {moment(rep.ReportTime).format('LLLL')}  
       <br/>
     
     <ExpandMore
         expand={expanded === rep._id ? true : false}
         onClick={ () => handleExpandClick(rep._id)}
         aria-expanded={expanded}
         aria-label="show more"
       >
         <ExpandMoreIcon />
       </ExpandMore>
       
     <Collapse in={expanded === rep._id ? true : false} timeout="auto" unmountOnExit>
     <Paper elevation="5">

     <CardContent>
  
  <Typography variant="body2" color="text.secondary">
    TimeStamp: {moment(rep.RequestTime).format('LLLL')}
  </Typography>
</CardContent>

<CardContent>
  <Typography variant="body2" color="text.secondary">
  IRBI: {rep.irbi}
  </Typography>
</CardContent>

{/* <CardContent>
  <Typography variant="body2" color="text.secondary">
  VRR: {rep.vrr}
  </Typography>
</CardContent> */}
<CardContent>
  <Typography variant="body2" color="text.secondary">
  region: {rep.region}
  </Typography>
</CardContent>

<CardContent>
  <Typography variant="body2" color="text.secondary">
  City/Municipality: Las Piñas
  </Typography>
</CardContent>

<CardContent>
  <Typography variant="body2" color="text.secondary">
  Province: {rep.province}
  </Typography>
</CardContent>

<CardContent>
  <Typography variant="body2" color="text.secondary">
  Barangay: {rep.brgy}
  </Typography>
</CardContent>

<CardContent>
  <Typography variant="body2" color="text.secondary">
  Contact no: {rep.contact}
  </Typography>
</CardContent>

<CardContent>
  <Typography variant="body2" color="text.secondary">
  Firstname: {rep.firstname}
  </Typography>
</CardContent>
<CardContent>
   
  <Typography variant="body2" color="text.secondary">
    Middlename: {rep.middlename}
  </Typography>
</CardContent>
<CardContent>
  
  <Typography variant="body2" color="text.secondary">
    Lastname: {rep.lastname}
  </Typography>
</CardContent>
<CardContent>
  
  <Typography variant="body2" color="text.secondary">
    Nickname: {rep.nickname}
  </Typography>
</CardContent>
<CardContent>
  
  <Typography variant="body2" color="text.secondary">
    Age: {rep.age}
  </Typography>
</CardContent>
<CardContent>
  <Typography variant="body2" color="text.secondary">
    Place of Birth: {rep.birthplace}
  </Typography>
</CardContent>

<CardContent>
  <Typography variant="body2" color="text.secondary">
    Address: {rep.address}
  </Typography>
</CardContent>
<CardContent>
  <Typography variant="body2" color="text.secondary">
    Height:{rep.height} cm
  </Typography>
</CardContent>
<CardContent>
  <Typography variant="body2" color="text.secondary">
    Weight:{rep.weight} kg
  </Typography>
</CardContent>
<CardContent>
  <Typography variant="body2" color="text.secondary">
    Request Type: {rep.type}
  </Typography>
</CardContent>

<CardContent>
  <Typography variant="body2" color="text.secondary">
    Status:{rep.process}
  </Typography>
</CardContent>
     </Paper>
     </Collapse>
     <CardActions disableSpacing>
       <IconButton disabled={ rep.process === "Success" && true } aria-label="add to favorites" onClick={ () => handleSubmit({id:rep._id, email:users.email, process:"Cancelled"})} color="error">
         <CancelIcon /> 
         <Typography>
           cancel
         </Typography>
       </IconButton>
       <IconButton disabled={rep.process === "Success" && true && rep.process !== "Pending" && true} aria-label="share" onClick={ () => handleSubmit({id:rep._id, email:users.email, process:"Pending"})} color="warning">
         <PendingActionsIcon />
         <Typography>
           pending
         </Typography>
       </IconButton>
       <IconButton
          disabled={ rep.process === "Success" && true }
         onClick={ () => handleSubmit({id:rep._id, email:users.email, process:"Success"})}
         color="success"
       >
         <CheckCircleIcon />
         <Typography>
           Completed
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
     
     
     </Grid>
      </Box>
     
    </Container>
  
  );
}
