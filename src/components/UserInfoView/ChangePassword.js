import "./changePassword.css";
import { useState } from "react";
export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function handleCurrentPassword(e) {
    setCurrentPassword(e.target.value);
  }
  function handleChangePassword(e) {
    setChangePassword(e.target.value);
  }
  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }
  return (
    <div className="new-password-view">
      <div className="change-password-wrapper">
        <div className="form-box-register">
          <h2>Change Password User</h2>
          <form>
            <div className="input-box">
              <input type="password"
              value = {currentPassword}
              onChange={handleCurrentPassword}
              required />
              <label>Current Password</label>
            </div>
            <div className="input-box">
              <input type="password"
              value = {changePassword}
              onChange={handleChangePassword}
              required />
              <label>New PassWord</label>
            </div>
            <div className="input-box">
              <input type="password" required
              value = {confirmPassword}
              onChange = {handleConfirmPassword} />
              <label>Confirm new password</label>
            </div>
            <button type="submit" className="btn">
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
