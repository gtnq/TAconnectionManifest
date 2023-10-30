import Allgenerate from "./allgenerate.js";
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
	everything = false
) => {
	console.log(everything)
	let output;
	if (!arv || !dep || !all) {
		return;
	} else if (e === "ARV") {
		setDisALL(false);
		setDisARV(true);
		setDisDEP(false);
		if (everything) {
			output = Allgenerate(arv);
		} else {
			console.log('testarv')
			output = generate(arv);
		}
		setText(output);
		//console.log(output)
	} else if (e === "DEP") {
		setDisALL(false);
		setDisARV(false);
		setDisDEP(true);
		if (everything) {
			output = Allgenerate(dep);
		} else {
			console.log('testarv')
			output = generate(dep);
		}
		setText(output);
	} else if (e === "ALL") {
		setDisALL(true);
		setDisARV(false);
		setDisDEP(false);
		if (everything) {
			output = Allgenerate(all);
		} else {
			output = generate(all);
		}
		//console.log(all)
		setText(output);
	}
};

export default options;
