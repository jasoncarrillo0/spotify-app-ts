import React from 'react';
import { Switch, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import 'semantic-ui-css/semantic.min.css'
function App() {
  return (
    <Switch>
        <Route exact path="/" component={LoginPage}/>
    </Switch>
  );
}

export default App;
