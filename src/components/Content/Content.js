import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Content.css";
import SearchBar from "./SearchBar.js";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from '@mui/icons-material/Add';
import AddIcon from "@mui/icons-material/Add";
export default function Content() {
  const [data, setData] = useState([]);
  const [newTaskGroup, setNewTaskGroup] = useState("");

  const navigation = useNavigate();

  function logout() {
    window.localStorage.removeItem("token");
    navigation("/");
  }

  function getData() {
    console.log(`Bearer ${window.localStorage.getItem("token")}`);
    axios
      .get("http://localhost:8080/api/taskGroup", {
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

  function handleEnterNewTaskGroupName(e) {
    setNewTaskGroup(e.target.value);
  }

  function createTaskGroup() {
    const newTaskGroupData = {
      name: newTaskGroup,
    };
    axios
      .post("http://localhost:8080/api/taskGroup", newTaskGroupData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData((oldData) => [...oldData, res.data]);
        document.getElementById("abc").value = "";
        // setData(data.push(res.data));
      });
    setNewTaskGroup("");
  }

  function deleteTaskGroup(id) {
    // console.log("falsdkfj");

    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      params: {
        id: id,
      },
    };

    console.log(id);
    axios.delete("http://localhost:8080/api/taskGroup", config);
    setData((data) => data.filter((taskGroup) => taskGroup.id != id));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="todoapp-work">
      <div className="content-wrapper">
        <div className="userInfo">
          <p>Pham Ba Danh</p>
          <button className="btn-log-out" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="search-bar">
          <SearchBar />
        </div>

        <ul>
          {data.map((taskList) => (
            <div className="task-with-icon">
              <li>{taskList.name} </li>
              <button
                onClick={() => {
                  deleteTaskGroup(taskList.id);
                }}
                key={taskList.id}
              >
                <DeleteIcon></DeleteIcon>
              </button>
            </div>
          ))}
        </ul>

        <div className="add-new-task">
          <div className="input-task">
            <input
              type="text"
              placeholder="Add a new task"
              id="abc"
              onChange={handleEnterNewTaskGroupName}
            ></input>
          </div>
          <button className="add-task-button" onClick={createTaskGroup}>
            <AddIcon />
          </button>
        </div>
      </div>
      {/* <div className="task-show">
            <div className="task-group-name">
              <h1>saldkfjkdjs</h1>
            </div>
            <ul>
              <li className="task">sdlakfjksdfj</li>
              <li className="task">sdlakfjksdfj</li>
              <li className="task">sdlakfjksdfj</li>
              <li className="task">sdlakfjksdfj</li>
              <li className="task">sdlakfjksdfj</li>
              <li className="task">sdlakfjksdfj</li>
              <li className="task">sdlakfjksdfj</li>
            </ul>
            <input type="text" className="add-task" placeholder="add new task" />
      </div> */}
    </div>
  );
}
