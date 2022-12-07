import { Autocomplete, Box, Button, Card, CardContent, Divider, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';


const options = ['Male', 'Female'];
const optionsStatus = ['Single', 'Engaged','Married','Divorced','Widowed'];
const docs = ['Barangay ID', 'Barangay Clearance', 'Barangay ID'];

const BlotterForm = ({step,setActiveStep,setFormdata}) => {

  const today = moment();
  console.log(
    "Today's date is: " + 
    today.format('YYYY-MM-DD')
  );

  const [date, setDate] = useState( today.format('YYYY-MM-DD'));

  const [contactno , setContactno] = useState('');
 
  const [name, setName] = useState('');
 
  const [address, setAddress] = useState('');


   const [loading, setLoading] = useState(false);
   const [error,setError] = useState(false); 
//   const [inputValue, setInputValue] = React.useState('');
//   const [inputValue2, setInputValue2] = React.useState('');
//   const [inputValue3, setInputValue3] = React.useState('');
//   const [value, setValue] = React.useState(options[0]);
//   const [value2, setValue2] = React.useState(optionsStatus[0]);
  // const [value3, setValue3] = React.useState(docs[0]);
    //console.log("sd")
  const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      setActiveStep((currentState)=> currentState +1 );
      console.log('pak')
      setFormdata(( currentState ) => {
        let data = { 
         date,
         contactno,
         name: name,
        
         address: address
        }

        return{
          ...currentState, 
          brgyform: data,
      }
      })
    };
    const handleCancel = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Cancelled!',
            'Your request has been cancelled.',
            'success'
          )
          navigate('/mainpage')
        }
      })
    }
  return (
    <>
    <Container maxWidth="xl">
    <Grid component={Paper} elevation={16} sx={{p:2}}>
    
    <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Card style={{ maxWidth: 1500,height:1050, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            
              <Typography gutterBottom variant="h5" >
          Barangay Talon Uno Blotter
          </Typography> 
            
         
              <Typography gutterBottom variant="body2" >
          Complainant Information
          </Typography> 
             
          
          <br/>
            <Typography variant="body2" color="error" component="p" gutterBottom>
              Please fill out the  values
          </Typography> 
          {/* <Autocomplete
        value={value3}
        onChange={(event, newValue3) => {
          setValue3(newValue3);
        }}
        inputValue={inputValue3}
        onInputChange={(event, newInputValue3) => {
          setInputValue3(newInputValue3);
        }}
        id="controllable-states-demo"
        options={docs}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Request Type" />}
      /> */}

          <br/>
          <Divider/>
          <br/>
          <Grid container spacing={1}>
        
          <Grid item  xs={12} sm={6}>
            <Typography> Date: 
              <TextField 
              disabled
                    type="text"
                    label="Date Today"
                    name="date"
                    variant="outlined"  
                    error={error}
                    sx={{ml:2,mb:1}}
                    // onChange={(e) => setDate(e.target.value)}
                   value={date}
           />           </Typography>
           </Grid>
         
                 
         
           <Grid item  xs={12} sm={6} >
          
          <TextField 
                required
                sx={{ml:2,mb:1}}
                type="number" 
                label="Contact No." 
                name="Contact No."
                variant="outlined"  
                error={error}
                onChange={(e) => setContactno(e.target.value)}
                value={contactno}
                InputProps={{
                  startAdornment: <InputAdornment position="start">+63</InputAdornment>,
                }}
                inputProps={{ minLength: 6 }}
       />          
          </Grid>
         
         
          </Grid>
          <br/>
          <Divider/>
          <br/>
              <Grid container spacing={1}>
                <Grid item    xs={12} sm={6}>
                  <TextField 
                  
                  margin="normal"
                  
                  error={error}
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  id="name"
                  label="Name "
                  name="Name"
                  type="text"
                  autoComplete="Name"
                  autoFocus
                  required
                  />
                </Grid>
                
         
               
               
               
                
                <Grid  item   xs={12} sm={6}>
                <TextField
                
                margin="normal"
                error={error}
                fullWidth
                onChange={({ target }) => setAddress(target.value)}
                value={address}
                name="Address"
                label="Address"
                id="address"
                autoComplete="address"
              
                required
              />
              
                </Grid>
              
                {/* </Grid> */}
                {/* <br/>
                <Divider sx={{borderBottomWidth: 10}}/>
                <Grid container spacing={1}>
                <Grid  item   xs={12} sm={6} >
                <Typography> Contact Person Incase of Emergency: </Typography>

                </Grid>
                <Grid  item   xs={12} sm={6}  >
                <TextField
                margin="normal"
                error={error}
                fullWidth
                onChange={({ target }) => setEmergencyname(target.value)}
                value={emergencyname} 
                name="Name"
                label="Name"
                required
                autoComplete="Name" 
              />
            </Grid> */}
               

                <Grid item xs={12} sm={6}>
                <Button 
             loading = {loading}
              onClick={handleCancel}
              fullWidth
              variant="contained"
              color='error'
              sx={{ mt: 3, mb: 2 }}
              >
            Cancel
          </Button>
          </Grid>
                
                <Grid item xs={12} sm={6}>
                <LoadingButton 
             loading = {loading}
              type="submit"
              
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
              >
            next
          </LoadingButton>
                </Grid> 
                <Grid container justifyContent="flex-end">
             
            </Grid>
              </Grid>
          </CardContent>
        </Card>
       </Box>
      </Grid>
      </Container>
    </>
  )
}

export default BlotterForm