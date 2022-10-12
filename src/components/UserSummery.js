import React from "react";
import DetailsShow from '../components/DetailsShow'
function UserSummery(props) {
  return (
    <>
     
       
       <DetailsShow data={props.data} logout={props.logout}/>
        <br />
        
      
    </>
  );
}

export default UserSummery;
