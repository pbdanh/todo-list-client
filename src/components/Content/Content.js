import SearchBar from "./Content-components/SearchBar";
import NewTaskGroup from "./Content-components/NewTaskGroup";
import CurrentTaskGroupName from "./Content-components/CurrentTaskGroupName";
import ShowTaskGroup from "./Content-components/ShowTaskGroup";
import UserInfo from "./Content-components/UserInfo";
import CurrentTaskList from "./Content-components/CurrentTaskList";
import CreateNewTask from "./Content-components/CreateNewTask";
import CurrentTaskName from "./Content-components/CurrentTaskName";
import CurrenTaskDetail from "./Content-components/CurrentTaskDetail";
import DeleteTask from "./Content-components/DeleteTask";
import { useSelector } from "react-redux";
import "./Content.css";
import ExitTaskDetail from "./Content-components/ExitTaskDetail";

function TaskShow() {
  const currentTaskGroup = useSelector((state) => state.currentTaskGroup);
  let content;
  if (currentTaskGroup.active && currentTaskGroup.changeAble) {
    content = (
      <div className="task-show">
        <CurrentTaskGroupName />
        <CurrentTaskList />
        <CreateNewTask />
      </div>
    );
  } else {
    if(currentTaskGroup.active) {
      content = (
        <div className="task-show">
          <CurrentTaskGroupName />
          <CurrentTaskList />
        </div>
      );
    } else {
      content = <></>;
    }
    
  }
  return content;
}

function TaskDetailShow() {
  const currentTaskGroup = useSelector((state) => state.currentTaskGroup);
  const currentTask = useSelector((state) => state.currentTask);
  let content;
  if (currentTaskGroup.active && currentTask.active) {
    content = (
      <div className="current-task">
        <div className="exit-task">
          <ExitTaskDetail />
        </div>

        <div className="task-detail">
          <CurrentTaskName />
          <CurrenTaskDetail />
        </div>

        <div className="delete-a-task">
          <DeleteTask />
        </div>
      </div>
    );
  } else {
    content = <></>;
  }
  return content;
}

export default function Content() {
  return (
    <div className="todoapp-work">
      <div className="content-wrapper">
        <UserInfo />
        <SearchBar />
        <ShowTaskGroup />
        <NewTaskGroup />
      </div>
      <TaskShow />
      <TaskDetailShow />
    </div>
  );
}
