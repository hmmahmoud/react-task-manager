import React, { useReducer, useState, useEffect } from "react";
// import "./main.css";

function getInitialState() {
  try {
    const savedTasks = localStorage.getItem("tasks");
    return {
      tasks: savedTasks ? JSON.parse(savedTasks) : [],
    };
  } catch (error) {
    console.error("Error parsing tasks from localStorage:", error);
    return { tasks: [] }; // Default to empty tasks array
  }
}

function taskReducer(state, action) {
  console.log("Current state:", state);
  console.log("Action:", action);

  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state || { tasks: [] }; // Ensure tasks is always defined
  }
}

function TaskManager() {
  const [state, dispatch] = useReducer(taskReducer, getInitialState());
  const [taskText, setTaskText] = useState("");

  console.log("Tasks in state:", state.tasks);

  function addTask() {
    if (taskText.trim()) {
      dispatch({ type: "ADD_TASK", payload: taskText });
      setTaskText(""); // Clear the input field
    }
  }

  function toggleTask(taskId) {
    dispatch({ type: "TOGGLE_TASK", payload: taskId });
  }

  function deleteTask(taskId) {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  }

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    console.log("Saving tasks to localStorage:", state.tasks);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <div className="task-input">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {(state.tasks || []).map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
