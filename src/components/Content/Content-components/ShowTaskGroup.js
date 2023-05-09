import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentTaskGroup } from "../../../slice/currentTaskGroupSlice";
import { SetTaskList } from "../../../slice/taskListSlice";
import { RemoveTaskGroupList } from "../../../slice/taskGroupListSlice";
import { SetTaskGroupList } from "../../../slice/taskGroupListSlice";
import "./ShowTaskGroup.css";
import { inactiveCurrentTaskGroup } from "../../../slice/currentTaskGroupSlice";
import { inactiveCurrentTask } from "../../../slice/currentTaskSlice";

export default function ShowTaskGroup() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const taskGroupList = useSelector((state) => state.taskGroupList);
  const currentTaskGroup = useSelector((state) => state.currentTaskGroup)
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/taskGroup", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("axios data");
        console.log(res.data);
        console.log("state data");
        dispatch(SetTaskGroupList(res.data));
      })
      .catch((error) => {
        navigation("/");
      });
  }, []);

  function showTask(name, id) {
    let taskGroup = {
      name: name,
      id: id,
      changeName: true,
      active: false,
    };
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
      dispatch(SetTaskList(res.data));
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
    dispatch(RemoveTaskGroupList(id));
    if(id == currentTaskGroup.id) {
      dispatch(inactiveCurrentTaskGroup());
      dispatch(inactiveCurrentTask());
    }
  }

  return (
    <div className="task-group-holder">
      <ul>
        {taskGroupList.taskGroup.map((taskList) => (
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
    </div>
  );
}
