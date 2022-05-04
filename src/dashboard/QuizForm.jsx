// @ts-nocheck
import { useState,useEffect } from 'react';
import { GrIndicator } from 'react-icons/gr'
import { FcCheckmark,FcCancel } from 'react-icons/fc';
 

export default function QuizForm({quiz,getToggleButton}){
    const [begin, setBegin] = useState(false);
    const [counter,setCounter] = useState(10);

    const [status, setStatus] = useState(ENUM.IDLE);
    const [radioValue,setRadioValue] = useState('');
    const [index, setIndex] = useState(0)


    useEffect(()=> {
        let timerId;
        if(begin){timerId =setTimeout(()=>
            {   if(status !== ENUM.IDLE ){
                    setCounter(0)
                }else if(status === ENUM.IDLE && counter <= 0){
                    setCounter(0)
                    setStatus(ENUM.SUBMITTED)
                }
                else setCounter(counter - 1)
            },1000)
        }

        return ()=> clearTimeout(timerId);
    })


    useEffect(()=> {
        if(status === ENUM.SUBMITTED){
            getToggleButton(true)
        }else if(status === ENUM.IDLE) getToggleButton(false)
    },[status])


    const handleTryAgain = (e) =>{
        e.preventDefault();
        setCounter(10);
        setStatus(ENUM.IDLE);
        setRadioValue('');
    }

    const handleSubmit = (e,index) => {
        e.preventDefault();
       
        setStatus(ENUM.SUBMITTING)
        
        setCounter(state => 0);
        
        if(radioValue === quiz[index].answer){

            setStatus(ENUM.COMPLETED)
        }else setStatus(ENUM.SUBMITTED)
    }

    const handleQuizNo = (e) => {
        e.preventDefault()
        const {id} = e.target;
        if (index < quiz.length && id === 'Next'){
            setIndex(state => state + 1);
            setCounter(10);
            setStatus(ENUM.IDLE);
        }else{
            setIndex(state => state - 1 );
            setCounter(10);
            setStatus(ENUM.IDLE);
        }
    }


    return (
        begin ? 
                <div  className="quiz-form">


                    <h1>Quiz</h1>


                    <form onSubmit={(e)=>handleSubmit(e,index)} >
                        <p><span style={{marginLeft: '0'}}><GrIndicator/> </span>{quiz[index].question}.</p>
                        <label htmlFor='option1'>
                        <input type={'radio'} id='option1' name='multiChoice' id={quiz[index].option1}
                        onChange={(e)=>setRadioValue(e.target.id)}
                        checked={radioValue === quiz[index].option1}
                        disabled={status === ENUM.COMPLETED || status === ENUM.SUBMITTED}
                        />
                        
                        {quiz[index].option1}
                        </label>
                        {status === ENUM.COMPLETED && radioValue === quiz[index].option1 ? <span><FcCheckmark/></span> : status === ENUM.SUBMITTED && radioValue === quiz[index].option1 ? <span><FcCancel/></span> : null}
                    
                        <br/>

                        <input type={'radio'} id='option2' name='multiChoice' id={quiz[index].option2} onChange={(e)=> setRadioValue(e.target.id)} checked={radioValue === quiz[index].option2}
                            disabled={status === ENUM.COMPLETED || status === ENUM.SUBMITTED}
                        />
                        <label htmlFor='option2'>{quiz[index].option2}</label>

                        {status === ENUM.COMPLETED && radioValue === quiz[index].option2 ? <span><FcCheckmark/></span> : status === ENUM.SUBMITTED && radioValue === quiz[index].option2 ? <span><FcCancel/></span> : null}

                        <br/>


                        <input type={'radio'} id='option3' name='multiChoice' id={quiz[index].option3} onChange={(e)=> setRadioValue(e.target.id)} checked={radioValue === quiz[index].option3} disabled={status === ENUM.COMPLETED || status === ENUM.SUBMITTED}/>
                        <label htmlFor='option3'>{quiz[index].option3}</label>
                        
                        {status === ENUM.COMPLETED && radioValue === quiz[index].option3 ? <span><FcCheckmark/></span> : status === ENUM.SUBMITTED && radioValue === quiz[index].option3 ? <span><FcCancel/></span> : null}

                        <br/>


                        <input type={'radio'} id='option4' name='multiChoice' id={quiz[index].option4} onChange={(e)=>setRadioValue(e.target.id)} checked={radioValue === quiz[index].option4} disabled={status === ENUM.COMPLETED || status === ENUM.SUBMITTED}/>
                        <label htmlFor='option4'>{quiz[index].option4}</label>

                        {status === ENUM.COMPLETED && radioValue === quiz[index].option4 ? <span><FcCheckmark/></span> : status === ENUM.SUBMITTED && radioValue === quiz[index].option4 ? <span><FcCancel/></span> : null}

                        <br/>

                        <h6>Time left: <span style={{color: 'red',marginLeft: '0'}}>{counter}</span> </h6>

                        <div className='form-buttons'>
                            <input type={'submit'} id='Submit' disabled={status === ENUM.SUBMITTING}/>
                            {(quiz.length > 1 && index !== quiz.length - 1) &&<button onClick={(e)=>handleQuizNo(e)} disabled={index === quiz.length - 1}id='Next'>Next</button>}

                            {index > 0 && <button onClick={(e)=>handleQuizNo(e)} id='Prev'>Prev</button>}
                            
                            {status===ENUM.SUBMITTED && <button onClick={handleTryAgain}>Try again</button>}
                            {status===ENUM.COMPLETED && <h5>SUCCESS!</h5>}

                        </div>
                    </form>
                </div>
     : 
        <div style={quizCover}>
            <p style={paragraph}>Let's see how well you remember!
            you'd be given a few seconds to work through each quiz on your own</p>
            <button onClick={()=>setBegin(true)}>Begin</button>
        </div>

            
    )
}




const quizCover = {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    height: '100%',
    flexDirection: 'column',

    paragraph: {
        textAlign: 'center'
    }
}

const {paragraph} = quizCover;


const ENUM = {
    IDLE: 'IDLE',
    SUBMITTING: "SUBMITTING",
    SUBMITTED: "SUBMITTED",
    COMPLETED: "COMPLETED"
}