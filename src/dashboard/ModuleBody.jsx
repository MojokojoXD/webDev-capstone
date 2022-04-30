import Dashboard from './Dashboard'
import { useState,useEffect } from 'react';
import Welcome from './Welcome';
import Summary from './Summary';

export default function ModuleBody({displayModule,dashData}){

    const [page,setPage] = useState(displayModule.title)




    return(
        <div className="module-body">
          {
            !displayModule ? <Welcome/> : dashData.map(d => {
                if(d.lesson_name === displayModule.title){
                    return <Summary summary={d}/>
                }else <></>

            })
          }
        </div>
    )
}