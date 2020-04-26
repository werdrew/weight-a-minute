import React from 'react';
import {
  BrowserRouter
} from 'react-router-dom';
import Main from './components/Main';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </div>
  );
};