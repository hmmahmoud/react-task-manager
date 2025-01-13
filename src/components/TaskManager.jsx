import React, { useReducer, useState} from "react";


const initialState = { tasks: [], };
function taskReducer( state, action) {
    console.log( state, action);
    switch (action.type) {
        case "ADD_TASK": 
            console.log("Reducer Action:", action); // Debugging
            return {
                ...state,
                tasks: [...state.tasks, {id: Date.now(), text: action.payload, completed: false}
                ],
            };
        
        
        case "TOGGLE_TASK": 
            return {
                ...state,
                tasks: state.tasks.map((task) => 
                    task.id === action.payload ? { ...task, completed: !task.completed} : task
                )
            };


        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => 
                    task.id !== action.payload)
            };
        
        default: return state;
        
        }
    }

    function TaskManager() {

        const [state, dispatch] = useReducer(taskReducer, initialState);
        const [taskText, setTaskText] = useState("");

        function addTask() {
            if(taskText.trim()) {
                console.log("Task Text:", taskText);
                dispatch({type: "ADD_TASK", payload: taskText})
                setTaskText("");
            }
                
        }

        function handleChange (e) {
            setTaskText(e.target.value);
        }

        function toggleTask(taskID) {
            dispatch({type: "TOGGLE_TASK", payload: taskID});
        }

        function deleteTask(taskID) {
            dispatch({type: "DELETE_TASK", payload: taskID});
        }


        console.log("Tasks State:", state.tasks);

        return (
            <div className="task-manager">
                <h1> Task MAnager</h1>
                <div className="task-input">
                    <input onChange={handleChange} type="text" value={taskText} placeholder="Enter a new task" />
                    <button onClick={addTask}>Add task</button>
                </div>
                <ul className="task-list">
                    {state.tasks.map((task) => (
                        <li key={task.id} className={task.completed ? "completed" : ""}>
                            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </li> 
                    ))}
                </ul>
            </div>
        )

 

    }

    export default TaskManager;


