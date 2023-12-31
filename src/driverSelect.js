//option react object
import React, { useState } from "react";

function Driver() {
	const drivers = ["Jose", "Freddie", "Jule", "Phoenix","Nick", "Justin", "Jess O"];
	const [driver, setDriver] = useState("");
	const [disDriver, setDisDriver] = useState(true);

	const [disOptions, setDisOptions] = useState(true);

	const [reset, setReset] = useState(false);
	//const [disReset, setDisReset] = useState(false)

	const selectedDriver = (e) => {
		if (e.target.value) {
			setDriver(e.target.value);
			setDisOptions(false);
			setReset(true);
			setDisDriver(true);
		}
	};
	const resetChoice = () => {
		setDriver("");
		setDisOptions(true);
		setReset(false);
		setDisDriver(false);
	};

	const selectDriver = () => {
		return (
			<select
				onChange={(e) => {
					selectedDriver(e);
				}}>
				<option value="">Select Driver</option>
				{drivers.map((driver) => (
					<option value={driver}>{driver}</option>
				))}
			</select>
		);
	};
	return (
		<>
			{disOptions && selectDriver()}
			{disDriver && driver}
			{"     "}
			{reset && <button className = "no-print" onClick={resetChoice}>Reset</button>}
		</>
	);
}

export default Driver;
