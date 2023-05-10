import "./UserInfoView.css";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
export default function UserInfoView() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  function submitProfile(e) {
    e.preventDefault();
  }
  function handleLastName(e) {
    setLastname(e.target.value);
  }

  function handleFirstName(e) {
    setFirstname(e.target.value);
  }
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsername(res.data.username);
        setFirstname(res.data.firstname);
        setLastname(res.data.lastname);
        setEmail(res.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="user-view">
      <div className="user-view-wrapper">
        <div className="form-box-profile">
          <h2>User Profile</h2>
          <form onSubmit={(e) => submitProfile(e)}>
            <div className="full-name">
              <div className="input-box-first">
                <input required value={firstname} onChange = {handleFirstName} />
                <label>Firstname</label>
              </div>
              <div className="space-between"></div>
              <div className="input-box-last">
                <input type="text" required value={lastname} onChange = {handleLastName}  />
                <label> Lastname </label>
              </div>
            </div>
            <div className="input-box-fix">
              <input type="text" required value={email} readOnly />
              <label>Email</label>
            </div>
            <div className="input-box-fix">
              <input type="text" required value={username} readOnly />
              <label>Username</label>
            </div>
            <button type="submit" className="change-btn">
              Change
            </button>
            <div class="login-register">
              <p>
                <a href="changepassword" className="content">
                  Change Password
                </a>
              </p>
              <p>
                <a href="/" className="content">
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
