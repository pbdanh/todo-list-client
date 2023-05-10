import "./changePassword.css";
import { useState } from "react";
import axios from "axios";
export default function ChangePassword() {
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
    console.log('123');
    const data = {
      "currentPassword":passwordSetting.currentPassword,
      "newPassword":passwordSetting.changePassword,
    }
    console.log(data);
    axios.put('http://localhost:8080/api/changePassword', data, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
  }

  return (
    <div className="new-password-view">
      <div className="change-password-wrapper">
        <div className="form-box-register">
          <h2>Change Password User</h2>
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
              <label>New PassWord</label>
            </div>
            <div className="input-box">
              <input type="password" required
              value = {passwordSetting.confirmPassword} 
              onChange = {handleConfirmPassword} />
              <label>Confirm new password</label>
            </div>
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
