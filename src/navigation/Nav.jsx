
import { NavLink } from "react-router-dom";
import { TiArrowRightThick } from "react-icons/all";
import useAxios from "../customHooks/useAxios";
import { authContext } from "../App";
import { useContext } from "react";

const navLinks = [
    {link:'HOME',location: '/'},
    {link:'LOGIN',location: 'login'},
    {link:'REGISTER',location: 'register'}
];

let operation = '';

export default function Nav({option,params}){
    useAxios(operation);
    const resetAuth = useContext(authContext) ;


    const logout = () => {
        operation = 'logout';
        resetAuth(false);
    }

    
    return(
        
       !params ? (<div className="navbar">
                {navLinks.map( ({link,location}) =>{
                    return <NavLink to={location} key={link} className={({isActive})=> isActive ? 'link' : 'link inactive'}>{
                        ({isActive}) => isActive ? <><span><TiArrowRightThick/></span> {link}</> : link
                        
                        }</NavLink>
                })}
        </div>) : 

        <div className="navbar">
                <p>Welcome, {params}</p>
                <NavLink to='/login'
                onClick={logout}
                 className={'link inactive'}>Logout
                </NavLink>
        </div>
    )
}