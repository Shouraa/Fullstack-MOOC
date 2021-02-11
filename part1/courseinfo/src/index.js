import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  console.log("Props from Header Component", props);
  return <h1>{props.title}</h1>;
};

const Content = (props) => {
  console.log("Props from Content Component", { props });
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  );
};
const Total = (props) => (
  <p>
    Total number of exercises:{" "}
    {props.parts[0].exercises +
      props.parts[1].exercises +
      props.parts[2].exercises}
  </p>
);
const Part = (props) => {
  console.log("Props from Part Component", { props });
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack Application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },

      {
        name: "Using props to pass data",
        exercises: 7,
      },

      {
        name: "State of component",
        exercises: 25,
      },
    ],
  };

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
