import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Content.css";
import SearchBar from "./Content-components/SearchBar"
import DeleteIcon from "@mui/icons-material/Delete";
import NewTaskGroup from "./Content-components/NewTaskGroup";

import CurrentTaskGroupName from "./Content-components/CurrentTaskGroupName";
import ShowTaskGroup from "./Content-components/ShowTaskGroup";


import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


import { setCurrentTaskGroup } from "../../slice/currentTaskGroupSlice";

import { UpdateTaskGroupList } from "../../slice/taskGroupListSlice";
import { RemoveTaskGroupList } from "../../slice/taskGroupListSlice";
import { SetTaskGroupList } from "../../slice/taskGroupListSlice";
import UserInfo from "./Content-components/UserInfo";
import CurrentTaskList from "./Content-components/CurrentTaskList";
import CreateNewTask from "./Content-components/CreateNewTask";


export default function Content() {

  const dispatch = useDispatch();
  const currentTaskGroup = useSelector((state) => state.currentTaskGroup);
  const taskGroupList = useSelector((state) => state.taskGroupList);

  // const [data, setData] = useState([]); //task_group
  // const [currentTaskGroup, setCurrentTaskGroup] = useState({
  //   id: "0",
  //   name: "",
  // });
   //se khong can add new task
  const [todo, setTodo] = useState([]); //new reducer
  
  const navigation = useNavigate(); //new reducer

 

  

 


  


  

  

  return (
    <div className="todoapp-work">
      <div className="content-wrapper">
        <UserInfo />
        <SearchBar />
        <ShowTaskGroup />
        <NewTaskGroup />
      </div>
      <div className="task-show">
        <CurrentTaskGroupName />
        <CurrentTaskList />
        <CreateNewTask />
      </div>
    </div>
  );
}
