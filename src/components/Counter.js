import { useReducer, useState } from "react"

function reducer (state, action) {
	switch (action.type) {
		case 'increment': 
			return {count: state.count + 1, clickCounter: state.clickCounter + 1}
		case 'decrement':
			return {count: state.count -1, clickCounter: state.clickCounter + 1 }
		default:
			// подумать что можно вернуть отсюда
			break;
	}
}

export const Counter = () => {

	const [state, dispatch] = useReducer(reducer, {count: 0, clickCounter: 0});

	// const [counter] = useState(0);
	// const [clickCounter, setClickCounter] =  useState(0);

	// function increment () {
	// 	///////
	// 	handleButtonPress();
	// }
	// function handleButtonPress () {
	// 	setClickCounter()
	// }

	// function decrement() {
	// 	// /////
	// 	handleButtonPress()
	// }

	return(
		<div>	
			<p>Count: {state.count}</p>
			<p>Button pressed {state.clickCounter} times </p>
			<button onClick={()=> dispatch({type: 'increment'})}>+</button>
			<button onClick={()=> dispatch({type: 'decrement'})}>-</button>
		</div>
	)
}