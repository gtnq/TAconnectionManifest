import options from "./options";
import filterArvDep from "./arrivalDepart";

const { useState } = require("react");

const ByWeek = ({ byWeeks }) => {
	const {
		text,
		setText,

		disALL,
		disARV,
		disDEP,

		setDisALL,
		setDisARV,
		setDisDEP,

		week,
		weekArv,
		weekDep,

		setWeekArv,
		setWeekDep,
	} = byWeeks;

	const [weekSelected, setWeekSelected] = useState(0);

	console.log(week, "week");
	const selectWeek = (e) => {
		return (
			<select
				onChange={(e) => {
					
                    setWeekArv(filterArvDep(week[e.target.value],true))
                    setWeekDep(filterArvDep(week[e.target.value],false))
					options(
						"ALL",
						setDisALL,
						setDisARV,
						setDisDEP,
						setText,
						week[e.target.value],
                        weekArv,
                        weekDep
                        
					);
                    setWeekSelected(e.target.value);
                    
				}}>
				<option value="">Select Week</option>
				{week.map((week, ind) => (
					<option value={ind}>Week {ind + 1}</option>
				))}
			</select>
		);
	};

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
                        week[weekSelected],
                        weekArv,
                        weekDep
                    )
                }}>
				<option value="">Select Status</option>
				<option value="ARV">ARV</option>
				<option value="DEP">DEP</option>
				<option value="ALL">ALL</option>
			</select>
			{selectWeek()}
			<div className="viaWeekText">
				{disALL && <div className="ALL">{text}</div>}
				{disARV && <div className="ARV">{text}</div>}
				{disDEP && <div className="DEP">{text}</div>}
			</div>
		</>
	);
};
export default ByWeek;
