import generate from "./generate.js";

const options = (
	e,
	setDisALL,
	setDisARV,
	setDisDEP,
	setText,
	all,
	arv,
	dep,
) => {
	let output
	if (!arv || !dep) {
		return
	} else 
	if (e === "ARV") {
		setDisALL(false);
		setDisARV(true);
		setDisDEP(false);
		output = generate(arv);
		setText(output);
		//console.log(output)
	} else if (e === "DEP") {
		setDisALL(false);
		setDisARV(false);
		setDisDEP(true);
		output = generate(dep);
		setText(output);
	} else if (e === "ALL") {
		setDisALL(true);
		setDisARV(false);
		setDisDEP(false);
		output = generate(all);
		//console.log(all)
		setText(output);
	}
};

export default options;
