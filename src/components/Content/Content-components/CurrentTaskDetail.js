import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import React from "react";
import axios from "axios";

import { setCurrentTask } from "../../../slice/currentTaskSlice";
import { UpdateTask } from "../../../slice/taskListSlice";
import './CurrentTaskDetail.css';
export default function CurrenTaskDetail() {
  const dispatch = useDispatch();

  const currentTask = useSelector((state) => state.currentTask);

  function handleOnchangeEvent(e) {
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

  return (
    <div className = "note-task" >
      <textarea className = 'add-note' 
        type="text"
        placeholder="Add note..."
        value={currentTask.note}
        onChange={handleOnchangeEvent}
      ></textarea>
    </div>
  );
}
