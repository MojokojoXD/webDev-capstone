// @ts-nocheck
import ModuleButtons from "./ModuleButtons";
import { useState, useEffect } from "react";

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
          mo ? (
          //eslint-disable-next-line
            mo.map((el, index) => {
              return (
                <ModuleButtons
                  key={el.lesson}
                  title={el.lesson}
                  content={el.module}
                  setPageNo={getPageNo}
                  displayModule={displayModule}
                />
              );
            })
          ) : null}
      </div>
    </div>
  );
}



const homeButton ={
    textAlign: 'left',
    height: '7%',
    width: '92%',
    padding: '0 10%',
    marginLeft: '2%',
    fontSize: '16px',
    borderBottom: '5px',
    borderRadius: '0',
    border: '1px inset white',
    fontWeight: '500'
}