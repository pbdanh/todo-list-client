import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Content.css";
import SearchBar from "./SearchBar.js";
// import AddIcon from '@mui/icons-material/Add';
export default function Content() {
  const [data, setData] = useState([]);

  const navigation = useNavigate();

  function logout() {
    window.localStorage.removeItem("token");
    navigation("/");
  }

  function getData() {
    console.log(`Bearer ${window.localStorage.getItem("token")}`);
    axios
      .get("http://localhost:8080/api/content", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        navigation("/");
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="todoapp-work">
      <div className="content-wrapper">
        <div className="userInfo">
            <p>Pham Ba Danh</p>
            <button onClick={logout}>Logout</button>
        </div>
        
        <div className="search-bar">
          <SearchBar />
        </div>

        <ul>
          {data.map((taskList) => (
            <li key={taskList.id}>{taskList.name}</li>
          ))}
        </ul>

        <div className="add-new-task">
          <input type="text"></input>
        </div>
      </div>
    </div>
  );
}
