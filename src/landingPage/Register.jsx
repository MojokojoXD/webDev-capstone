import UserForms from "./forms/UserForms";
import useLoading from "../customHooks/useLoading";
import Spinner from "../misc/Spinner";

export default function Register(){
    const loading = useLoading();


    return(
        loading ? <Spinner/> : <div className="register">
            <h1>Register</h1>
            <p>Ready to learn? then accurately fill out this form. </p>
            <UserForms type={'register'}/>
        </div>
    )
}