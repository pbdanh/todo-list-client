import React from "react";
import "./Register.css";

export function Register() {
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
              <input type="text" required />
              <label>Firstname</label>
            </div>
            <div className="input-box-register">
              <input type="text" required />
              <label>Lastname</label>
            </div>
            <div className="input-box-register">
              <input type="text" required />
              <label>Email</label>
            </div>
            <div className="input-box-register">
              <input type="text" required />
              <label>Username</label>
            </div>
            <div className="input-box-register">
              <input type="text" required />
              <label>Password</label>
            </div>
            <button type="submit" className="btn">
              Login
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
