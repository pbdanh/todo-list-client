import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./CurrentTaskList.css";
import axios from "axios";
import { SwitchCompleteStatusById } from '../../../slice/taskListSlice';
import { Test } from "../../../slice/taskListSlice";
import { SwitchImportantStatus as swImportantAction } from "../../../slice/taskListSlice";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { SwitchCurrentTaskCompleteStatus } from "../../../slice/currentTaskSlice";
import { SwitchCurrentTaskImportantStatus } from "../../../slice/currentTaskSlice";

import { setCurrentTask } from "../../../slice/currentTaskSlice";

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
    dispatch(SwitchCurrentTaskCompleteStatus(taskId));

  }

  function SwitchImportantStatus(taskId) {
  
    let data = {};
  
   
  
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      params: {
        taskId: taskId,
      },
    };
  
    axios.put("http://localhost:8080/api/switchImportantStatus", data, config);
    dispatch(swImportantAction(taskId));
    dispatch(SwitchCurrentTaskImportantStatus(taskId));
  }

  function SelectCircleIcon(props) {
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

  function SelectStarIcon(props) {
    let content;
    if(props.important) {
      content = <StarIcon />
    }
    else {
      content = <StarBorderIcon />
    } 
    return(
      <button onClick={() => {
        SwitchImportantStatus(props.taskId)
      }}>
        {content}
      </button>
    )
  }

  const taskList = useSelector((state) => state.taskList);


  function SelectTask(task) {
    dispatch(setCurrentTask(task));

  }
  

  return (
    <div className="task-show">
      <div className="task-group-name"></div>
      <ul>
        {taskList.list.map((task) => (
          <div className="todo-list-li">
            <SelectCircleIcon complete = {task.complete} taskId = {task.id} />
            <li className={task.complete ? 'completed-task' : ''}
              onClick = {() => {SelectTask(task)}}>
                {task.title} 
            </li>
            <SelectStarIcon important = {task.important} taskId = {task.id} />
          </div>
        ))}
      </ul>
    </div>
  );
}
