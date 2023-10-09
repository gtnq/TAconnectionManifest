import Calendar from "react-calendar";
import options from "./options";
import React, { useState, useEffect } from "react";
import filterArvDep from "./arrivalDepart";

const ByDate = ({ byDates }) => {
	const [today, setToday] = useState(0);
	const [month, setMonth] = useState(0);

	const {
		text,
		setText,

		disALL,
		disARV,
		disDEP,

		setDisALL,
		setDisARV,
		setDisDEP,

		byDate,
		byDateARV,
		byDateDEP,

		setbyDateARV,
		setbyDateDEP,
	} = byDates;

	let minDate = new Date(byDate[0].date);
	//let maxDate = new Date(byDate[byDate.length - 1].date)
	//console.log(minDate);

	const selectstatus = (e) => {
		let day;
		if (month !== minDate.getMonth()) {
			day = byDate.length - 1;
		} else {
			day = today;
		}
		options(
			e.target.value,
			setDisALL,
			setDisARV,
			setDisDEP,
			setText,
			byDate[day].flights,
			filterArvDep(byDate[day].flights, true),
			filterArvDep(byDate[day].flights, false)
		);
	};

	const checkDate = (e) => {
		//setToday(e.getDate())
		//console.log(e.getDate())

		//include first day of the next month
		if (e.getMonth() === minDate.getMonth() + 1 && e.getDate() === 1) {
			if (byDate[byDate.length - 1])
			{console.log("nov 1");
			setbyDateARV(filterArvDep(byDate[byDate.length - 1].flights, true));
			setbyDateDEP(
				filterArvDep(byDate[byDate.length - 1].flights, false)
			);
			console.log(byDateARV);
			options(
				"ALL",
				setDisALL,
				setDisARV,
				setDisDEP,
				setText,
				byDate[byDate.length - 1].flights,
				byDateARV,
				byDateDEP
			)}
			else {
				alert("flights not recorded");
			}
		} else if (e.getMonth() === minDate.getMonth()) {
			if (byDate[e.getDate() - 1]) {
				setbyDateARV(
					filterArvDep(byDate[e.getDate() - 1].flights, true)
				);
				setbyDateDEP(
					filterArvDep(byDate[e.getDate() - 1].flights, false)
				);
				options(
					"ALL",
					setDisALL,
					setDisARV,
					setDisDEP,
					setText,
					byDate[e.getDate() - 1].flights,
					byDateARV,
					byDateDEP
				);
			} else {
				alert("flights not recorded");
			}
		} else {
			alert("flights not recorded");
		}
		setToday(e.getDate() - 1);
		setMonth(e.getMonth());
		//console.log(today)
	};
	//console.log(byDate, "test");

	return (
		<>
			<select
				defaultValue="ALL"
				onChange={(e) => {
					selectstatus(e);
				}}>
				<option value="">Select Status</option>
				<option value="ARV">ARV</option>
				<option value="DEP">DEP</option>
				<option value="ALL">ALL</option>
			</select>
			<Calendar
				activeStartDate={minDate}
				calendarType="gregory"
				onClickDay={(e) => {
					checkDate(e);
				}}
			/>
			<div className="viaDateText">
				{disALL && <div className="ALL">{text}</div>}
				{disARV && <div className="ARV">{text}</div>}
				{disDEP && <div className="DEP">{text}</div>}
			</div>
		</>
	);
};

export default ByDate;
