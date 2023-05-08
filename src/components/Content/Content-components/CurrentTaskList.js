import { useSelector } from "react-redux";
import "./CurrentTaskList.css";
export default function CurrentTaskList() {
  const taskList = useSelector((state) => state.taskList);
  return (
    <div className="task-show">
      <div className="task-group-name"></div>
      <ul>
        {taskList.list.map((task) => (
          <div className="todo-list-li">
            <li>{task.title}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
