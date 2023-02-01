import { combineReducers } from "redux";
import { RU, EN } from "./languages";
import { objTimeIndex } from "./dateFunction";
import { defoultLang } from "./languages";


const currentMenu = ( state = 'Videos', action) =>{
  switch(action.type){
    case 'MENU':  return  action.menu ;
    default:  return state;
  }
};

const currentGroup = ( state = 'Default', action) =>{
  switch(action.type){
    case 'GROUP': return action.group ;
    default:  return state;
  }
};

const filterPeriod = ( state = objTimeIndex.wee, action) =>{
  switch(action.type){
    case 'PERIOD': return action.filterPeriod ;
    default:  return state;
  }
};

const language = ( state = RU, action) =>{
  switch(action.type){
    case 'LANGUAGE': return action.language ;
    default:  return state;
  }
};

const videosIsLoading = ( state = true, action) =>{
  switch(action.type){
    case 'LOADING': return action.isLoadingVideo ;
    default:  return state;
  }
};

export const initState = {
  currentMenu: 'Videos',
  currentGroup: 'Default',
  filterPeriod: objTimeIndex.wee,
  language: defoultLang(),
  videosIsLoading: true,
};




export const reducer = combineReducers({
  currentMenu, 
  currentGroup,
  filterPeriod,
  language,
  videosIsLoading
});