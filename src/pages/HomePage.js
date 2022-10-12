import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserSummery from "../components/UserSummery";
import Spinner from "../components/Spinner";
import ProfileCard from "../components/ProfileCard";
import AddProfile from "./AddProfile";

function HomePage() {
  const [data, setdata] = useState();
  const [profile, setprofile] = useState([]);
  const [status, setstatus] = useState();
  const authToken = window.localStorage.getItem("user");
  const getUser = async () => {
    if (authToken) {
      try {
        const resposne = await fetch("https://profilestore.herokuapp.com/auth/getuser", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          method: "POST",
        });
        const temp = await resposne.json();
        setstatus(temp.error);

        if (temp !== null) {
          setdata(temp.userDetails);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      data === {} ? setdata([]) : setdata(data);
    }
  };

  const getuserProfiles = async () => {
    if (authToken) {
      try {
        const resposne = await fetch(
          "https://profilestore.herokuapp.com/profile/fetchallprofile",
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authToken,
            },
            method: "GET",
          }
        );
        const temp = await resposne.json();

        if (temp !== []) {
          setprofile(temp.profile);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteProfile = async (event) => {
    try {
      const resposne = await fetch(
        `https://profilestore.herokuapp.com/profile/deleteprofile/${event}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          method: "DELETE",
        }
      );
      const temp = await resposne.json();
      console.log(temp.error);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getUser();
      getuserProfiles();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const renderRedirect = () => {
    if (!authToken || status === "Please authenticate using valid token") {
      window.localStorage.clear();
      return <Navigate to="/login" />;
    }
  };

  return (
    <div className="my-2 mx-3">
      {renderRedirect()}
      {data ? (
        <>
          <UserSummery data={data} logout={handleLogout} />
          {/* Show all profiles */}

          <div className="shadow-lg p-3 mb-5 bg-body rounded fs-5 text-secondary d-flex justify-content-between">
            <div>
              Your Profiles &nbsp; <i className="bi bi-card-heading"></i>
            </div>
            {/* Add profile */}
            <AddProfile />
          </div>

          {/* show all profles for the particular users */}
          <div className="row">
            {profile !== [] ? (
              profile.map((e) => {
                return (
                  <div className="col-md-2" key={e._id}>
                    <ProfileCard
                      name={e.name}
                      data={e}
                      deleteProfile={() => handleDeleteProfile(e._id)}
                    />
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div className="pt-5">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default HomePage;
