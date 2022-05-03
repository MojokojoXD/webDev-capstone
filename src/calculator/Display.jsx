function Display({result,displayIn,ans}){
    return (
      <div className="display">
        <div className="computation">
          <span className="display-nums">{displayIn}</span>
          <br />
          <h4 className="display-nums">{result}</h4>
        </div>
        <div className="render-input">
          <p className="display-nums">Ans: {ans}</p>
        </div>
      </div>
    );
}


export default Display