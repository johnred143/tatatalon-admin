import { Alert, Autocomplete, Avatar, Box, Button, Card, CardContent,InputAdornment,Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from "@mui/lab/LoadingButton";
import swal from 'sweetalert';
import Swal from "sweetalert2";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from '@mui/icons-material/Lock';
import BusinessIcon from '@mui/icons-material/Business';
  const theme = createTheme();

  const Signup = () => {
    const defaultProps = {
      options: gendertypes,
      getOptionLabel: (option) => option.title,
    };
    const options = ['admin', 'police', 'fire'];

    const flatProps = {
      options: gendertypes.map((option) => option.title),
    };
  const navigate = useNavigate();
  const [error,setError] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const PHNUM_REGEX = /((^(\+)(\d){12}$)|(^\d{11}$))/;
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  
  useEffect(() => {
    axios
      .get("https://barangay-talon-uno.vercel.app/register")
      .then((res) => console.log(res.data))
      .catch((e) => console.error(e));
  }, []);
  const [inputs, setInputs] = useState({
    firstname: "",
    employeeId:"",
    lastname: "",
    department:"",
   
    password: "",
    confirmpassword: "",
  });
  

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //console.log(e.target.name,"value",e.target.value);
  const sendRequest = async () => {
    setLoading(true)
    try {
      const res = await axios.post(
        "https://barangay-talon-uno.vercel.app/admin/register",
        {
            employeeId: inputs.employeeId,
          firstname: inputs.firstname,
          lastname: inputs.lastname,   
          department: value,
          password: inputs.password,
          confirmpassword: inputs.confirmpassword
        }
      );
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'User Created'
      });
      console.log(res.data);
      navigate("/login");
      
    } catch (error) {
      setError(true)
      setAlert(true)
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Sign up Failed'
      });

      console.log("error signup");
    }
    finally {
      setLoading(false)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs);
  
//  if (! inputs.email){
//   const Toast = Swal.mixin({
//     toast: true,
//     position: 'bottom-start',
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//       toast.addEventListener('mouseenter', Swal.stopTimer)
//       toast.addEventListener('mouseleave', Swal.resumeTimer)
//     }
//   })
  
//   Toast.fire({
//     icon: 'error',
//     title: 'Email is Required'
//   });
  
//  }
  if (! inputs.firstname){
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'error',
    title: 'Firstname is Required'
  });
}
  else if (inputs.password !== inputs.confirmpassword){
      const Toast = Swal.mixin({
              toast: true,
              position: 'bottom-start',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title: 'Password do not match'
            });
    }else{
    sendRequest();
}
  };
  return (
  
<ThemeProvider theme={theme}>
      
      <Grid component={Paper} elevation={16} sx={{p:2,bgcolor:"#f2f4fb"}}>
      
      <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }} >
          <Card style={{ maxWidth: 500, padding: "20px 5px", margin: "0 auto" }}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Sign Up
            </Typography> 
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                Fill up the required values to be able to create an account.
            </Typography> 
              
                <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                    <TextField 
                    required
                    placeholder="Enter Employee ID" 
                    label="Employee ID" 
                    variant="outlined"  
                    name="employeeId"
                    error={error}
                    onChange={handleChange} 
                    value={inputs.employeeId} 
                    fullWidth 

                    />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField 
                    required
                    placeholder="Enter first name" 
                    label="First Name" 
                    variant="outlined"  
                    name="firstname"
                    error={error}
                    onChange={handleChange} 
                    value={inputs.firstname} 
                    fullWidth 

                    />
                  </Grid>
                  {/* <Grid xs={12} sm={6} item>
                    <TextField 
                    placeholder="Enter middle name" 
                    label="Middle Name" 
                    variant="outlined"  
                    name="middlename"
                    error={error}
                    onChange={handleChange} 
                    value={inputs.middlename} 
                    fullWidth
                     
                    />
                  </Grid> */}
                  <Grid xs={12} sm={6} item>
                    <TextField
                    placeholder="Enter last name" 
                    name="lastname"
                    label="Last Name" 
                    variant="outlined" 
                    error={error}
                    onChange={handleChange} 
                    value={inputs.lastname}  fullWidth required />
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <TextField 
                    placeholder="Enter Contact Number" 
                    label="Phone" 
                    name="contactnumber"
                    variant="outlined" 
                    error={error}
                    onChange={handleChange} 
                    value={inputs.contactnumber}  
                    fullWidth 
                    required 
                    inputProps={{
                      
                      pattern: "/((^(\+)(\d){12}$)|(^\d{11}$))/",
                    }}
                     InputProps={{
                      startAdornment: <InputAdornment position="start">+63</InputAdornment>,
                    }}
                    />
                  </Grid> */}
                  {/* <Grid item xs={12}>
                    <TextField 
                    type="email" 
                    placeholder="Enter email" 
                    name="email"
                    label="Email" 
                    variant="outlined"  
                    error={error}
                    onChange={handleChange} 
                    value={inputs.email}  
                    fullWidth 
                    required 
                   InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailOutlinedIcon color="inherit" />
                        </InputAdornment>
                    ),
                }}
                    />
                  </Grid> */}
                  {/* <Grid item xs={12}sm={6}>
                    <TextField 
                    disabled  
                    placeholder="" 
                    label="City" 
                    name="city"
                    variant="outlined" 
                    defaultValue="Las Piñas City" 
                    error={error}
                    onChange={handleChange} 
                    value={inputs.city}  
                    fullWidth   />
                  </Grid>
                  <Grid item xs={12}sm={6}>
                    <TextField 
                    disabled 
                    placeholder="" 
                    name="barangay"
                    label="Barangay" 
                    variant="outlined"
                    defaultValue="Talon Uno"  
                    error={error}
                    onChange={handleChange} 
                    value={inputs.barangay} 
                    fullWidth  
                    
                    />
                  </Grid> */}
                  {/* <Grid item xs={12}>
                    <TextField  
                    placeholder="Enter Street Name" 
                    label="Street Name" 
                    name="street"
                    variant="outlined"  
                    error={error}
                    onChange={handleChange} 
                    value={inputs.street} 
                    fullWidth  
                    InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                              <BusinessIcon color="inherit" />
                          </InputAdornment>
                      ),
                  }}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                  <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 460 }}
        renderInput={(params) => <TextField {...params} label="Department" />}
      />
                  </Grid>
                  {/* <Grid item xs={12}>
                  <Typography variant="subheading"> Birthdate</Typography>
                  <TextField 
                    type="date" 
                    label="" 
                    name="birthday"
                    variant="outlined"  
                    error={error}
                    onChange={handleChange} 
                    value={inputs.birthday} fullWidth required />
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                  <TextField
                
                required
                error={error}
                fullWidth
                onChange={handleChange} 
                value={inputs.password} 
                name="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          <LockIcon color="inherit" />
                      </InputAdornment>
                  ),
              }}
              />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
    
                required
                error={error}
                fullWidth
                onChange={handleChange} 
                value={inputs.confirmpassword} 
                name="confirmpassword"
                label="confirmpassword"
                type="password"
                id="confirmpassword"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          <LockIcon color="inherit" />
                      </InputAdornment>
                  ),
              }}
              />
                  </Grid>
                  {/* <Grid item xs={12}>
                  <FormControlLabel
                    
                    control={<Checkbox required value="agree" color="primary" />}
                    label="I agree to the terms and condition."
                  />
                </Grid> */}
                  <Grid item xs={12}>
                  <LoadingButton 
               loading = {loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
               Register User
            </LoadingButton>
                  </Grid>
                  {/* <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid> */}
                </Grid>
            </CardContent>
          </Card>
         </Box>
        </Grid>
    </ThemeProvider>
  );
};
const gendertypes = [
  { title: 'admin', id: 1 },
  { title: 'Police', id: 2 },
  { title: 'fire', id: 3 },

];
export default Signup;