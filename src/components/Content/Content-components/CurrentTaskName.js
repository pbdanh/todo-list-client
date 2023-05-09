import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import React from "react";
import axios from "axios";

import { setCurrentTask } from "../../../slice/currentTaskSlice";
import { UpdateTask } from "../../../slice/taskListSlice";

export default function CurrentTaskName() {
  const dispatch = useDispatch();

  const currentTask = useSelector((state) => state.currentTask);

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

  return (
    
      <input
        type="text"
        value={currentTask.title}
        onChange={handleOnchangeEvent}
      ></input>
   
  );
}
