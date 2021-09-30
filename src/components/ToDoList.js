import { useReducer, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const initialState = [
	{
		id: uuidv4(),
		task: "learn React.js",
		completed: false
	}
];

const taskReducer = (state, {type, payload}) => {
	switch (type) {
		case "ADD_TODO":
			return state.concat({
				task: payload,
				id: uuidv4(),
				completed: false
			})
		case "DO_TODO":
			return state.map(item => {
				if(item.id === payload.id) {
					return {...item, completed: true}
				} else {
					return item
				}
			})
		default:
			return state
	}
	// type:
	//ADD_TODO
	//DO_TASK
	//UNDO_TASK  

	// усложнение:
	
	//EDIT_TASK
	//REMOVE_TASK

	// payload: 
	// id,
	// task text

	
}

const filterReducer = (state, {type, payload}) => {
	switch (type) {
		case "ALL":
			return state;
		
		case "COMPLETED": {

		}
		default:
			break;
	}
}

export const TodoList = () => {
	const [state, dispatch] = useReducer(taskReducer, initialState);
	const [filter, setFiter] = useState('ALL');
	const [taskInput, setTaskInput] = useState('');

	const handleInputChange = (e) => {
		setTaskInput(e.target.value);
	}

	const handleSubmit = (event) => {
		if(taskInput) {
			dispatch({type: "ADD_TASK", payload: taskInput})
		}
		setTaskInput("");
		event.preventDefault();
	}

	const handleChangeChexbox = (task) => {
		dispatch({
			type: task.completed ? "UNDO_TASK" : "DO_TASK",
			id: task.id
		})
	}

	const filteredTasks = state.filter(item => {
		if(filter === "ALL") {
			return true
		} 
		if(filter === "COMPLETED" && item.completed) {
			return true
		}
		if(filter === "INCOMPLETE" && !item.completed) {
			return true
		}

		return false;
	})
	
	const showComplete =() => {
		setFiter("COMPLETED")
	}
	
	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={taskInput}
					onChange={handleInputChange}
				/>
				<button type="submit">Add task</button>
			</form>
			<ul>
				{state.map(item => (
					<li>
						<label>
							<input
								type="checkbox"
								checked={item.completed}
								onChange={()=> handleChangeChexbox(item)}
							/>
							item.task
						</label>
					</li>
				))}
			</ul>
		</>
	)
}