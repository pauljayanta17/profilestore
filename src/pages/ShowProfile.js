import React from "react";
function ShowProfile(props) {
  
  return (
    <>
      <button
        className="btn bg-primary bg-gradient text-light my-2"
        data-bs-toggle="modal"
        data-bs-target={`#showprofile${props.data._id}modal`}
      >
        Show Profile
      </button>

      <div
        className="modal fade modal-xl"
        id={`showprofile${props.data._id}modal`}
        tabIndex="-1"
        aria-labelledby="showprofilemodalLabel"
        aria-hidden="true"
     
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header fs-5 text-bold">
              Profile Details
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5
                className="modal-title text-primary"
                id="showprofilemodalLabel"
              >
                Personal Info
                <div className="container text-success ">
                  <i className="bi bi-person-circle mx-2"></i> Name :{" "}
                  {props.data.name}
                </div>
                <div className="container">
                  <i className="bi bi-envelope-paper-fill mx-2"></i>Email :{" "}
                  {props.data.email}
                </div>
                <div className="container text-danger">
                  <i className="bi bi-geo-alt-fill mx-2"></i> Address :{" "}
                  {props.data.address} &nbsp; &nbsp; City : {props.data.city}
                </div>
                <div className="container text-dark">
                  <i className="bi bi-pin-map mx-2"></i> Pincode :{" "}
                  {props.data.pincode}
                </div>
                Links
                <div className="container fs-6 my-2 d-flex flex-column">
                  <a href={props.data.github} target="_blank">
                    <i className="bi bi-github mx-2"></i>
                    {props.data.github}
                  </a>
                  <a href={props.data.facebook} target="_blank">
                    <i className="bi bi-facebook mx-2"></i>
                    {props.data.facebook}{" "}
                  </a>
                  <a href={props.data.twitter} target="_blank">
                    <i className="bi bi-twitter mx-2"></i>
                    {props.data.twitter}{" "}
                  </a>
                  <a href={props.data.linkedin} target="_blank">
                    <i className="bi bi-linkedin mx-2"></i>
                    {props.data.linkedin}{" "}
                  </a>
                  <a>
                    <i className="bi bi-projector mx-2"></i>
                    {props.data.projectsLinks}
                  </a>
                </div>
              </h5>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowProfile;
