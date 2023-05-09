import "./changePassword.css";

export default function ChangePassword() {
  return (
    <div className="new-password-view">
      <div className="change-password-wrapper">
        <div className="form-box-register">
          <h2>Change Password User</h2>
          <form>
            <div className="input-box">
              <input type="password" required />
              <label>Current Password</label>
            </div>
            <div className="input-box">
              <input type="password" required />
              <label>New PassWord</label>
            </div>
            <div className="input-box">
              <input type="password" required />
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
