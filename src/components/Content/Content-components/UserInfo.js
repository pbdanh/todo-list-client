import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css";

export default function UserInfo() {
  const navigation = useNavigate();

  const [user, setUser] = useState(""); //se khong can

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data.firstname);
        console.log(res.data);
      })
      .catch((error) => {
        navigation("/");
        console.log(error);
      });
  }, []);

  function logout() {
    window.localStorage.removeItem("token");
    navigation("/");
  }

  return (
    <div className="userInfo">
      <p>Hello  {" "}
        <a href="viewuserinfo">{user}</a> </p>
      <button className="btn-log-out" onClick={logout}>
        Logout  
      </button>
    </div>
  );
}
