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

const BlotterComplainForm = ({step,setActiveStep,setFormdata}) => {

  const today = moment();
  console.log(
    "Today's date is: " + 
    today.format('YYYY-MM-DD')
  );
//   const [irbi, setIrbi] = useState('');
//   const [region, setRegion] = useState('NCR');
//   const [province, setProvince] = useState('Metro Manila');
//   const [city, setCity] = useState('Las Piñas');
//   const [barangay, setBarangay] = useState('Talon Uno');
//   const [date, setDate] = useState( today.format('YYYY-MM-DD'));
//   const [precintno, setPrecintno] = useState('');
//   const [vrr, setVrr] = useState('');
//   const [contactno , setContactno] = useState('');
   const [lastname, setLastname] = useState(''); 
   const [firstname, setFirstname] = useState('');
   const [middlename, setMiddlename] = useState('');
   const [nickname, setNickname] = useState('');
   const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const [address, setAddress] = useState('');


   const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false); 

    //console.log("sd")
  const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      setActiveStep((currentState)=> currentState +1 );
      console.log('pak')
      setFormdata(( currentState ) => {
        let data = { 
        lastname,
        firstname,
        middlename,
        age,
        address
        }

        return{
          ...currentState, 
          complainant: data,
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
            'Your blotter has been cancelled.',
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
        <Card style={{ maxWidth: 1500,height:950, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            
              <Typography gutterBottom variant="h5" >
         Complained Person Information
          </Typography> 
            
         
              <Typography gutterBottom variant="body2" >
          
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
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  id="lastname"
                  label="Lastname "
                  name="lastname"
                  type="text"
                  autoComplete="lastname"
                  autoFocus
                  required
                  />
                </Grid>
                
                <Grid  item   xs={12} sm={6} >
                <TextField
                margin="normal"
                
                
                error={error}
                fullWidth
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                name="Firstname"
                label="firstname"
                id="firstname"
                autoComplete="firstname"
                inputProps={{ minLength: 2 }}
                required
              />
              
                </Grid>
                
                <Grid  item    xs={12} sm={6} >
                <TextField
                margin="normal"
                error={error}
                fullWidth
                onChange={(e) => setMiddlename(e.target.value)}
                value={middlename}
                name="Middlename"
                label="Middlename"
                id="middlename"
                autoComplete="middlename"
                helperText="*If only applicable"
                
              />
              
                </Grid>
               
                <Grid  item  xs={12} sm={6} >
                <TextField
                margin="normal"
                error={error}
                fullWidth
                onChange={(e) => setAge(e.target.value)}
                value={age}
                
                name="Age"
                label="Age"
                id="age"
                autoComplete="age"
                type="number"
                required
              />
              
                </Grid>
               
                
                <Grid  item   xs={12} >
                <TextField
                margin="normal"
                error={error}
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              
                name="Address"
                label="Address"
                id="Address"
                autoComplete="Address"
               
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

export default BlotterComplainForm