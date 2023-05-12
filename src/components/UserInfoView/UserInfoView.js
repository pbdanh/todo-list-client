import "./UserInfoView.css";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";



export default function UserInfoView() {

  const [noti, setNoti] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

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

    setIsValidEmail(validateEmail(e.target.value));

    let copyUserProfile = {...userProfile};
    copyUserProfile.email = e.target.value;
    setUserProfile(copyUserProfile);
  }

  function updateUserProfile() {
    if(isValidEmail) {
      const data = {
        "firstName": userProfile.firstname,
        "lastName": userProfile.lastname,
        "email":userProfile.email
      }
      // console.log(userProfile);
      axios
      .put("http://localhost:8080/api/user", data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNoti(res.data);
      });
    }
    else {
      setNoti("Please retype email!");
    }
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
                <label>First Name</label>
              </div>
              <div className="space-between"></div>
              <div className="input-box-last">
                <input type="text" required value={userProfile.lastname} onChange = {handleLastName}  />
                <label> Last Name </label>
              </div>
            </div>
            <div className="input-box-fix">
              <input type="text" required value={userProfile.email} onChange = {handleEmail} />
              <label>Email</label>
            </div>
            <p className="email-noti">{isValidEmail ? "" : "Invalid email!"}</p>
            <div className="input-box-fix unchange" >
              <input type="text" required value={userProfile.username} readOnly />
              <label>Username</label>
            </div>
            <p className="notification">{noti}</p>
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
