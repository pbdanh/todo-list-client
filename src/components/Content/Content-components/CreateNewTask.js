import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


import axios from "axios";


import { AddNewTask } from "../../../slice/taskListSlice";

import SendIcon from "@mui/icons-material/Send";

export default function CreateNewTask() {


    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState("");
    const currentTaskGroup = useSelector((state) => state.currentTaskGroup)

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
            dispatch(AddNewTask(res.data));
          });
      }

    return (
        <div>
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
    )
}