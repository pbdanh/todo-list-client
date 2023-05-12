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
      content = 
      <div className="circle-icon">
        <CheckCircleIcon />
      </div>
      
    }
    else {
      
      content = 
      <div className="circle-icon">
        <CircleOutlinedIcon />
      </div>
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
      content = 
      <div className="star-icon">
        <StarIcon />
      </div>
      
    }
    else {
      content = 
      <div className="star-icon">
        <StarBorderIcon />
      </div>
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
  
  function RenderDueDate(props) {
   
    if(props.dueDate != null) {
      return (<p>📅 {props.dueDate}</p>);
    }
    return (
      <></>
    );
  }


  return (
    <div className="task-show">
      <div className="task-group-name"></div>
      <ul>
        {taskList.list.map((task) => (
          <div className="todo-list-li">
            <SelectCircleIcon complete = {task.complete} taskId = {task.id} />
            <div className="task-and-duedate" onClick = {() => {SelectTask(task)}}>
              <div className={task.dueDate != null ? 'task-with-due-date' : 'task-without-due-date'}>
                <li className={task.complete ? 'completed-task' : ''}>
                  {task.title} 
                 </li>
              </div>
                
                 <RenderDueDate dueDate = {task.dueDate} />
            </div>
            
            <SelectStarIcon className="star-icon" important = {task.important} taskId = {task.id} />
          </div>
        ))}
      </ul>
    </div>
  );
}
