import Calculator from '../calculator/Calculator';
import Assessments from './Assessments';
import { useState } from 'react';
import {CSSTransition} from 'react-transition-group'

export function Utility({module}){
    const [toggleButton, setToggleButton] = useState(false);

    const getToggleButton = (value) =>{
        setToggleButton(value);
    }

    return(
        <div className="utility">
            <div className='questions'>
                <Assessments module={module.lesson_content_id} getToggleButton={getToggleButton} toggleButton={toggleButton}/>
            </div>

            <CSSTransition
             in={toggleButton}
             timeout={500}
             classNames="calc"
             unmountOnExit
            >
                <div className='calculator-div'>
                    <h3>MojoCalc&trade; <span>Powered by Mojo Inc&reg;</span></h3>
                    <Calculator/>
                </div>
            </CSSTransition>
        </div>
    )
}