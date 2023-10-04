import Calendar from "react-calendar";
import options from "./options";
import React, { useState, useEffect } from "react";


const ByDate = ({ byDates }) => {
    const [today, setToday] = useState();

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

	const checkDate = (e) => {
		//setToday(e.getDate())
        //console.log(e.getDate())
		
		//include first day of the next month
		if (e.getMonth() === (minDate.getMonth() + 1) && e.getDate() === 1) {
			setbyDateARV(
				byDate[e.getDate() - 1].flights.filter((item) => item.dep === true)
			);
			setbyDateDEP(
				byDate[e.getDate() - 1].flights.filter((item) => item.dep === false)
			);
            options("ALL", setDisALL, setDisARV, setDisDEP, setText, byDate[e.getDate() - 1].flights, byDateARV, byDateDEP)
		} else if (e.getMonth() === minDate.getMonth()) {
			setbyDateARV(
				byDate[e.getDate() - 1].flights.filter((item) => item.dep === true)
			);
			setbyDateDEP(
				byDate[e.getDate() - 1].flights.filter((item) => item.dep === false)
			);
            options("ALL", setDisALL, setDisARV, setDisDEP, setText, byDate[e.getDate() - 1].flights, byDateARV, byDateDEP)

		} else {
			alert("flights not recorded");
		}
        setToday(e.getDate()-1)
        console.log(today)
	};
    console.log(today, 'test')

	return (
		<>
			<select
				defaultValue="ALL"
				onChange={(e) => {
					options(
						e.target.value,
						setDisALL,
						setDisARV,
						setDisDEP,
						setText,
						byDate[today].flights,
						byDateARV,
						byDateDEP
					);
				}}>
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
