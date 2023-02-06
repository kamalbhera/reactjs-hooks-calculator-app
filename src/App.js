import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import "./App.css";

function App() {

  const [preState, setPreState] = useState('');
  const [currentState, setCurrentState] = useState('');
  const [input, setInput] = useState('0');
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    if (currentState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreState("");
    }

    currentState ? setCurrentState((pre) => pre + e.target.innerText) : setCurrentState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(currentState);
  }, [currentState]);

  useEffect(() => {
    setInput("0");
  }, []);
  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (currentState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(currentState);
      setCurrentState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    let cal;
    switch (operator) {
      case "÷":
        cal = String(parseFloat(preState) / parseFloat(currentState));
        break;
      case "+":
        cal = String(parseFloat(preState) + parseFloat(currentState));
        break;
      case "X":
        cal = String(parseFloat(preState) * parseFloat(currentState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(currentState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurrentState("");
  };

  const minusPlus = () => {
    if (currentState.charAt(0) === "-") {
      setCurrentState(currentState.substring(1));
    } else {
      setCurrentState("-" + currentState);
    }
  };

  const percent = () => {
    preState
      ? setCurrentState(String((parseFloat(currentState) / 100) * preState))
      : setCurrentState(String(parseFloat(currentState) / 100));
  };

  const reset = () => {
    setPreState("");
    setCurrentState("");
    setInput("0");
  };

  return (
    <div className='container'>
      <div className="wrapper">
        <div className="screen">
          {input !== "" || input === "0" ? (
            <NumberFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumberFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <div className="btn light-gray" onClick={reset}>AC</div>
        <div className="btn light-gray plus-minus" onClick={minusPlus}>
          <sup className="plus-sign">+</sup>/<sup className="minus-sign">-</sup>
        </div>
        <div className="btn light-gray" onClick={percent}>%</div>
        <div className="btn orange" onClick={operatorType}>÷</div>
        <div className="btn" onClick={inputNum}>7</div>
        <div className="btn" onClick={inputNum}>8</div>
        <div className="btn" onClick={inputNum}>9</div>
        <div className="btn orange" onClick={operatorType}>x</div>
        <div className="btn" onClick={inputNum}>4</div>
        <div className="btn" onClick={inputNum}>5</div>
        <div className="btn" onClick={inputNum}>6</div>
        <div className="btn orange" onClick={operatorType}>-</div>
        <div className="btn" onClick={inputNum}>1</div>
        <div className="btn" onClick={inputNum}>2</div>
        <div className="btn" onClick={inputNum}>3</div>
        <div className="btn orange" onClick={operatorType}>+</div>
        <div className="btn zero" onClick={inputNum}>0</div>
        <div className="btn" onClick={inputNum}>.</div>
        <div className="btn" onClick={equals}>=</div>
      </div>
    </div>
  );
}

export default App;