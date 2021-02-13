import React from "react";

const Course = ({ course }) => {
  const { name, parts } = course;

  const sumOfExercises = parts.reduce(function (sum, part) {
    return sum + part.exercises;
  }, 0);

  return (
    <div>
      <h2>{name}</h2>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <h4>total of {sumOfExercises} exercises</h4>
    </div>
  );
};

export default Course;
