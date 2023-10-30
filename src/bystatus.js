import options from "./options";

const ByStatus = ( {item} ) => {
    const {
        disALL,
        disARV,
        disDEP,
        text,
		all,
		arv,
		dep,
		setText,
		setDisALL,
		setDisARV,
		setDisDEP,} = item;

	
	return (
		<>
			<select
				className="column-to-hide"
				defaultValue="ALL"
				onChange={(e) => {
					options(
						e.target.value,
						setDisALL,
						setDisARV,
						setDisDEP,
						setText,
						all,
						arv,
						dep,
						true
					)
					
					;
				}}>
				<option value="">Select Status</option>
				<option value="ARV">ARV</option>
				<option value="DEP">DEP</option>
				<option value="ALL">ALL</option>
			</select>
			<div className="viaStatusText">
				{disALL && <div className="ALL">{text}</div>}
				{disARV && <div className="ARV">{text}</div>}
				{disDEP && <div className="DEP">{text}</div>}
			</div>
		</>
	);
};

export default ByStatus;
