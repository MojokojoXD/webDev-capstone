import { useState,useEffect } from "react";
import useAxios from "../customHooks/useAxios";
import QuizForm from "./QuizForm";


export default function Assessments({module,getToggleButton,toggleButton}){
    const [moduleId, setModuleId] = useState(module);
    const {data,loading,error} = useAxios('getQuiz', moduleId);

    useEffect(() => {
        setModuleId(module)
    },[module])


    return(
        <div className="assessments">
            {/* <button onClick={()=> getToggleButton(!toggleButton)}>Calculator</button> */}


            {loading && <p>loading...</p>}
            {error && <p>Quiz is not ready</p>}
            {data && <QuizForm quiz={data} getToggleButton={getToggleButton}/>}
            
        </div>
    )
}