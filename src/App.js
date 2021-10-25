import React, { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { ResultBox } from "./components/ResultBox";
import "./styles.css";

export default function App() {
  const [number, setNumber] = useState(0);
  const [numberTemp, setNumberTemp] = useState(0);
  const [operation, setOperation] = useState("");
  const [formula, setFormula] = useState("");

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ["CE", "=", "+", "-", "*", "/"];

  useEffect(() => {
    if (operation === "=") {
      setFormula(number.toString());
    }
  }, [operation, number]);

  const handleNumber = (digit) => {
    setFormula(formula.concat(digit));
    setNumber(number * 10 + digit);
  };

  const handleOperator = (operator) => {
    if (operator === "CE") {
      setNumber(0);
      setNumberTemp(0);
      setOperation("");
      setFormula("");
    } else if (operator === "=") {
      if (operation === "+") setNumber(numberTemp + number);
      if (operation === "-") setNumber(numberTemp - number);
      if (operation === "*") setNumber(numberTemp * number);
      if (operation === "/") setNumber(numberTemp / number);

      setNumberTemp(number);
      setOperation(operator);
    } else {
      setNumber(0);
      setNumberTemp(number);
      setOperation(operator);
      setFormula(formula.concat(operator));
    }
  };

  return (
    <div className="App">
      <div className="body">
        <div className="title">
          <h1 className="body">Calculator</h1>
        </div>
        <div className="result-formula">
          <ResultBox caption={formula} />
        </div>
        <div className="result-number">
          <ResultBox caption={number} />
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
