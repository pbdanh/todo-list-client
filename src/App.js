import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Content from "./components/Content/Content";
import { Register } from "./components/Register/Register";
import UserInfoView from "./components/UserInfoView/UserInfoView";
import ChangePassword from "./components/UserInfoView/ChangePassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/content" element={<Content />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/viewuserinfo"
            element={
              <div>
                <UserInfoView />
              </div>
            }
          ></Route>
          <Route path = "/changepassword"
            element = {
              <div>
                <ChangePassword/>
              </div>
            }>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
