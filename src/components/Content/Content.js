import SearchBar from "./Content-components/SearchBar";
import NewTaskGroup from "./Content-components/NewTaskGroup";
import CurrentTaskGroupName from "./Content-components/CurrentTaskGroupName";
import ShowTaskGroup from "./Content-components/ShowTaskGroup";
import UserInfo from "./Content-components/UserInfo";
import CurrentTaskList from "./Content-components/CurrentTaskList";
import CreateNewTask from "./Content-components/CreateNewTask";
import "./Content.css";

export default function Content() {
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
