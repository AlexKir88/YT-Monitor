
const getobjTimeIndex = () => {
  const startToDayTimestamp = new Date().setHours(0,0,0,0); 
  const startDay = new Date(startToDayTimestamp);
  const oneMonthTimestump = startToDayTimestamp - new Date(startDay).setMonth(startDay.getMonth() - 1);
  const oneYearTimestump = startToDayTimestamp - startDay.setFullYear(startDay.getFullYear() - 1);
  const objTimeIndex = {
      min: 1000 * 60,
      hou: 1000 * 60 * 60,
      day: 1000 * 60 * 60 * 24,
      wee: 1000 * 60 * 60 * 24 * 7,
      mon: oneMonthTimestump,
      yea: oneYearTimestump,
  }
  return objTimeIndex;
}

export const objTimeIndex = getobjTimeIndex();
  
export const calkTimeIndex = (timeString) => {
    const arrTime = timeString.split(' ');
    const timeIndex = arrTime[0] * objTimeIndex[arrTime[1].slice(0, 3)];
    return timeIndex;
}