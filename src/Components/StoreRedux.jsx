import { combineReducers } from "redux";
import { RU, EN } from "./languages";

let langBrowser = window.navigator.language;
let defoultLang = () => {
    if (langBrowser.startsWith('ru')) return RU;
    return EN;
}
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

const filterPeriod = ( state = 7, action) =>{
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


export const initState = {
  currentMenu: 'Videos',
  currentGroup: 'Default',
  filterPeriod: 7,
  language: defoultLang()
};


export const reducer = combineReducers({
  currentMenu, 
  currentGroup,
  filterPeriod,
  language
});