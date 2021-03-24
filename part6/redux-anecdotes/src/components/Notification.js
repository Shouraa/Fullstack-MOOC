import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  console.log(props.notification);
  const style = props.notification
    ? {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
      }
    : { display: 'none' };

  return <div style={style}>{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.message,
  };
};

export default connect(mapStateToProps)(Notification);
