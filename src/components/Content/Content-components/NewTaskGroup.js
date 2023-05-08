import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddNewTaskGroup } from "../../../slice/taskGroupListSlice";
export default function NewTaskGroup() {
    
    const [newTaskGroup, setNewTaskGroup] = useState("");
    const dispatch = useDispatch();
    const taskGroupList = useSelector((state) => state.taskGroupList);
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
            console.log("123");
            console.log(res.data);
            dispatch(AddNewTaskGroup(res.data))
            console.log(res.data);
            document.getElementById("abc").value = "";
          });
        setNewTaskGroup("");
      }
    return (
    <div className="add-new-task">
          <div className="input-task">
            <input
              type="text"
              placeholder="Add a new TaskGroup"
              id="abc"
              onChange={handleEnterNewTaskGroupName}
            ></input>
          </div>
          <button className="add-task-button" onClick={createTaskGroup}>
            <AddIcon />
          </button>
        </div>
    )
};