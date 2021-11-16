/* eslint-disable no-alert */
import moment from 'moment';

export const Step1Validation = (selectedAbsentReason, fMlaStatus) => {
  if (!selectedAbsentReason) {
    alert('Please select your absent reason', 3000);
    return false;
  }
  if (selectedAbsentReason === 'FMLA - Pending') {
    if (fMlaStatus === '') {
      alert('Please select the FMLA status', 3000);
      return false;
    }
  }
  return true;
};

export const Step2Validation = (selectedDepartment, shiftLocation,
  shiftType, shiftTiming) => {
  if (!selectedDepartment) {
    alert('Please select your department', 3000);
    return false;
  }
  if (!shiftLocation) {
    alert('Please enter your shift location', 3000);
    return false;
  }
  if (!shiftType) {
    alert('Please select your shift type', 3000);
    return false;
  }
  if (!shiftTiming.every(time => time.shiftStartTime)) {
    alert('Please select your shift start time', 3000);
    return false;
  }
  if (!shiftTiming.every(time => time.shiftEndTime)) {
    alert('Please select your shift end time', 3000);
    return false;
  }

  if (
    Reflect.has(shiftTiming[0], 'absenceStartTime') &&
    !shiftTiming[0]["absenceStartTime"].length
  ) {
    alert('Please select your abscence start time', 3000);;
    return false;
  }
  if (
    Reflect.has(shiftTiming[0], 'absenceEndTime') &&
    !shiftTiming[0]["absenceEndTime"].length
  ) {
    alert('Please select your abscence end time', 3000);
    return false;
  }

  // const beginningTime = moment({ h: parseInt(shiftTiming?.startTime?.split(':')?.[0], 10), mma: parseInt(shiftTiming?.startTime?.split(':')?.[2], 10) });
  // const endTime = moment({ h: parseInt(shiftTiming?.endTime?.split(':')?.[0], 10), mma: parseInt(shiftTiming?.endTime?.split(':')?.[2], 10) });
  // if (beginningTime.isAfter(endTime)) {
  //   window.alert('Start Time should be grater than end Time');
  //   return false;
  // }
  // if (beginningTime.isSame(endTime)) {
  //   window.alert('Start Time should be same as end Time');
  //   return false;
  // }

  // if (shiftType === 'partialShift' && !absentTiming?.startTime) {
  //   window.alert('Please select your absent start time');
  //   return false;
  // }
  // if (shiftType === 'partialShift' && !absentTiming?.endTime) {
  //   window.alert('Please select your absent end time');
  //   return false;
  // }
  return true;
};


export const Step3Validation = (phoneNumber, emailConfirm, emailAddress) => {
  if (!phoneNumber) {
    alert('please provide all required field', 3000);
    return false;
  }
  if (emailConfirm === 'yes') {
    if (!emailAddress) {
      alert('Please Enter email address', 3000);
      return false;
    }
  }
  return true;
};

export const alert = (msg, duration) => {
  var el = document.getElementById('alert');
  el.innerHTML = msg;
  el.style.visibility = "visible";
  el.style.opacity = "1";
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transition = "opacity 0.5s"
  }, duration);
}
