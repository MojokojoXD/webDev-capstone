
import { NavLink } from "react-router-dom";
import { TiArrowRightThick, IoMdLogOut } from "react-icons/all";

const navLinks = [
    {link:'HOME',location: '/'},
    {link:'LOGIN',location: 'login'},
    {link:'REGISTER',location: 'register'}
];


export default function Nav({option,params}){

    
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
                <NavLink to='/logout' className={'link inactive'}>Logout
                </NavLink>
        </div>
    )
}