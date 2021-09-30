import { useEffect, useReducer, useRef } from "react";

function reducer(state, action) {
	switch (action.type) {
		case 'reset':
			return { time: 0, isRunning: false }
		case 'start':
			return { ...state, isRunning: true }
		case 'stop':
			return { ...state, isRunning: false }
		case 'tick':
			return { ...state, time: state.time + 1 }
		default:
			break;
	}
}

const initialState = {
	time: 0, 
	isRunning: false
}

export const StopWatch = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const idRef = useRef(0);

	useEffect(() => {

		if(!state.isRunning) {
			return;
		}

		idRef.current = setInterval(() => dispatch({type: 'tick'}), 1000)

		return ()=> {
			console.log("interval cleared");
			clearInterval(idRef.current);
			idRef.current = 0;
		}
	}, [state.isRunning]);

	return (
		<div>
			{state.time} 
			<button onClick={()=> dispatch({type: 'start'})}> start </button>
			<button onClick={()=> dispatch({type: 'stop'})}> stop </button>
			<button onClick={()=> dispatch({type: 'reset'})}> reset </button>
		</div>
	)
}