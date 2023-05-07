import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useState } from "react";
export default function NewTaskGroup(props) {
    const{setData} = props;
    const [newTaskGroup, setNewTaskGroup] = useState("");
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
            setData((oldData) => [...oldData, res.data]);
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