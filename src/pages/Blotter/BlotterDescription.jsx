import { LoadingButton } from '@mui/lab';
import { Autocomplete, Card, CardContent, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react';


const options = ['Barangay ID', 'Barangay Clearance', 'Barangay ID'];

const BlotterDescription = ({step, setActiveStep,setFormdata}) => {
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(false); 

    const [description, setDescription] = React.useState('');
   console.log(description)
    const handleSubmit = (e) => {
        e.preventDefault();
        setActiveStep((currentState)=> currentState +1 );
        setFormdata(( currentState ) => {
         
  
          return{
            ...currentState, 
            blotterdescription: description,
        }
        })
        
  };
  return (
    <Container maxWidth="xl">
    <Grid component={Paper} elevation={16} sx={{p:2}}>
      
    <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Card style={{ maxWidth: 1500, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
          <Typography color='red'> Describe here the scenario of your conflict with the complained person</Typography>
          <br/>
         <Grid container spacing={1} alignItems="center" justify="center"  >
           
          
          <Grid xs={12} >
                 
          <TextField
          required
          id="outlined-multiline-static"
          label="Scenario"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          
        />

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
            <Grid item xs={12} sm={6} >
                <LoadingButton 
             loading = {loading}
              type="submit"
              sx={{mt: 3, mb: 2}}
              variant="contained"
              fullWidth
              >
            Next
          </LoadingButton>
                </Grid>
      </Grid> 
        
    </CardContent>
 </Card>
</Box>
 </Grid>
 </Container>
  )
}

export default BlotterDescription