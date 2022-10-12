import React from "react";

function DetailsShow(props) {
  return (
    <>
      <div className="my-3">
        <span className="container border border-success rounded-top p-1 mx-2 bg-secondary text-light">
          <i className="bi bi-person-circle"></i>&nbsp;Name
        </span>
        <span className="container border border-success rounded-top p-2 bg-warning">
          {props.data.name}
        </span>
      </div>
      <div className=" my-4">
        <span className="container border border-success rounded-top p-1 mx-2 bg-secondary text-light">
          <i className="bi bi-envelope-fill"></i>&nbsp;Email
        </span>
        <span className="container border border-success rounded-top p-2 bg-success text-light">
          {props.data.email}
        </span>
      </div>
        <button className="btn bg-primary bg-gradient mx-2 text-light">
          Edit your profile
        </button>
    </>
  );
}

export default DetailsShow;
