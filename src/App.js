import './App.css';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import store from './store/index'

import Graphics from './components/Graphics'

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Graphics} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
