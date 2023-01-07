import React, { Component } from "react";

function User(props) {
  const user = props.hasUser ? <div>props.username</div> : <div>N.A.</div>;
  return (
    <React.Fragment>
      <div>OK</div>
      {user}
    </React.Fragment>
  );
}

export default User;
