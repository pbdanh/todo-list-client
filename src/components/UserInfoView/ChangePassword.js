import "./changePassword.css";
import { useState } from "react";
import axios from "axios";
export default function ChangePassword() {

  const [noti, setNoti] = useState("");

  const [passwordSetting, setPasswordSetting] = useState({
    currentPassword: "",
    changePassword: "",
    confirmPassword: "",
  });
  
  function handleCurrentPassword(e) {
    let temp = {...passwordSetting}
    temp.currentPassword = e.target.value;
    setPasswordSetting(temp);
  }
  function handleChangePassword(e) {
    let temp = {...passwordSetting}
    temp.changePassword = e.target.value;
    setPasswordSetting(temp);
  }
  function handleConfirmPassword(e) {
    let temp = {...passwordSetting}
    temp.confirmPassword = e.target.value;
    setPasswordSetting(temp);
  }
  function submitForm(e) {
    e.preventDefault();
  }
  function submitChangePassword() {
    if(passwordSetting.changePassword.length < 4) {
      setNoti("Password must longer than 4 character!");
    } else {

   
    if(passwordSetting.changePassword == passwordSetting.confirmPassword) {
      const data = {
        "currentPassword":passwordSetting.currentPassword,
        "newPassword":passwordSetting.changePassword,
      }
      // console.log(data);
      axios.put('http://localhost:8080/api/changePassword', data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }).then((res) => {
        setNoti(res.data);
      })
    }
    else {
      setNoti("Confirmation password is not same!")
    }
    // console.log('123');
  }
  }

  return (
    <div className="new-password-view">
      <div className="change-password-wrapper">
        <div className="form-box-register">
          <h2>Change Password</h2>
          <form onSubmit = {submitForm}>
            <div className="input-box">
              <input type="password"
              value = {passwordSetting.currentPassword}
              onChange={handleCurrentPassword}
              required />
              <label>Current Password</label>
            </div>
            <div className="input-box">
              <input type="password"
              value = {passwordSetting.changePassword}
              onChange={handleChangePassword}
              required />
              <label>New Password</label>
            </div>
            <div className="input-box">
              <input type="password" required
              value = {passwordSetting.confirmPassword} 
              onChange = {handleConfirmPassword} />
              <label>Confirm New Password</label>
            </div>
            <p className="notification">{noti}</p>
            <button onClick = {submitChangePassword} type="submit" className="btn">
              Change Password
            </button>
            <div class="login-register">
              <p>
                <a href="/viewuserinfo" className="content">
                  Go Back
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
