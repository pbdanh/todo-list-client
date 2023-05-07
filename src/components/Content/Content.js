import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Content.css";
import SearchBar from "./SearchBar.js";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import NewTaskGroup from "./NewTaskGroup";
import TaskList from "./TaskList";


import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


import { setCurrentTaskGroup } from "../../slice/currentTaskGroupSlice";




export default function Content() {

  const dispatch = useDispatch();
  const currentTaskGroup = useSelector((state) => state.currentTaskGroup);

  const [data, setData] = useState([]); //task_group
  // const [currentTaskGroup, setCurrentTaskGroup] = useState({
  //   id: "0",
  //   name: "",
  // });
  const [taskName, setTaskName] = useState(""); //se khong can add new task
  const [todo, setTodo] = useState([]); //new reducer
  const [user, setUser] = useState(""); //se khong can
  const navigation = useNavigate(); //new reducer

  function logout() {
    window.localStorage.removeItem("token");
    navigation("/");
  }

  function getData() {
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

  function deleteTaskGroup(id) {
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
    setData((data) => data.filter((taskGroup) => taskGroup.id !== id));
  }
  function showTask(name, id) {
    let taskGroup = {
      name: name,
      id: id,
    };
    // setCurrentTaskGroup(taskGroup);
    dispatch(setCurrentTaskGroup(taskGroup));


    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      params: {
        taskGroupId: id,
      },
    };
    axios.get("http://localhost:8080/api/tasks", config).then((res) => {
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
        document.getElementById("cde").value = "";
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
  }, []);

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

        <NewTaskGroup setData={setData} />
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
