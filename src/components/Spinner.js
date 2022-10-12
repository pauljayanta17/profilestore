import React from "react";

function Spinner() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className="text-danger text-center my-2 fs-5">Loading</div>
    </>
  );
}

export default Spinner;
