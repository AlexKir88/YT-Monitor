import './App.css';
import Header from './Components/header/header';
import Main from './Components/main/main';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import {createStorage} from './Components/serviceFunctions'
import { useEffect } from 'react';



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


const initState = {
  currentMenu: 'Videos',
  currentGroup: 'Default',
  filterPeriod: 7
};


const reduser = combineReducers({
  currentMenu, 
  currentGroup,
  filterPeriod
});

const store = createStore(reduser, initState);
createStorage();



function App() {
  useEffect(() => {
    console.log('App')
  },[])
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Main />
    </div>
    </Provider>
  );
}

export default App;
