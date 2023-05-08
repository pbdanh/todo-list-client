import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./CurrentTaskList.css";
import axios from "axios";

import { SwitchCompleteStatusById } from '../../../slice/taskListSlice';
import { Test } from "../../../slice/taskListSlice";

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';




export default function CurrentTaskList() {

  const dispatch = useDispatch();

  function SwitchCompleteStatus(taskId) {
  
    let data = {};
  
   
  
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      params: {
        taskId: taskId,
      },
    };
  
    axios.put("http://localhost:8080/api/switchCompleteStatus", data, config);
    dispatch(Test(taskId));
  }
  
  function Abc(props) {
    let content;
    if(props.complete) {
      content = <CheckCircleIcon />
    }
    else {
      content = <CircleOutlinedIcon />
    }
    return(
      <button onClick={() => {
        SwitchCompleteStatus(props.taskId)
      }}>
        {content}
      </button>
    )
  }

  const taskList = useSelector((state) => state.taskList);


  

  return (
    <div className="task-show">
      <div className="task-group-name"></div>
      <ul>
        {taskList.list.map((task) => (
          <div className="todo-list-li">
            <Abc complete = {task.complete} taskId = {task.id} />
            <li>{task.title}</li>
          </div>
        ))}
      </ul>
      <button onClick={() => {
        console.log(taskList.list);
      }}>aaa</button>
    </div>
  );
}
