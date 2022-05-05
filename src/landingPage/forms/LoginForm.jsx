import { useState,useEffect } from "react";
import useAxios from "../../customHooks/useAxios";
import { Navigate } from "react-router-dom";


export default function LoginForm(){
    const [operation,setOperation] = useState('')
    const [credentials,setCredentials] = useState({username:'',password:''});
    const{error,loading} = useAxios(operation, credentials);
    const [status, setStatus] = useState(ENUM.IDLE)


    // useEffect(()=> {
    //   if(error)setStatus(ENUM.SUBMITTED)
    // },[error])
    
    const handleFocus = (e) => e.target.select(); 



    const handleSubmit = async(e) => {
        e.preventDefault();
        setStatus(ENUM.SUBMITTING)


        if(!error || status === ENUM.SUBMITTED){
            setOperation(state=>'login')
            setStatus(ENUM.COMPLETED)
        }else{ 
          setCredentials({ username: "", password: "" });
          setStatus(ENUM.SUBMITTED)
        };
    }

    const handleChange = (e) => {
        setStatus(ENUM.IDLE);

        if(error)
        {
            setStatus(ENUM.SUBMITTED);
            setOperation('');
        }
        const {id,value} = e.target;
        setCredentials(state => {
            return {...state,[id]:value}
        })
    }

    

    const {username, password} = credentials;

    if(status === ENUM.SUBMITTING)return <p>Loading</p>
    
    return (
      <form className="login-form" onSubmit={handleSubmit}>
        {error && status === ENUM.COMPLETED && (
          <div className="errors">
            <p>Incorrect username or password</p>
          </div>
        )}
        {!error && status === ENUM.COMPLETED && !loading && (
          <Navigate to="/redirect" replace={true} />
        )}
        <input
          type={"text"}
          id="username"
          onChange={handleChange}
          placeholder="username"
          onFocus={handleFocus}
          value={username}
        />

        <input
          type={"password"}
          id="password"
          onChange={handleChange}
          placeholder="password"
          onFocus={handleFocus}
          value={password}
        />

        <input
          type={"submit"}
          value={"Login"}
          style={
            !credentials.username || !credentials.password || status ===ENUM.COMPLETED ? 
            null : submitLogin
          }
          className={
            !credentials.username || !credentials.password || status ===ENUM.COMPLETED ? 
            null : 'submit-login'
          }
          disabled={
            !credentials.username ||
            !credentials.password ||
            status === ENUM.SUBMITTING
          }
          
        />
      </form>
    );
}


const ENUM = {
    IDLE: "IDLE",
    SUBMITTING: "SUBMITTING",
    SUBMITTED: "SUBMITTED",
    COMPLETED: "COMPLETED"
}


const submitLogin = {
  backgroundColor: "#049DD9",
};