import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import Content from "./components/Content/Content";
import { Register } from "./components/Register/Register";

//--------TODO: ti xoa

import Redux_Button from "./components/TestRedux/button";
import Redux_Content from "./components/TestRedux/content";

function Test() {
  return <h1>Test</h1>;
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
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/content" element={<Content />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route
            path="/test_redux"
            element={
              <div>
                <Redux_Content />
                <Redux_Button />
              </div>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
