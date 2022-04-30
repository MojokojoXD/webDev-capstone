import Login from "./LoginForm";
import Register from "./RegisterForm";

export default function UserForms({type}){
    return (
        type === 'login' ? <Login/> : <Register/>
    )
}