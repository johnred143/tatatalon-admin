import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { useState } from 'react';
import BlotterForm from './BlotterForm';
import BlotterComplainForm from './BlotterComplain';
import BlotterReview from './BlotterReview';
import BlotterDescription from './BlotterDescription';



const steps = ['Resident Information','Complained Person Information', 'Blotter details', 'Review your blotter'];

function getStepContent(step,setActiveStep,setFormdata,formdata) {
  switch (step) {
    case 0:
      return <BlotterForm setActiveStep={setActiveStep} setFormdata={setFormdata} />;
    case 1:
      return <BlotterComplainForm setActiveStep={setActiveStep} setFormdata={setFormdata} />;
      case 2:
        return <BlotterDescription setActiveStep={setActiveStep} setFormdata={setFormdata} />;
    case 3:
      return <BlotterReview setActiveStep={setActiveStep} formdata={formdata} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function BLotterCheckout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [items, setItems] = useState([]);
  const [formdata, setFormdata] = useState(
    {
        brgyform: { }, 
        complainant:{ },
        blotterdescription: '',

    }
  )

  const handleNext = (e) => {
    setActiveStep(activeStep + 1);
   
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
};
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container  maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Make a Blotter
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep,setActiveStep,setFormdata,formdata) }
          {/* {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Request Submitted
              </Typography>
              <Typography variant="subtitle1">
                 We have emailed your request
                confirmation, and will send you an update through email when your request has
                processed and ready to pick up.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, setActiveStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}  fullWidth>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  fullWidth
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )} */}
        </Paper>
        
      </Container>
    </ThemeProvider>
  );
}

