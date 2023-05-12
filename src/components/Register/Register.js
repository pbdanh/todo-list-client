import React from "react";
import "./Register.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Register() {

  const navigation = useNavigate();

  const [noti, setNoti] = useState(" ");

  const [isValidEmail, setIsValidEmail] = useState(true);

  const [registerData, setRegisterData] = useState({
    "firstName": "",
    "lastName": "",
    "email": "",
    "username": "",
    "password": ""
  });

  function doRegiter() {
    if(isValidEmail) {
      axios.post("http://localhost:8080/api/register", registerData)
      .then((res) => {
        setNoti(res.data);
        // console.log("thanh cong");
        // navigation("/");
        if(res.data === "Successful") {
          navigation("/");
        }
      })
    }
    else {
      setNoti("Please retype your email!");
    }
  }

  function changeFirstName(e) {
    // console.log("data");
    // console.log(e.target.value);
    let copyData = {...registerData};
    copyData.firstName = e.target.value;
    setRegisterData(copyData);
    // console.log(registerData);
  }

  function changeLastName(e) {
    let copyData = {...registerData};
    copyData.lastName = e.target.value;
    setRegisterData(copyData);
    // console.log(registerData);
  }

  const validateEmail = (email) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  function changeEmail(e) {
    let copyData = {...registerData};
    copyData.email = e.target.value;
    setRegisterData(copyData);
    if(!validateEmail(e.target.value)) {
      setIsValidEmail(false);
    }
    else {
      setIsValidEmail(true);
    }
    // console.log(registerData);
  }

  function changeUsername(e) {
    let copyData = {...registerData};
    copyData.username = e.target.value;
    setRegisterData(copyData);
    // console.log(registerData);
  }

  function changePassword(e) {
    let copyData = {...registerData};
    copyData.password = e.target.value;
    setRegisterData(copyData);
    // console.log(registerData);
  }

  function registerSubmit(event) {
    event.preventDefault();
  }
  return (
    <div className="formRegister">
      
      <div className="wrapper-register">
    
        <div className="form-box-register">
        <h2>Registeration</h2>
          <form onSubmit={registerSubmit}>
            <div className="input-box-register">
              <input type="text" required onChange={changeFirstName}/>
              <label>Firstname</label>
            </div>
            <div className="input-box-register">
              <input type="text" required onChange={changeLastName}/>
              <label>Lastname</label>
            </div>
            <div className="input-box-register">
              <input type="text" required onChange = {changeEmail} />
              <label>Email</label>
            </div>
            <p className = "email-noti">{isValidEmail ? " " : "Invalid email!"}</p>
            <div className="input-box-register">
              <input type="text" required onChange = {changeUsername} />
              <label>Username</label>
            </div>
            <div className="input-box-register">
              <input type="password" required onChange={changePassword}/>
              <label>Password</label>
            </div>
            <p className="notification">{noti}</p>
            <button type="submit" className="btn" onClick={doRegiter}>
              Sign Up
            </button>
            <div class="login-register">
              <p>
                Already have an account?
                <a href="/" class="register-link">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
