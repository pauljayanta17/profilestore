import React from "react";
import DetailsShow from '../components/DetailsShow'
function UserSummery(props) {
  return (
    <>
     
        <button className="btn btn-danger float-end" onClick={props.logout}>
          Logout
        </button>
       <DetailsShow data={props.data}/>
        <br />
        
      
    </>
  );
}

export default UserSummery;
