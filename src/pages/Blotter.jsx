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
import {Typography, Paper, Grid, TextField, Button, Divider} from '@mui/material';
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

export default function Blotter() {
  const [expanded, setExpanded] = React.useState("");
  const [blotlog , setBlotlog] = useState([])
  const [search, setSearch] = useState('')
  const [statuss, setStatuss] = useState('')
  const [sort,setSort] = useState([])
  

  const [blotsort,setBlotsort] = useState(false)
  console.log(search)
  const getData = async () => {
    try {
        const res = await axios.get("https://barangay-talon-uno.vercel.app/log")

        console.log("data: ", res.data.blotlog  );
      setBlotlog(res.data.blotlog);
      setSort(res.data.sortreport)
    } catch (error) {
        console.log(error);
    }
}
useEffect(() => {
  getData();
},[])
const handleSubmit = async({id, email,process}) => {
    try{
      const res = await axios.post("https://barangay-talon-uno.vercel.app/admin/blotter", {
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
        // window.location.reload('/blotter');
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
     label="Search for Blotter Records" 
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
      <Button variant="contained" color="primary" onClick={() =>setBlotsort(!blotsort)}>
      {blotsort  ? "Newest-Oldest" : "Oldest-Newest"}
      </Button>
    </Stack>
    
   
  
    <Box sx={{ flexGrow: 1, p:5,  }} alignItems="flex-start">
    <Grid container spacing={{ xs: 5, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="flex-start ">
        {
          blotlog.map(( users, index )=> ( 
              <React.Fragment key={index}>
                 <Typography variant="h6" color="white">
          {/* Email: {users.email} */}
        </Typography> 
        {
          users.blotter.filter((item) => { return statuss === '' ? item : item.process.includes(statuss);}).filter((item) => { return search.toLowerCase() === '' ? item : item.complainant.toLowerCase().includes(search);})
          .sort(
            (a, b) =>
            blotsort ?   new moment(b.RequestTime).format("YYYYMMDD") - new moment(a.RequestTime).format("YYYYMMDD") :  
            new moment(a.RequestTime).format("YYYYMMDD") - new moment(b.RequestTime).format("YYYYMMDD")

            
          ).map((blot, index )=> (
              <React.Fragment key={index}>
<Card sx={{ maxWidth: 345,mt:5,mr:3 }} style={{backgroundColor: "#fff "}}>
{blot.complainant}<br/>
 TimeStamp: {moment(blot.RequestTime).format('LLLL')}
     <ExpandMore
         expand={expanded === blot._id ? true : false}
         onClick={ () => handleExpandClick(blot._id)}
         aria-expanded={expanded}
         aria-label="show more"
       >
         <ExpandMoreIcon />
       </ExpandMore>
       
     <Collapse in={expanded === blot._id ? true : false} timeout="auto" unmountOnExit>
     <Paper elevation="5">

     <CardContent>
  
  <Typography variant="body2" color="text.secondary">
    TimeStamp: {moment(blot.ReportTime).format('LLLL')}
  </Typography>
</CardContent>

<CardContent>
  <Typography variant="body2" color="text.secondary">
  Name of complainant: {blot.complainant}
  </Typography>
</CardContent>

 <CardContent>
  <Typography variant="body2" color="text.secondary">
  Address: {blot.address}
  </Typography>
</CardContent>
<CardContent>
  <Typography variant="body2" color="text.secondary">
  Contact No: {blot.contact}
  </Typography>
</CardContent> 
<Divider/> 

<Typography> Details of Person to be blottered</Typography>
 <CardContent>
  <Typography variant="body2" color="text.secondary">
  Firstname: {blot.complainedFirstname}
  </Typography>
</CardContent>
<CardContent>
  <Typography variant="body2" color="text.secondary">
  Middlename: {blot.complainedMiddlename}
  </Typography>
</CardContent>
<CardContent>
  <Typography variant="body2" color="text.secondary">
  Lastname: {blot.complainedLastname}
  </Typography>
</CardContent>
<CardContent>
  <Typography variant="body2" color="text.secondary">
  Address: {blot.complainedAddress}
  </Typography>
</CardContent>
<CardContent>
  <Typography variant="body2" color="text.secondary">
  Age: {blot.complainedAge}
  </Typography>
</CardContent>
<br/>
<Divider/>
<CardContent>
  <Typography variant="body2" color="text.secondary">
  Description: {blot.description}
  </Typography>
</CardContent>
<Divider/>
<CardContent>
  <Typography variant="body2" color="text.secondary">
  Status: {blot.process}
  </Typography>
</CardContent>
     </Paper>
     </Collapse>
     <CardActions disableSpacing>
       <IconButton disabled={ blot.process === "Success" && true } aria-label="add to favorites" onClick={ () => handleSubmit({id:blot._id, email:users.email, process:"Cancelled"})} color="error">
         <CancelIcon /> 
         <Typography>
           cancel
         </Typography>
       </IconButton>
       <IconButton disabled={blot.process === "Success" && true && blot.process !== "Pending" && true} aria-label="share" onClick={ () => handleSubmit({id:blot._id, email:users.email, process:"Pending"})} color="warning">
         <PendingActionsIcon />
         <Typography>
           pending
         </Typography>
       </IconButton>
       <IconButton
          disabled={ blot.process === "Success" && true }
         onClick={ () => handleSubmit({id:blot._id, email:users.email, process:"Success"})}
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
