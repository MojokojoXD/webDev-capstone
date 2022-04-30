import ModuleButtons from "./ModuleButtons";
import {useState,useEffect} from 'react';

export default function ModuleBar({modules,getPageNo}){

    const [titles,setTitles] = useState('');
    const [mo, setMo] = useState('')

    useEffect(()=>{
        setMo(modules)
    },[modules])

    return (
        <div className="module-bar">
            <div className="module-accordion">
                <h3>Lessons</h3>

                {
                    mo ? mo.map((el,index) =>{
                        return <ModuleButtons key={el.lesson} title={el.lesson} content={el.module} setPageNo={getPageNo}/>
                    }) : <p>loading</p>
                }

            </div>
        </div>
    )
}


