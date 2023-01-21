import './App.css';
import Header from './Components/header/header';
import Main from './Components/main/main';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {createStorage} from './Components/serviceFunctions'
import { reducer, initState } from './Components/StoreRedux';

const store = createStore(reducer, initState);
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
