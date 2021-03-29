import React from 'react';
import { Switch, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import 'semantic-ui-css/semantic.min.css'
import { ContextProvider } from './service/context';
import SearchPage from './pages/SearchPage';

const App: React.FC = () => {
  return (
      <ContextProvider>
        <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/search" component={SearchPage}/>
        </Switch>
      </ContextProvider>
  );
}

export default App;
