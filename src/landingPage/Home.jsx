import { useNavigate } from "react-router-dom";
import {BsDot} from 'react-icons/all'
import useLoading from "../customHooks/useLoading";
import Spinner from "../misc/Spinner";

export default function Home(){
    const navigate = useNavigate();
    const loading = useLoading();

    return (
      loading ? <Spinner/> : <div id="home">
        <h1>LEARNING MADE EASY</h1>
        <p>
          We know how it feels when something doesn’t add up. We’ll help you{" "}
          <br />
          catch up in no time<BsDot style={redDot}/>
          <BsDot style={blackDot}/>
          <BsDot style={blueDot}/>
        </p>
        <button onClick={() => navigate("register", { replace: true })}>
          Get started
        </button>
      </div>
    );
}

const fontSize = '20px';

const dots = {
  redDot: {
    color: "#BF0436",
    fontSize,
    position: 'relative',
    top: "5px"
},
blackDot: {
    color: "black",
    fontSize,
    position: 'relative',
    top: "5px"
  },
  blueDot: {
      color: "#0476D9",
      fontSize,
      position: 'relative',
      top: "5px"
    }
};

const {redDot,blackDot,blueDot} = dots;