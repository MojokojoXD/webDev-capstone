import { useState } from "react";
import { FaLightbulb,FaRegLightbulb } from 'react-icons/fa'

export default function ModuleButtons({ title, content, setPageNo, displayModule }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-item">
        <div
          className={isActive ? "accordion-title active" : "accordion-title"}
          onClick={() => setIsActive(!isActive)}
        >
          <div>
            <p>
              <span>{isActive ? "-" : "+"}</span>
              {title}
            </p>
          </div>
        </div>
        {isActive && (
          <div className="accordion-content">

          {content.map(c => {

              return <p key={c} onClick={()=>setPageNo({title,module:c})}>

              {displayModule.title === title && displayModule.module === c &&isActive ? <FaLightbulb/> : <FaRegLightbulb/>} 
              module 
              {c}
              </p>
          })}
          </div>
        )}
      </div>
    </div>
  );
}
