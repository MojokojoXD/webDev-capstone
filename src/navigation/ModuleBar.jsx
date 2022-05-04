// @ts-nocheck
import ModuleButtons from "./ModuleButtons";
import { useState, useEffect } from "react";
import logo from "../landingPage/images/logo.png";


export default function ModuleBar({ modules, getPageNo,displayModule }) {
  const [mo, setMo] = useState("");

  useEffect(() => {
    setMo(modules);
  }, [modules]);


  return (
    <div className="module-bar">
      <div className="module-accordion">
        <h3>Lessons</h3>
        <button onClick={()=>getPageNo({title:'HOME',lesson:''})} style={homeButton}>home</button>
        {
          mo && Object.keys(mo).map(k => {
            return <ModuleButtons key={mo[k].title} title={mo[k].title} content={mo[k].modules} setPageNo={getPageNo} displayModule={displayModule}/>
          })

        }
          <img src={logo} alt={'mojomath logo'}/>
      </div>
    </div>
  );
}



const homeButton ={
    textAlign: 'left',
    height: '35px',
    width: '92%',
    padding: '0 10%',
    marginLeft: '2%',
    fontSize: '16px',
    borderBottom: '5px',
    borderRadius: '5px 5px 0 0',
    border: '1px inset white',
    fontWeight: 'bold'
}