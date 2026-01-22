import React, { useState } from "react";

export function TodolistView(props) {
    const [taskName, setTaskName] = useState(""); //taskName är current state och setTaskName används för att uppdatera state

    function handleChangeACB(event) {
        setTaskName(event.target.value);
    }

    function handleAddTaskACB() {
        props.onAddTask({ name: taskName.trim(), complete: false });
        setTaskName("");
         
    }

    return (
        <div className="todolist">
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    value={taskName}
                    onChange={handleChangeACB}
                    placeholder="Add a new task"
                />
                <button onClick={handleAddTaskACB}>Add Task</button>
            </div>
            <ul>
                {props.tasks.map((task, index) => (
                    <li key={index}>
                        <span
                            style={{
                                textDecoration: task.complete ? "line-through" : "none",
                            }}>{task.name}
                        </span>
                        
                        <button onClick={() => props.onRemoveTask(index)}>X</button>
                        {task.complete ? (
                            <button onClick={() => props.onMarkIncomplete(index)}>
                                Mark Incomplete
                            </button>
                        ) : (
                            <button onClick={() => props.onMarkComplete(index)}>
                                Mark Complete
                            </button>
                        )}
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

