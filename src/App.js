import './App.css';
import Header from './Components/header/header';
import Main from './Components/main/main';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import {createStorage} from './Components/serviceFunction'

const currentMenu = ( state = 'Videos', action) =>{
  switch(action.type){
    case 'MENU':  return  action.menu ;
    default:  return state;
  }
};

const currentTheme = ( state = 'Default', action) =>{
  switch(action.type){
    case 'THEME':  return action.theme ;
    default:  return state;
  }
};

const filterPeriod = ( state = 1, action) =>{
  switch(action.type){
    case 'PERIOD': console.log(action.filterPeriod); return action.filterPeriod ;
    default:  return state;
  }
};


const initState = {
  currentMenu: 'Videos',
  currentTheme: 'Default',
  filterPeriod: 1
};


const reduser = combineReducers({
  currentMenu, 
  currentTheme,
  filterPeriod
});

const store = createStore(reduser, initState);
createStorage();

function App() {
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
