import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import React, { useEffect } from "react";
import axios from "axios";

import { setCurrentTask } from "../../../slice/currentTaskSlice";
import { UpdateTask } from "../../../slice/taskListSlice";
import './CurrentTaskDetail.css';
export default function CurrenTaskDetail() {
  const dispatch = useDispatch();

  const currentTask = useSelector((state) => state.currentTask);

  function handleOnchangeNoteEvent(e) {
    let payload = { ...currentTask };
    payload.note = e.target.value;
    dispatch(setCurrentTask(payload));

    const data = {
      id: currentTask.id,
      title: currentTask.title,
      taskGroupId: currentTask.taskGroupId,
      complete: currentTask.complete,
      important: currentTask.important,
      note: e.target.value,
      dueDate: currentTask.dueDate
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

    function handleOnchangeDueDateEvent(e) {
      let payload = { ...currentTask };
    payload.dueDate = e.target.value;
    dispatch(setCurrentTask(payload));

    const data = {
      id: currentTask.id,
      title: currentTask.title,
      taskGroupId: currentTask.taskGroupId,
      complete: currentTask.complete,
      important: currentTask.important,
      note: currentTask.note,
      dueDate: e.target.value,
    }
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

    


  return (
    <div className = "note-task" >
      <div className="due-date">
      <p>📆 Due date</p>
      <input className = "select-date" key={currentTask.dueDate} type = "date" defaultValue={currentTask.dueDate}
       onChange={handleOnchangeDueDateEvent} ></input>
      </div>
      <div className="note">
      <textarea className = 'add-note' 
        type="text"
        placeholder="Add note..."
        value={currentTask.note}
        onChange={handleOnchangeNoteEvent}
      ></textarea>
      </div>
      
    </div>
  );
}
