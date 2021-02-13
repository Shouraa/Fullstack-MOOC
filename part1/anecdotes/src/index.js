import React, { useState } from "react";
import ReactDOM from "react-dom";

const Display = (props) => (
  <div>
    <h2>Anecdote of the day</h2>
    <p>{props.anecdote}</p>
    <p>has {props.vote} votes.</p>
  </div>
);

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const MostVoted = (props) => (
  <div>
    <h2>Anecdote with most votes</h2>
    <p>{props.highestVoted}</p>
  </div>
);

const App = (props) => {
  const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const [ranking, setPoint] = useState(points);
  const [selected, setSelected] = useState(0);

  /* event handlet for selecting next anecdote */

  const selectAnecdote = () => {
    let randomNum = Math.floor(Math.random() * 6);
    setSelected(randomNum);
  };

  /* event handler for vote */

  const handleVote = () => {
    const newPoints = { ...ranking, [selected]: ranking[selected] + 1 };
    setPoint(newPoints);
  };

  /* getting the anecdote with the highest votes */

  const sortedPoints = [];
  let highestVoted = "";

  for (let point in ranking) {
    sortedPoints.push([point, ranking[point]]);
  }

  sortedPoints.sort((a, b) => b[1] - a[1]);

  sortedPoints[0][1] === 0
    ? (highestVoted = "No votes Yet!")
    : (highestVoted = props.anecdotes[parseInt(sortedPoints[0])]);

  return (
    <div>
      <Display anecdote={props.anecdotes[selected]} vote={ranking[selected]} />
      <Button handleClick={selectAnecdote} text="next anecdote" />
      <Button handleClick={handleVote} text="Vote" />
      <MostVoted highestVoted={highestVoted} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
