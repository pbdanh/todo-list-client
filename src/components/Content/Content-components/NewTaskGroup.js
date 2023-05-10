import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddNewTaskGroup } from "../../../slice/taskGroupListSlice";
import "./NewTaskGroup.css";
export default function NewTaskGroup() {
  const [newTaskGroup, setNewTaskGroup] = useState("");
  const dispatch = useDispatch();
  const taskGroupList = useSelector((state) => state.taskGroupList);
  function handleEnterNewTaskGroupName(e) {
    setNewTaskGroup(e.target.value);
  }
  function createTaskGroup() {
    const string = newTaskGroup.trim();
    
    if(string.length === 0) {

    }
    else {
      const newTaskGroupData = {
        name: string,
      };
      axios
        .post("http://localhost:8080/api/taskGroup", newTaskGroupData, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          dispatch(AddNewTaskGroup(res.data));
          console.log(res.data);
          document.getElementById("abc").value = "";
        });
      setNewTaskGroup("");

    }
    
  }

  const handleKeyDown = (event) => {
    // console.log("!!");
    if (event.key === 'Enter') {
      // console.log('do validate')
      createTaskGroup();
    }
  }

  return (
    <div className="add-new-task">
      <div className="input-task">
        <input
          type="text"
          placeholder="Add a new TaskGroup"
          id="abc"
          onChange={handleEnterNewTaskGroupName}
          onKeyDown={handleKeyDown}
        ></input>
      </div>
      <button className="add-task-button" onClick={createTaskGroup} >
        <AddIcon />
      </button>
    </div>
  );
}
