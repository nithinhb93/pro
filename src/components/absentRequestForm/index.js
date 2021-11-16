/* eslint-disable no-alert */
import React, { useContext, useEffect, useState } from 'react';
import {
  Grid, Typography, Button, Stepper, Step, StepLabel, StepContent, Box, IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useLocation, useHistory } from 'react-router-dom';
import { AbsentFormContext } from './absentFormContext/absentContext';
import AbsentFormStep1 from './absentFormSteps/step1';
import AbsentFormStep2 from './absentFormSteps/step2';
import AbsentFormStep3 from './absentFormSteps/step3';
import AbsentFormStep4 from './absentFormSteps/step4';
import * as handleValidations from './absentFormSteps/handleValidation';
import RequestSuccessModel from './absentFormSteps/requestSuccessModel';
import './style.scss';

const AbsentRequestForm = () => {
  const location = useLocation();
  const history = useHistory();
  const theme = JSON.parse(window.localStorage.getItem('theme'));
  const {
    setRouteResponse, currentStep, setCurrentStep, stepsList, routeResponse,
    selectedAbsentReason,
    selectedDepartment, shiftLocation, shiftType, shiftTiming, absentTiming,
    fMlaStatus,
    phoneNumber, emailConfirm, emailAddress,
  } = useContext(AbsentFormContext);
  const [openSuccessModel, setOpenSuccessModel] = useState(false);



  const handleNext = () => {
    if (currentStep === 0 && !handleValidations?.Step1Validation(selectedAbsentReason,
      fMlaStatus)) {
      return;
    }
    if (currentStep === 1 && !handleValidations?.Step2Validation(selectedDepartment,
      shiftLocation, shiftType, shiftTiming)) {
      return;
    }
    if (currentStep === 2 && !handleValidations?.Step3Validation(phoneNumber,
      emailConfirm, emailAddress)) {
      return;
    }
    if (currentStep === stepsList?.length - 1) {
      setOpenSuccessModel(true);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  useEffect(() => {
    if (location?.state) { setRouteResponse(location?.state); }
  }, [location]);

  function QontoStepIcon(props, index) {
    // eslint-disable-next-line react/prop-types
    const { completed } = props;
    return (
      <IconButton size="small" style={{ background: completed ? '#0073ca' : 'rgba(0,0,0,.54)', color: 'white' }}>
        {completed ? <EditIcon style={{ fontSize: '10px', padding: '5px' }} /> : <Typography style={{ fontSize: '10px', padding: '2px 6px' }}>{index + 1}</Typography>}
      </IconButton>
    );
  }

  return (
    <>
      <Grid container spacing={2} className="absent-request-form-main-body">
        <Grid item md={12} xs={12}>
          <Button
            color="primary"
            variant="text"
            style={{
              textTransform: 'initial', font: "normal normal 13px 'Helvetica', sans-serif", textDecoration: 'underline', fontStyle: 'italic',
            }}
            onClick={() => {
              history.push({
                pathname: '/',
                state: { ...routeResponse },
              });
            }}
          >
            Return to Home Page
          </Button>
        </Grid>
        <Grid item md={12} xs={12}>
          <Stepper activeStep={currentStep} orientation="vertical" style={{ padding: '0px 24px', color: '' }}>
            {stepsList.map((item, index) => (
              <Step key={item}>
                <StepLabel
                  color="primary"
                  StepIconComponent={(props) => QontoStepIcon(props, index)}
                //     optional={
                //   index === 3 ? (
                //     <Typography color="prePrimary" variant="caption">Last step</Typography>
                //   ) : null
                // }
                >
                  <Typography color="prePrimary" style={{ color: theme?.palette?.prePrimary?.main, font: "normal normal 500 16px 'Roboto', sans-serif" }}>{item}</Typography>
                </StepLabel>
                <StepContent>
                  <Grid container spacing={2}>
                    <Grid item md={12} xs={12}>
                      {index === 0 ? <AbsentFormStep1 /> : null}
                      {index === 1 ? <AbsentFormStep2 /> : null}
                      {index === 2 ? <AbsentFormStep3 /> : null}
                      {index === 3 ? <AbsentFormStep4 /> : null}
                    </Grid>
                  </Grid>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleBack}
                        size="small"
                        style={{
                          textTransform: 'capitalize', margin: '0px 5px', display: index === 0 ? 'none' : '', padding: '5px 30px',
                        }}
                      >
                        Back
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleNext} size="small" style={{ textTransform: 'capitalize', margin: '0px 5px', padding: '5px 30px' }}>
                        {index === stepsList?.length - 1 ? 'Submit' : 'Next'}
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
      {openSuccessModel ? (
        <RequestSuccessModel
          open={openSuccessModel}
          requestId="00237189.1633443821.0"
          handelClose={() => setOpenSuccessModel(false)}
        />
      ) : null}
      <div id="alert"></div>
    </>
  );
};

export default AbsentRequestForm;
