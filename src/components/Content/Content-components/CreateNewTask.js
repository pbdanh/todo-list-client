import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { AddNewTask } from "../../../slice/taskListSlice";
import SendIcon from "@mui/icons-material/Send";
import "./CreateNewTask.css";

export default function CreateNewTask() {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const currentTaskGroup = useSelector((state) => state.currentTaskGroup);
  function createNewTask() {
    // setTaskName(taskName.trim());
    const string = taskName.trim();
    console.log(dueDate);
    if (string === "") {
    } else {
      const task = {
        title: string,
        taskGroupId: currentTaskGroup.id,
        dueDate: dueDate
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
  }

  const handleKeyDown = (event) => {
    // console.log("!!");
    if (event.key === "Enter") {
      // console.log('do validate')
      // createTaskGroup();
      createNewTask();
    }
  };

  return (
    <div className="add-a-new-task">
      <input
        type="text"
        id="cde"
        placeholder="New task"
        onChange={(event) => {
          setTaskName(event.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <input type = "date" className="date-select" onChange={(event) => {
        setDueDate(event.target.value);
        console.log(event.target.value);
      }}></input>
      <button className="create-new-task-btn" onClick={createNewTask}>
        <SendIcon />
      </button>
    </div>
  );
}
