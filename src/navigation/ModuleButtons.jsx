import { useState, useContext, useEffect } from "react";

export default function ModuleButtons({ title, content, setPageNo }) {
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
            <p onClick={()=>setPageNo({title,content})}>module {content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
