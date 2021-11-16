/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Grid, Typography, Button, Divider,
} from '@material-ui/core';
import './style.scss';
import { useHistory, useLocation } from 'react-router-dom';
import CustomDatePicker from '../../elements/datePicker';
import DateHelper from '../../elements/dateFormater';

const AbsentRequest = () => {
  const theme = JSON.parse(window.localStorage.getItem('theme'));
  const history = useHistory();
  const location = useLocation();
  const [dayType, setDayType] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [handleError, setHandleError] = useState({
    startDate: false,
    endDate: false,
  });
  const userDetails = {
    name: 'Tika Ram',
    email: 'Tika.Ram.Subedi@aa.com',
  };

  const handleSubmit = () => {
    if (dayType === 'multiple' && moment(new Date(startDate).toISOString().split('T')[0]).isSame(new Date(endDate).toISOString().split('T')[0])) {
      window.alert('Start Date & End Date should not be same');
      return;
    }
    if (dayType === 'multiple' && moment(new Date(startDate).toISOString().split('T')[0]).isAfter(new Date(endDate).toISOString().split('T')[0])) {
      window.alert('Start Date should not less than End Date');
      return;
    }
    history.push({
      pathname: '/request-form',
      state: {
        userProfile: userDetails,
        daysType: dayType,
        startDate,
        endDate,
      },
    });
  };

  useEffect(() => {
    if (location?.state) {
      setDayType(location?.state?.daysType);
      setStartDate(location?.state?.startDate);
      setEndDate(location?.state?.endDate);
    }
  }, [location]);

  const HandleError = (value, key) => {
    setHandleError((data) => {
      const newData = { ...data };
      switch (key) {
        case key:
          newData[key] = value;
          return newData;
        default:
          return null;
      }
    });
  };

  return (
    <Grid container spacing={2} className="absent-request-main-body">
      <Grid item md={6} xs={12}>
        <Typography style={{ color: theme?.palette?.prePrimary?.main, font: "normal normal bold 28px 'Roboto', sans-serif" }} variant="h4">{`Welcome to MyTime, ${userDetails?.name}`}</Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography color="secondary" style={{ font: "normal normal 500 18px 'Roboto', sans-serif", margin: '1rem 0px' }}>
          Please select the duration of your absence to get started with your absence request :
        </Typography>
      </Grid>
      <Grid item md={window.innerWidth > 1400 ? 4 : 5} xs={12}>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12} className="absent-request-check-box-div">
            <Button
              variant={dayType === 'single' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => {
                setDayType('single');
                setStartDate(null);
                setEndDate(null);
              }}
              className="absent-request-check-box-btn"
            >
              Single Day

            </Button>
            <Button
              variant={dayType === 'multiple' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => {
                setStartDate(new Date());
                setEndDate(null);
                setDayType('multiple');
              }}
              className="absent-request-check-box-btn"
            >
              Multiple Days
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {dayType ? (
        <>
          <Grid item md={12} xs={12}>
            <Typography color="secondary" style={{ font: "normal normal 500 18px 'Roboto', sans-serif", margin: '1rem 0px' }}>
              Please select your absence date (start date must be today or tomorrow):
            </Typography>
          </Grid>
          <Grid item md={window.innerWidth > 1400 ? 4 : 5} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} className="absent-request-date-picker-div">
                <CustomDatePicker
                  error={handleError?.startDate}
                  helperText={handleError?.startDate ? 'please select start date' : ''}
                  label="Start Date - Required"
                  maxDate={new Date(DateHelper.format(DateHelper.addDays(new Date(), 1)))}
                  required
                  disablePast
                  value={startDate}
                  onChange={(date) => { if (date) { HandleError(false, 'startDate', 'onChange'); setStartDate(date); } else { HandleError(true, 'startDate'); } }}
                  disableToolbar
                  emptyLabel=""
                  onClose={() => {
                    setTimeout(() => {
                      document.activeElement.blur();
                      if (startDate) {
                        HandleError(false, 'startDate');
                      } else {
                        HandleError(true, 'startDate');
                      }
                    }, 0);
                  }}
                  onOpen={() => HandleError(false, 'startDate')}
                  onFocus={() => HandleError(false, 'startDate')}
                  onBlur={() => (!startDate ? HandleError(true, 'startDate') : '')}
                />
                {dayType === 'multiple' ? (
                  <CustomDatePicker
                    error={handleError?.endDate}
                    helperText={handleError?.endDate ? 'please select end date' : ''}
                    label="End Date - Required"
                    maxDate={new Date(DateHelper.format(DateHelper.addDays(new Date(), 3)))}
                    required
                    disablePast
                    value={endDate}
                    onChange={(date) => { if (date) { HandleError(false, 'endDate'); setEndDate(date); } else { HandleError(true, 'endDate'); } }}
                    disableToolbar
                    emptyLabel=""
                    onClose={() => {
                      setTimeout(() => {
                        document.activeElement.blur();
                        if (endDate) {
                          HandleError(false, 'endDate');
                        } else {
                          HandleError(true, 'endDate');
                        }
                      }, 0);
                    }}
                    onOpen={() => HandleError(false, 'endDate')}
                    onFocus={() => HandleError(false, 'endDate')}
                    onBlur={() => (!endDate ? HandleError(true, 'endDate') : '')}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          {dayType === 'multiple' && endDate && DateHelper?.dateGaps(startDate, endDate) === 3 ? (
            <Grid item md={12} xs={12} style={{ marginTop: '.5rem' }}>
              <em style={{ color: 'red', fontSize: '15px' }}>
                *if your planned absence is longer than three (3)
                days please contact your Last Time Manager or ARC*
              </em>
            </Grid>
          ) : null}
          <Grid item md={12} xs={12} style={{ marginTop: '1rem' }}>
            <Button variant="contained" color="primary" disabled={!dayType || (dayType === 'single' && !startDate) || (dayType === 'multiple' && (!startDate || !endDate))} onClick={handleSubmit}>Create New Absent Request</Button>
          </Grid>
        </>
      ) : null}
      <Grid item md={12} xs={12}>
        <Divider style={{ margin: '1rem 0' }} />
      </Grid>
    </Grid>
  );
};

export default AbsentRequest;
