import React, { useReducer, useRef } from 'react';
import './TaskList.css'; 

const initialState = {
  tasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        tasks: [...state.tasks, { text: action.payload, visible: true }],
      };
    case 'TOGGLE_TASK':
      return {
        tasks: state.tasks.map((task, index) =>
          index === action.payload ? { ...task, visible: !task.visible } : task
        ),
      };
    default:
      return state;
  }
}

function TaskList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  const handleAddTask = () => {
    const task = inputRef.current.value.trim();
    if (task) {
      dispatch({ type: 'ADD_TASK', payload: task });
      inputRef.current.value = ''; 
    }
  };

  const handleToggleTask = (index) => { 
    dispatch({ type: 'TOGGLE_TASK', payload: index });
  };

  const handleBringFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className="task-list-container">
      <h2 className='Heading'>Task List</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add Task"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTask(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button onClick={() => handleAddTask(inputRef.current.value)}>
          Add Task
        </button>
      </div>
      <ul className="task-list">
        {state.tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div>
              {task.visible ? (
                <span>{task.text}</span>
              ) : (
                <span>Type something</span>
              )}
              <button onClick={() => handleToggleTask(index)}>Toggle</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="bring-focus-button" onClick={handleBringFocus}>
        Bring Focus
      </button>
    </div>
  );
}

export default TaskList;
