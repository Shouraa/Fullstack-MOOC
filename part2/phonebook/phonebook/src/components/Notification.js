import react from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else if (message.toLowerCase().includes("shorter", "deleted")) {
    return <div className="error">{message}</div>;
  } else {
    return (
      <div className="error" style={{ color: "green" }}>
        {message}
      </div>
    );
  }
};

export default Notification;
