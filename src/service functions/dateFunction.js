import { defoultLang } from "./languages";

const getobjTimeIndex = () => {
  const startToDayTimestamp = new Date().setHours(0,0,0,0); 
  const startDay = new Date(startToDayTimestamp);
  const oneMonthTimestump = startToDayTimestamp - new Date(startDay).setMonth(startDay.getMonth() - 1);
  const treeMonthTimestump = startToDayTimestamp - new Date(startDay).setMonth(startDay.getMonth() - 3);
  const oneYearTimestump = startToDayTimestamp - startDay.setFullYear(startDay.getFullYear() - 1);
  let objsTimeIndex = {};
  objsTimeIndex.EN = {
    min: 1000 * 60,
    hou: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    wee: 1000 * 60 * 60 * 24 * 7,
    mon: oneMonthTimestump,
    mo3: treeMonthTimestump,
    yea: oneYearTimestump,
  };
  objsTimeIndex.RU = {
    мин: 1000 * 60,
    час: 1000 * 60 * 60,
    дне: 1000 * 60 * 60 * 24,
    ден: 1000 * 60 * 60 * 24,
    нед: 1000 * 60 * 60 * 24 * 7,
    мес: oneMonthTimestump,
    ме3: treeMonthTimestump,
    год: oneYearTimestump,
  }
  return objsTimeIndex;
}

export let objTimeIndex = getobjTimeIndex().EN;
const currentLang = defoultLang();  

export const calkTimeIndex = (timeString) => {
  let objTimes = objTimeIndex;
  if (currentLang.id == 'RU') {
    objTimes = getobjTimeIndex().RU;
  }
    const arrTime = timeString.split(' ');
    const timeIndex = arrTime[0] * objTimes[arrTime[1].slice(0, 3)];
    return timeIndex;
}

export const calkTimeIndexFromDate = (dateString) => {
  
  const dateVideo = new Date(dateString);
  let indexTime = new Date() - dateVideo;

  return indexTime;
}