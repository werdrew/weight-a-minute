import React from 'react';
import {
  BrowserRouter
} from 'react-router-dom';
import Main from './components/Main';

const today = new Date();

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main
          date={today}/>
      </BrowserRouter>
    </div>
  );
};