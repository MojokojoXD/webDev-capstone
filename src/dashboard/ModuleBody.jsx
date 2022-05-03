import Welcome from './Welcome';
import Summary from './Summary';
import { CSSTransition } from 'react-transition-group';
import { useState, useEffect } from 'react';
import { Utility } from './Utility';



export default function ModuleBody({displayModule,dashData}){
    const  [transition,setTransition] = useState(false);
    const [ready,setReady] = useState('');
    const [showMessage,setShowMessage] =useState(['']);
    const [classN,setClassN] = useState('');

    useEffect(()=>{

      
      setReady(state => {
        setTransition(false);
        
        if(state !== displayModule)return displayModule;
      })
      
    },[displayModule])
    
    useEffect(()=> {
      setTimeout(()=> {

        if(displayModule.title !== 'HOME'){
          const dataObj = dashData.filter(obj=> displayModule.title === obj.lesson_name)
          setShowMessage(dataObj);

        }

        if(displayModule.title === 'HOME'){
          setClassN('welcome')
        }else setClassN('module-body')


        setTransition(true)
      },300)
        
      },[ready])


     
    return(
      <CSSTransition
        in={transition}
        timeout={500}
        classNames="module"
        unmountOnExit
      >
        
        <div className={classN}>
          
            
              {classN === "welcome" && <Welcome/>}
              {classN !== "welcome" && 
                <>
                  <Summary summary={showMessage[0]}/>
                  <Utility module={showMessage[0]}/>
                </>
  
              }
          </div>
      </CSSTransition>
    )
}