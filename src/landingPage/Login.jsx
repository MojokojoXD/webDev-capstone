import UserForms from "./forms/UserForms";
import useLoading from "../customHooks/useLoading";
import Spinner from "../misc/Spinner";

export default function Login(){
    const loading = useLoading();

    return(
        loading ? <Spinner/> : <div className="login">
            <h1>Login</h1>
            <p>Please enter credentials</p>
            <UserForms type={'login'}/>
        </div>
    )
}