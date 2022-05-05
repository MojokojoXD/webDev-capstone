import { NavLink } from "react-router-dom";
import { TiArrowRightThick } from "react-icons/all";
import useAxios from "../customHooks/useAxios";
import { useState } from "react";

const navLinks = [
  { link: "HOME", location: "/" },
  { link: "LOGIN", location: "login" },
  { link: "REGISTER", location: "register" },
];


export default function Nav({ option, params }) {
    const [operation,setOperation] = useState('');
  useAxios(operation);

  const logout = () => {
     setOperation('logout')
  };

  return !params ? (
    <div className="navbar">
      {navLinks.map(({ link, location }) => {
        return (
          <NavLink
            to={location}
            key={link}
            className={({ isActive }) => (isActive ? "link" : "link inactive")}
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <span>
                    <TiArrowRightThick />
                  </span>{" "}
                  {link}
                </>
              ) : (
                link
              )
            }
          </NavLink>
        );
      })}
    </div>
  ) : (
    <div className="navbar">
      <p>Welcome, {params}</p>
      <button
        onClick={() => logout()}
        className={"link inactive"}

        style={logoutStyle}
      >
        Logout
      </button>
    </div>
  );
}


const logoutStyle = {
    backgroundColor: 'none',
    background: 'none',
    width: 'fit-content',
    fontSize: '16px',
    fontWeight: 'bold',
}