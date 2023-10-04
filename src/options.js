import generate from "./generate.js";

const depOptions = (e, setDisALL, setDisARV,setDisDEP, setText, arv,dep, all) => {
    if (e === "ARV") {
        setDisALL(false);
        setDisARV(true);
        setDisDEP(false)

        

        let output = generate(arv)

        setText(output);
        //console.log(output)

    } else if (e === "DEP") {
        setDisALL(false);
        setDisARV(false)
        
        setDisDEP(true)
        
        let output = generate(dep)
        setText(output);
        //console.log(output)

    } else if (e === "ALL") {
        setDisALL(true);
        setDisARV(false);
        setDisDEP(false)

        let output = generate(all)
        //console.log(output)

        setText(output);
    }
};




export default depOptions;