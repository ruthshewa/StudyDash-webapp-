import { observer } from "mobx-react-lite";
import { TodolistView } from "../views/todolistView";

const Todolist = observer(function TodolistRender(props) {

    function addTaskACB(task) {
        console.log("addTaskACB:", task);
        props.model.addTask(task); 
    }

    function removeTaskACB(taskID) {
        props.model.removeTask(taskID); 
    }

    function markTaskAsCompleteACB(taskID) {
        console.log("Marking task as complete:", taskID);
        props.model.markTaskAsComplete(taskID);
    }

    function markTaskAsIncompleteACB(taskID) {
        
        props.model.markTaskAsIncomplete(taskID);
    }

    function setTaskACB(taskID, task) {
        props.model.setTask(taskID, task);
    }

    return (
        <TodolistView
            tasks={props.model.toDoTasks}
            onAddTask={addTaskACB} 
            onRemoveTask={removeTaskACB}
            onMarkComplete={markTaskAsCompleteACB}
            onMarkIncomplete={markTaskAsIncompleteACB}
            onSetTask={setTaskACB}
        />
    );
});

export { Todolist };






