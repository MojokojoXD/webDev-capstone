// @ts-nocheck
import Buttons from "./Buttons";

const ops = ['*','+','-','/','(',')','DEL','RESET','Ans','=']

const generateOps = (passOps) =>{
    const jsxOps = ops.map(ops =>
        <Buttons key = {ops+'key'} buttonDisplay = {ops}/>);

    return jsxOps;
}

function Operations({getOps}){
    return(
        <div className="operations">
            {generateOps()}
        </div>
    )
}


export {Operations as default}