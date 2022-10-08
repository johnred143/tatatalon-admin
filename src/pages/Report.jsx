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

        console.log("data: ", res.data.replog );
      setReplog(res.data.replog  );
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
          replog.map(( users, index )=> ( 
              <React.Fragment key={index}>
                 <Typography variant="h6" color="white">
          Email: {users.email}
        </Typography> 
        {
          users.reports.map((rep, index )=> (
              <React.Fragment key={index}>
<Card sx={{ maxWidth: 345,mt:5 }}>
     
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
       
       <Typography variant="body2" color="text.secondary">
         Name: {rep.name}
       </Typography>
     </CardContent>
    
     <CardContent>
       <Typography variant="body2" color="text.secondary">
         Address: {rep.addressdetail}
       </Typography>
     </CardContent>
     
     <CardContent>
       <Typography variant="body2" color="text.secondary">
         Report Type: {rep.report}
       </Typography>
     </CardContent>
     <CardContent>
       <Typography variant="body2" color="text.secondary">
         Status: {rep.process}
       </Typography>
     </CardContent>
     </Collapse>
     <CardActions disableSpacing>
       <IconButton aria-label="add to favorites" onClick={{}}>
         <CancelIcon /> 
         <Typography>
           cancel
         </Typography>
       </IconButton>
       <IconButton aria-label="share" onClick={ () => handleSubmit({id:rep.ref, email:users.email, process:"Pending"})}>
         <PendingActionsIcon />
         <Typography>
           pending
         </Typography>
       </IconButton>
       <IconButton
         
         onClick={ () => handleSubmit({id:rep.ref, email:users.email, process:"Success"})}
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
