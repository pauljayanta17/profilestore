import React from "react";

function Spinner(props) {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">{props.title}</span>
        </div>
      </div>
      <div className={`text-${props.color} text-center my-2 fs-5`}>{props.title}</div>
    </>
  );
}

Spinner.defaultProps={
  title:"Loading",
  color:"danger"
}

export default Spinner;
