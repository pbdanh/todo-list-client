import "./UserInfoView.css";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
export default function UserInfoView() {
  const [userProfile, setUserProfile] = useState({
    "username": "",
    "firstname": "",
    "lastname": "",
    "email": "",
  })
  function submitProfile(e) {
    e.preventDefault();
  }
  function handleLastName(e) {
    let copyUserProfile = {...userProfile};
    copyUserProfile.lastname = e.target.value;
    setUserProfile(copyUserProfile);
  }

  function handleFirstName(e) {
    let copyUserProfile = {...userProfile};
    copyUserProfile.firstname = e.target.value;
    setUserProfile(copyUserProfile);
  }

  function handleEmail(e) {
    let copyUserProfile = {...userProfile};
    copyUserProfile.email = e.target.value;
    setUserProfile(copyUserProfile);
  }

  function updateUserProfile() {
    axios
    .put("http://localhost:8080/api/user", userProfile, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
  }

  
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserProfile(res.data);
        

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
                <input required value={userProfile.firstname} onChange = {handleFirstName} />
                <label>Firstname</label>
              </div>
              <div className="space-between"></div>
              <div className="input-box-last">
                <input type="text" required value={userProfile.lastname} onChange = {handleLastName}  />
                <label> Lastname </label>
              </div>
            </div>
            <div className="input-box-fix">
              <input type="text" required value={userProfile.email} onChange = {handleEmail} />
              <label>Email</label>
            </div>
            <div className="input-box-fix">
              <input type="text" required value={userProfile.username} readOnly />
              <label>Username</label>
            </div>
            <button onClick = {updateUserProfile} type="submit" className="change-btn">
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
