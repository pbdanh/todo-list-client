import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentTaskGroup } from "../../../slice/currentTaskGroupSlice";
import "./CurrentTaskGroupName.css";

import { UpdateTaskGroupList } from "../../../slice/taskGroupListSlice";

import React from "react";
import axios from "axios";

export default function CurrentTaskGroupName() {
  const dispatch = useDispatch();

  const currentTaskGroup = useSelector((state) => state.currentTaskGroup);

  function handleOnchangeEvent(e) {
    if(currentTaskGroup.changeAble) {
      let payload = { ...currentTaskGroup };
    payload.name = e.target.value;
    // payload.changeName = true;
    dispatch(setCurrentTaskGroup(payload));

    const data = {
      id: currentTaskGroup.id,
      name: e.target.value,
    };

    axios
      .put("http://localhost:8080/api/taskGroup", data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(UpdateTaskGroupList(res.data));
      });
    }
    
  }

  return (
    <div className = "container-task">
      <input
        className="task-group-name"
        type="text"
        value={currentTaskGroup.name}
        onChange={handleOnchangeEvent}
      ></input>
    </div>
  );
}
