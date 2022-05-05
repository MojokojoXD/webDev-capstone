// @ts-nocheck
import useAxios from "../../customHooks/useAxios";
import { useState, useReducer } from "react";
import handlerReducer from "../../customHooks/handlerReducer";
import Spinner from "../../misc/Spinner";

export default function Register() {
  const [formInput, dispatch] = useReducer(handlerReducer, initialForm);
  const [next, setNext] = useState(false);
  const [status, setStatus] = useState(ENUM.IDLE);
  const [confirmation, setConfirmation] = useState("");
 
  //custom hook
  const { data, loading, error,serverErr } = useAxios(operation, formInput);
  
  //Derived state
  const errorsObj = getError(formInput, next, confirmation);
  const formIsValid = Object.keys(errorsObj).length === 0;


  if (error) return <h6>Something went wrong</h6>;
  if (loading) return <Spinner/>;
  if (status === ENUM.COMPLETED && !serverErr) return <h2>Account created successfully</h2>;

  const { fname, lname, DOB, email, city, username, password,fractions,decimals,percentages } = formInput;

  const handleChange = (e) => {
    setStatus(ENUM.IDLE);
    operation = 'reset'
    dispatch({
      type: "change",
      id: e.target.id,
      value: e.target.value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (formIsValid) {
      setNext(true);
    } else setStatus(ENUM.NEXT);
  };

  const handleLessons = (e) => {
    e.preventDefault();
    e.target.classList.toggle("added");
    const id = e.target.id;

    dispatch({
      type: "lessons",
      id: id,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(ENUM.SUBMITTING);
    
    if (formIsValid) {
        operation = "register";
        
        setStatus(ENUM.COMPLETED);
      
    } else {
       setStatus(ENUM.SUBMITTED);
    }
  };
 
  return (
    <form onSubmit={handleSubmit}>
      {serverErr && (
        <div className="errors">
          <p>{serverErr}</p>
        </div>
      )}
      {!formIsValid && (status === ENUM.NEXT || status === ENUM.SUBMITTED) && (
        <div className="errors">
          <p>Please fix these issues</p>
          <ul>
            {Object.keys(errorsObj).map((property) => (
              <li key={property}>{errorsObj[property]}</li>
            ))}
          </ul>
        </div>
      )}

      {!next ? (
        <div className="form-bio-info">
          <input
            type={"text"}
            id="fname"
            name="fname"
            placeholder="first name"
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            value={fname}
          />
          <input
            type={"text"}
            id="lname"
            name="lname"
            placeholder="last name"
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            value={lname}
          />
          <input
            type={"date"}
            id="DOB"
            name="DOB"
            placeholder="date of birth"
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            value={DOB}
            pattern="\d{2}-\d{2}-\d{4}"
            min={"2009-01-01"}
            max={"2022-01-01"}
          />
          <input
            type={"email"}
            id="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            value={email}
            required={true}
          />
          <input
            type={"text"}
            id="city"
            name="city"
            placeholder="city"
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            value={city}
          />
          <select id="country" onChange={handleChange}>
            <option value={""} placeholder="country">
              country
            </option>
            {data.map((obj) => {
              const { common } = obj.name;
              return (
                <option key={common} value={common}>
                  {common}
                </option>
              );
            })}
          </select>
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <div className="form-bio-info tab2">
          <input
            type={"text"}
            id="username"
            placeholder="create username"
            onFocus={(e) => e.target.select()}
            onChange={handleChange}
            value={username}
          />
          <input
            type={"password"}
            id="password"
            placeholder="password"
            onFocus={(e) => e.target.select()}
            onChange={handleChange}
            value={password}
          />
          <input
            type={"password"}
            id={"confirmation"}
            placeholder={"confirm password"}
            onChange={(e) => setConfirmation(e.target.value)}
            onFocus={(e) => e.target.select()}
            value={confirmation}
          />
          <p>Select lesson</p>
          <div>
            <button
              onClick={handleLessons}
              id="fractions"
              className={fractions ? "lesson added" : "lesson"}
            >
              Fractions
            </button>
            <button
              onClick={handleLessons}
              id="decimals"
              className={decimals ? "lesson added" : "lesson"}
            >
              Decimals
            </button>
            <button
              onClick={handleLessons}
              id="percentages"
              className={percentages ? "lesson added" : "lesson"}
            >
              Percentages
            </button>
          </div>
          <input
            type={"submit"}
            value="Sign up"
            disabled={status === ENUM.SUBMITTING}
          />
        </div>
      )}
    </form>
  );
}

let operation = "countries";

const ENUM = {
  IDLE: "IDLE",
  NEXT: "NEXT",
  SUBMITTING: "SUBMITTING",
  SUBMITTED: "SUBMITTED",
  RESUBMIT: 'RESUBMIT',
  COMPLETED: "COMPLETED",
};

const initialForm = {
  fname: "",
  lname: "",
  DOB: "",
  email: "",
  city: "",
  country: "",
  username: "",
  password: "",
  fractions: false,
  decimals: false,
  percentages: false,
};

const getError = (inputObj, next, confirmation) => {
  const {
    fname,
    lname,
    DOB,
    email,
    city,
    country,
    username,
    password,
    fractions,
    decimals,
    percentages,
  } = inputObj;

  const errors = {};
  if (!fname) errors.fname = "First name missing";
  if (!lname) errors.lname = "Last name missing";
  if (!DOB) errors.DOB = "Date of birth missing";
  if (!email) errors.email = "Email missing";
  if (!city) errors.city = "City missing";
  if (!country) errors.country = "Country missing";

  

  if (next) {
    if (!fractions && !decimals && !percentages) {
      errors.lesson = "Please select a lesson";
    }

    if (!username) errors.username = "username is missing";

    if (!password) {
      errors.password = "Password missing";
    } else if (password.length < 8 || password.length > 15) {
      errors.password = "Password length should be between 8 and 15 letters";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      errors.password =
        "Password must contain a least one number or letter and no special characters";
    } else if (password !== confirmation) {
      errors.confirmation = "Passwords don't match";
    }
  }
  return errors;
};
