import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { Box, Card, CardContent, Container, Divider, Paper } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';


// brgydata: formdata.brgyform
// requesttype: formdata.requesttype

export default function BlotterReview({setActiveStep,formdata}) {
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false)
  console.log(formdata.blotterdescription.description)
  const sendRequest = async () => {
    setLoading(true)
    try { 
        const res = await axios.post('https://barangay-talon-uno.vercel.app/main/blotter',{
           complainant: formdata.brgyform.name,
           date: formdata.brgyform.date,
           address: formdata.brgyform.address,
           contact: Number(formdata.brgyform.address),
           complainedFirstname: formdata.complainant.firstname,
           complainedMiddlename: formdata.complainant.middlename,
           complainedLastname: formdata.complainant.lastname,
           complainedAddress: formdata.complainant.address,
           complainedAge: Number(formdata.complainant.age),
           description: formdata.blotterdescription,
    
        }, {
          headers:{
            "Authorization": "Bearer " + `${localStorage.getItem('T')}`  
          }
        })
        swal({
          title: "Blotter Submitted!",
          text: "Blotter Successful",
          icon: "success",
          button: "OK",
        });
          
            console.log(res.data.token);
           // localStorage.setItem('T', res.data.token);
           //navigate('/report');

    }catch(error) {
      setError(true)
      swal({
        title: "Blotter Not Submitted!",
        text: "Blotter Unsuccessful",
        icon: "error",
        button: "OK",
        
      });
            console.log(error.response);
    }finally {
      setLoading(false)
     
    }
  
}
const handleSubmit = (e) => {
  e.preventDefault();
  //console.log(inputs);

  sendRequest();

};
  return (
    <>
    <Container maxWidth="xl">
    <Grid component={Paper} elevation={16} sx={{p:2}}>
    
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Card style={{ maxWidth: 1500,height:800, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            
              <Typography gutterBottom variant="h5" >
           Blotter Details
          </Typography> 
            
         
              <Typography gutterBottom variant="body2" >
           
          </Typography> 
             
          
          <br/>
          
       

          <br/>
          <Divider/>
          <br/>
          <Grid container spacing={1}>
          <Grid item  xs={12} sm={6}>
          <Typography textTransform="capitalize"> 
             Complainant Name : {formdata.brgyform.name}
            
               </Typography>
          </Grid>
          <Grid item  xs={12} sm={6}>
            <Typography> 
              <Typography>Date:  {formdata.brgyform.date}</Typography>
                   </Typography>
           </Grid>
          <Grid item  xs={12} sm={6}>
            <Typography> 
              
              <Typography> Address : {formdata.brgyform.address}</Typography>
                
             
            </Typography>
          </Grid>
          <Grid item  xs={12} sm={6} >
            
              <Typography>Contact no: {formdata.brgyform.contactno}</Typography>
                     
                 
          </Grid>
       
                </Grid>
                <br/>
                <Divider sx={{borderBottomWidth: 10}}/>
                <Grid container spacing={1}>
                <Grid  item   xs={12}  >
                <Typography> Complained Person: </Typography>

                </Grid>
                <Grid  item   xs={12} sm={6}  >
                <Typography>Firstname: {formdata.complainant.firstname}</Typography>
             
                
             
              
                </Grid>
                <Grid  item   xs={12} sm={6} >
                <Typography>Middlename: {formdata.complainant.middlename}</Typography>
               
               
              
              
                </Grid>
                <Grid  item   xs={12} sm={6}>
                <Typography>Lastname: {formdata.complainant.lastname}</Typography>
                
             
              
              
                </Grid>
                </Grid>
                <Grid container spacing={1}>
              
                <Grid  item  xs={12} sm={6} >
                <Typography> Address: {formdata.complainant.address}</Typography>

                </Grid>
                
                <Grid  item  xs={12} sm={6} >
                <Typography> Age: {formdata.complainant.age}</Typography>

                </Grid>
                <Divider sx={{borderBottomWidth: 10}}/>
                <br/>
                <Divider sx={{borderBottomWidth: 10}}/>
          
       

          <br/>
          <Divider sx={{borderBottomWidth: 10}}/>
          <br/>
                <Grid container justifyContent="flex-start">
                <Divider sx={{borderBottomWidth: 10}}/> 
                <Grid  item  xs={12}  >
                <Divider sx={{borderBottomWidth: 10}}/>
                <Typography> Blotter Scenario Description: {formdata.blotterdescription}</Typography>

                </Grid>
                
            </Grid>
            
              </Grid>
              <Grid item xs={12} sm={6}>
                <LoadingButton 
             loading = {loading}
              onClick= {()=> setActiveStep((currentState)=> currentState -1 )}
              sx={{ mt: 3, mb: 2}}
              variant="contained"
              fullWidth
              color='secondary'
              >
            Previous
          </LoadingButton>
                </Grid>
          <Grid item xs={12} sm={6}>
                <LoadingButton 
             loading = {loading}
              type="submit"
              sx={{mt: 3, mb: 2}}
              variant="contained"
              fullWidth
              // onClick={()=> console.log(formdata)}
              onClick={handleSubmit}
              >
            Submit
          </LoadingButton>
                </Grid>
     
          </CardContent>
        </Card>
       </Box>
       
      </Grid>
      </Container>
    </>
  
    
  );
}