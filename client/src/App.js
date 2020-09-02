import React from 'react';
import { Container } from 'semantic-ui-react';

import './App.css';

import HeaderBar from './components/HeaderBar';
import SearchFrom from './components/SearchForm';

import HelloWorld from './HelloWorld';

function App() {
  return (
    <>
      <HeaderBar />
      <Container>
        <SearchFrom />
      </Container>
    </>
  );
}

export default App;
