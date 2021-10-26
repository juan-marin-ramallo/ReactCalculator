import { useState } from "react";
import { Button } from "./components/Button";
import { ResultBox } from "./components/ResultBox";
import "./styles.css";

export default function App() {
  const [calc, setCalc] = useState({
    num: 0,
    numtmp: 0,
    sign: "",
    formula: ""
  });

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ["CE", "=", "+", "-", "*", "/"];

  const handleNumber = (digit) => {
    if (
      calc.formula.endsWith("+") ||
      calc.formula.endsWith("-") ||
      calc.formula.endsWith("*") ||
      calc.formula.endsWith("/")
    ) {
      setCalc({
        ...calc,
        num: digit,
        formula: calc.formula.concat(digit)
      });
    } else {
      setCalc({
        ...calc,
        num: calc.num * 10 + digit,
        formula: calc.formula.concat(digit)
      });
    }
  };

  const handleOperator = (operator) => {
    if (operator === "CE") {
      setCalc({
        ...calc,
        numtmp: 0,
        num: 0,
        formula: "",
        sign: ""
      });
    } else {
      if (calc.sign === "") {
        setCalc({
          ...calc,
          numtmp: calc.num,
          num: 0,
          formula: calc.formula.concat(operator),
          sign: operator
        });
      } else {
        let res = 0;
        if (calc.sign === "+") res = calc.numtmp + calc.num;
        if (calc.sign === "-") res = calc.numtmp - calc.num;
        if (calc.sign === "*") res = calc.numtmp * calc.num;
        if (calc.sign === "/") res = calc.numtmp / calc.num;
        if (calc.sign === "=") res = calc.num;

        setCalc({
          ...calc,
          numtmp: res,
          num: res,
          formula:
            operator === "=" ? res.toString() : res.toString().concat(operator),
          sign: operator
        });
      }
    }
  };

  return (
    <div className="App">
      <div className="body">
        <div className="title">
          <h1 className="body">Calculator</h1>
        </div>
        <div className="result-formula">
          <ResultBox caption={calc.formula} />
        </div>
        <div className="result-number">
          <ResultBox caption={calc.num} />
          <hr />
        </div>
        <div className="calculator">
          <div className="single-component">
            {digits.map((digit, index) => (
              <Button key={index} caption={digit} onClick={handleNumber} />
            ))}
          </div>
          <div className="operators">
            {operators.map((operator, index) => (
              <Button key={index} caption={operator} onClick={handleOperator} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
