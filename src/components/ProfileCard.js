import React from "react";
import EditProfile from "../pages/EditProfile";
import ShowProfile from "../pages/ShowProfile";

function ProfileCard(props) {

  return (
    <div className="card rounded-4" style={{ width: "12rem", height: "10rem" }}>
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title d-flex justify-content-between">
          <div style={{ width: "7rem" }}>{props.name}</div>
          <div>
            <EditProfile data={props.data} />
          </div>
          <div>
            <i
              className="bi bi-trash2-fill"
              style={{ cursor: "pointer" }}
              onClick={props.deleteProfile}
            ></i>
          </div>
        </h5>

        <ShowProfile data={props.data} />
      </div>
    </div>
  );
}

ProfileCard.defaultProps = {
  name: "Example",
};

export default ProfileCard;
