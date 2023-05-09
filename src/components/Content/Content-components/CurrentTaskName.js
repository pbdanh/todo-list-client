import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import React from "react";
import axios from "axios";



import { setCurrentTask } from "../../../slice/currentTaskSlice";
import { UpdateTask } from "../../../slice/taskListSlice";
import { Test } from "../../../slice/taskListSlice";
import { SwitchImportantStatus as swImportantAction } from "../../../slice/taskListSlice";

import { SwitchCurrentTaskCompleteStatus } from "../../../slice/currentTaskSlice";
import { SwitchCurrentTaskImportantStatus } from "../../../slice/currentTaskSlice";

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default function CurrentTaskName() {
  const dispatch = useDispatch();

  const currentTask = useSelector((state) => state.currentTask);

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

  function handleOnchangeEvent(e) {
    let payload = { ...currentTask };
    payload.title = e.target.value;
    dispatch(setCurrentTask(payload));

    const data = {
      id: currentTask.id,
      title: e.target.value,
      taskGroupId: currentTask.taskGroupId,
      complete: currentTask.complete,
      important: currentTask.important,
      note: currentTask.note
    };

    axios
      .put("http://localhost:8080/api/task", data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(UpdateTask(data));
      });
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

  return (
    <div class="curent-task-name">
      <SelectCircleIcon complete = {currentTask.complete} taskId = {currentTask.id} />
      <input
        type="text"
        value={currentTask.title}
        onChange={handleOnchangeEvent}
        
      ></input>
      <SelectStarIcon important = {currentTask.important} taskId = {currentTask.id} />
    </div>
      
   
  );
}
