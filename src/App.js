import logo from './logo.svg';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import Content from './components/Content/Content';

function Test() {
  return (
    <h1>Test</h1>
  )
}

function App() {

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            
          </Route>
            <Route path='/content' element={<Content />}>
              
            </Route>
        </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
