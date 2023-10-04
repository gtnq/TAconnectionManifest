import depOptions from "./options";

const ByStatus = ( {item} ) => {
    const {setDisALL,
        setDisARV,
        setDisDEP,
        setText,
        arv,
        dep,
        all,
        disALL,
        disARV,
        disDEP,
        text,} = item;
        
	return (
		<>
			<select
				defaultValue="ALL"
				onChange={(e) => {
					depOptions(
						e.target.value,
						setDisALL,
						setDisARV,
						setDisDEP,
						setText,
						arv,
						dep,
						all
					);
				}}>
				<option value="ARV">ARV</option>
				<option value="DEP">DEP</option>
				<option value="ALL">ALL</option>
			</select>
			<div className="viaStatusText">
				{disALL && <div className="ALL">{text}</div>}
				{disARV && <div className="ARV">{text}</div>}
				{disDEP && <div className="DEP">{text}</div>}
			</div>{" "}
		</>
	);
};

export default ByStatus;
