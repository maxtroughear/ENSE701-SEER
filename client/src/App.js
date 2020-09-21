import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Container } from 'semantic-ui-react';

import './App.css';

import HeaderBar from './components/HeaderBar';
import SearchFrom from './components/SearchForm';
import SubmitForm from './components/SubmitForm';

function App() {
  return (
    <>
      <Router>
        <HeaderBar />
        <Container>
          <Switch>
            <Route path="/submit">
              <SubmitForm />
            </Route>
            <Route path="/">
              <SearchFrom />
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
