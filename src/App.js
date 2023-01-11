import './App.css';
import Header from './Components/header/header';
import Main from './Components/main/main';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import {createStorage} from './Components/serviceFunction'

const initState = {
  currentMenu: 'Videos',
  currentTheme: 'Default',
  //add state period
};


const currentMenu = ( state = 'Videos', action) =>{
  switch(action.type){
    case 'MENU':  return  action.menu ;
    default:  return state;
  }
};

const currentTheme = ( state = 'Default', action) =>{
  switch(action.type){
    case 'THEME': console.log(action.theme); return action.theme ;
    default:  return state;
  }
};

const reduser = combineReducers({
  currentMenu, 
  currentTheme
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
