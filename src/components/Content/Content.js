import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Content.css";
import SearchBar from "./SearchBar.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
export default function Content() {
  const [data, setData] = useState([]);
  const [newTaskGroup, setNewTaskGroup] = useState("");
  const [currentTaskGroup, setCurrentTaskGroup] = useState({
    id: "0",
    name: "",
  });
  const [taskName, setTaskName] = useState("");
  const [todo, setTodo] = useState([]);
  const [user, setUser] = useState("");
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
  function showTask(name, id) {
    // console.log(name);
    // console.log(id);

    let taskGroup = {
      name: name,
      id: id,
    };
    setCurrentTaskGroup(taskGroup);

    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },

      params: {
        taskGroupId: id,
      },
    };

    axios.get("http://localhost:8080/api/tasks", config).then((res) => {
      // console.log(res.data);
      setTodo(res.data);
    });
  }

  function createNewTask() {
    const task = {
      title: taskName,
      taskGroupId: currentTaskGroup.id,
    };
    axios
      .post("http://localhost:8080/api/task", task, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // setData((oldData) => [...oldData, res.data]);
        document.getElementById("cde").value = "";
        // setData(data.push(res.data));
        setTaskName("");
        setTodo((oldData) => [...oldData, res.data]);
      });
  }

  useEffect(() => {
    getData();
    axios
      .get("http://localhost:8080/api/user", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data.firstname + " " + res.data.lastname);
        console.log(res.data);
      })
      .catch((error) => {
        navigation("/");
      });
  }
  , []);

  return (
    <div className="todoapp-work">
      <div className="content-wrapper">
        <div className="userInfo">
          <p>Hello {user}</p>
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
              <li
                onClick={() => {
                  showTask(taskList.name, taskList.id);
                }}
              >
                {taskList.name}{" "}
              </li>
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
      <div className="task-show">
        <div className="task-group-name">
            <h1>{currentTaskGroup.name}</h1>
        </div>
        <ul>
          {todo.map((taskList) => (
            <div className="todo-list-li">
              <li>{taskList.title} </li>
            </div>
          ))}
        </ul>
        <div className="add-a-new-task">
          <input
            type="text"
            id="cde"
            placeholder="New task"
            onChange={(event) => {
              setTaskName(event.target.value);
              // console.log(taskName);
            }}
          />
          <button className="create-new-task-btn" onClick={createNewTask}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
