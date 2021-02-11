import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = ({ good, bad, neutral }) => {
  let average, positive, displayStats;

  let sum = good + bad + neutral;

  sum === 0 ? (average = 0) : (average = (good - bad) / sum);

  average === 0 ? (positive = "0") : (positive = (good / sum) * 100);

  if (good === 0 && bad === 0 && neutral === 0) {
    displayStats = <p>No feedback given</p>;
  } else {
    displayStats = (
      <div>
        <h2>Statistics</h2>
        <table>
          <Statistic text="good" value={good} />
          <Statistic text="neural" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={sum} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={`${positive}%`} />
        </table>
      </div>
    );
  }

  return displayStats;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (name, setState) => {
    setState(name + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => handleClick(good, setGood)} text="good" />
      <Button
        handleClick={() => handleClick(neutral, setNeutral)}
        text="neutral"
      />
      <Button handleClick={() => handleClick(bad, setBad)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
