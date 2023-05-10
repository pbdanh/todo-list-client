import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DeleteTask as delTaskInTaskList } from "../../../slice/taskListSlice";
import { inactiveCurrentTask } from "../../../slice/currentTaskSlice";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import './DeleteTask.css'
export default function DeleteTask() {
  const currentTask = useSelector((state) => state.currentTask);
  const dispatch = useDispatch();

  function deleteTask() {
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      params: {
        id: currentTask.id,
      },
    };

    axios.delete("http://localhost:8080/api/task", config);
    dispatch(delTaskInTaskList(currentTask.id));
    dispatch(inactiveCurrentTask());
  }

  return (
    <div className = 'delete-button'>
      <button onClick={deleteTask}>
        <DeleteOutlineOutlinedIcon/>
      </button>
    </div>
  );
}
