import './App.css';
import Header from './Components/header/header';
import Main from './Components/main/main';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {createStorage} from './service functions/serviceFunctions'
import { reducer, initState } from './service functions/StoreRedux';
import { Component } from 'react';
import { sendInTlg } from './service functions/privatData';
// import { send } from './Components/privatData';

export const store = createStore(reducer, initState);
createStorage();

class App extends Component {
  componentDidCatch(err, errInfo) {
    sendInTlg(`/`+ 'error' + '/' + err + '////' + errInfo?.componentStack);
  }
  render() {
    return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Main />
    </div>
    </Provider>
  );
  }
}

// document.onload = () => send('enter');
// document.beforeunload = () => send('exit');

export default App;
