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
import {Typography, Paper, Grid, Button, TextField, InputLabel, FormControl, Input, FormHelperText, OutlinedInput} from '@mui/material';
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
  const [search, setSearch] = useState('')
  console.log(search)
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
const openSearch = () =>{
  Swal.fire({
    title: 'Search User',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      })
    }
  })
}
  return (
    <Container bgcolor="#f2f4fb" sx={{ flexGrow: 1, p:2,mt:15 }} >
     <TextField 
     label="Search for User Reports" 
     color="secondary"
     focused 
     fullWidth 
      sx={{ input: { color: 'white' }, mb:2, width: 1200 }}
     onChange={(e) => setSearch(e.target.value)}
     />
      {/* <FormControl>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput
          id="component-outlined"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ input: { color: 'white' }, mb:2, width: 1200, color:'white'}}
          label="Name"
          color="success"
          focused
          defaultValue="Search for User Report"
        />
      </FormControl> */}
       <Grid
        container
        spacing={2}
        
        sx={{
          pl:4,
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}
      >
      <Box>
        {
          replog.map(( users, index ) => ( 
              <React.Fragment key={index}>
                 <Typography variant="h6" color="white">
          {/* Email: {users.email} */}
        </Typography> 
        {
          users.reports.filter((item) => { return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);}).map((rep, index ) => (
              <React.Fragment key={index}>
<Card sx={{ maxWidth: 345,mt:5 }} style={{backgroundColor: "#fff "}}>
       Reporter: {users.email}
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
       
       <Typography variant="body2" color="black">
         Name: {rep.name}
       </Typography>
     </CardContent>
    
     <CardContent>
       <Typography variant="body2" color="black">
         Address: {rep.addressdetail}
       </Typography>
     </CardContent>
     
     <CardContent>
       <Typography variant="body2" color="black">
         Report Type: {rep.report}
       </Typography>
     </CardContent>
     <CardContent>
       <Typography variant="body2" color="black">
         Status: {rep.process}
       </Typography>
     </CardContent>
     </Paper>
     </Collapse>
     <CardActions disableSpacing>
       <IconButton disabled={ rep.process === "Success" && true } aria-label="add to favorites" onClick={ () => handleSubmit({id:rep.ref, email:users.email, process:"Cancelled"})} color="error">
         <CancelIcon /> 
         <Typography>
           cancel
         </Typography>
       </IconButton>
       <IconButton disabled={ rep.process === "Success" && true } aria-label="share" onClick={ () => handleSubmit({id:rep.ref, email:users.email, process:"Pending"})} color="warning">
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
      </Grid>
    </Container>
  
  );
}
