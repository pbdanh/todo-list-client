import React from "react";
import "./SearchBar.css";
import axios from "axios";

import { SetTaskList } from "../../../slice/taskListSlice";
import { setCurrentTaskGroup } from "../../../slice/currentTaskGroupSlice";
import { useDispatch } from "react-redux";

export default function SearchBar() {

  const dispatch = useDispatch();

  function search(e) {
    let data = {};
  
   
  
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      params: {
        keyword: e.target.value,
      },
    };
    axios.get("http://localhost:8080/api/search",  config)
    .then((res) => {
      // console.log(res.data);
      let currentTaskGroupState = {
        id: 0,
        name: "Search",
        changeAble: false,
        active: true,
      };
      dispatch(setCurrentTaskGroup(currentTaskGroupState));
      dispatch(SetTaskList(res.data));
    })
  }

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." onChange = {search}></input>
    </div>
  );
}
