import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"




export default function CurrentTaskList() {

    const taskList = useSelector((state) => state.taskList)

    return (
        <div>
            <ul>
                {taskList.list.map((task) => (
                    <div className="todo-list-li">
                        <li>{task.title}</li>
                    </div>
                ))}
            </ul>
        </div>
    )
}