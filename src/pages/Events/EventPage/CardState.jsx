import React, { useState } from "react";

function CardState(props) {
	const [cardState, setCardState] = useState({
		cvc: "",
		expiry: "",
		focus: "",
		name: "",
		number: "",
	});

	const handleInputFocus = (e) => {
		console.log(e);
	};

	const handleInputChange = (changedValues, allValues) => {
		const name = Object.keys(changedValues)[0];
		const value = changedValues[name];

		if (cardState.focus != name) {
			setCardState({ ...cardState, [name]: value, focus: name.trim() });
		} else {
			setCardState({ ...cardState, [name]: value });
		}
	};

	return { cardState, handleInputFocus, handleInputChange };
}

export default CardState;
