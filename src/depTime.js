import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DepartureTime = ({ de }) => {
	const [depTime, setDepTime] = useState("");
	const [current, setCurrent] = useState(de);

	//console.log(de);
	return (
		<>
			
			{!current && <div>{depTime}</div>}
			{!depTime && (
				<input
					type="text"
					id={uuidv4()}
					onChange={(e) => setCurrent(e.target.value)}
					value={current}
				/>
			)}
			{!depTime && (
				<button
					className="column-to-hide"
					onClick={(e) => {
						setDepTime(current);
						setCurrent();
					}}>
					Save
				</button>
			)}
            <button
				className="column-to-hide"
				onClick={() => {
					setCurrent(de);
					setDepTime();
				}}>
				reset
			</button>
		</>
	);
};

export default DepartureTime;
