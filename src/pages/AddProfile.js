import React from "react";
import { useState } from "react";

function AddProfile() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [github, setgithub] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [facebook, setfacebook] = useState("");
  const [twitter, settwitter] = useState("");
  const [projectsLinks, setprojectsLinks] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setstatus] = useState("");
  const [msg, setmsg] = useState("");

  const handleEmailchanged = (event) => {
    setemail(event.target.value);
  };
  const handleNamechanged = (event) => {
    setname(event.target.value);
  };

  const handleAddressChanged = (event) => {
    setaddress(event.target.value);
  };

  const handleCityChanged = (event) => {
    setcity(event.target.value);
  };
  const handlePincodeChanged = (event) => {
    setpincode(event.target.value);
  };
  const handleGithubChanged = (event) => {
    setgithub(event.target.value);
    
  };
  const handleTwitterChanged = (event) => {
    settwitter(event.target.value);
  };
  const handleFacebookChanged = (event) => {
    setfacebook(event.target.value);
  };
  const handleLinkedinChanged = (event) => {
    setlinkedin(event.target.value);
  };
  const handleProjectsLinksChanged = (event) => {
    setprojectsLinks(event.target.value);
  };
  
  const handleAddProfile = async (event) => {
    event.preventDefault();
    if (
      name !== "" &&
      email !== "" &&
      address !== "" &&
      city !== "" &&
      pincode !== "" &&
      github !== "" &&
      linkedin !== "" &&
      facebook !== "" &&
      twitter !== "" &&
      projectsLinks !== ""
    ) {
      setstatus("");
      setLoading(true);
      try {
        const resposne = await fetch(
          "https://profilestore.herokuapp.com/profile/addprofile",
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": window.localStorage.getItem("user"),
            },
            method: "POST",
            body: JSON.stringify({
              name: name,
              email: email,
              address: address,
              city: city,
              pincode: pincode,
              github: github,
              linkedin: linkedin,
              facebook: facebook,
              twitter: twitter,
              projectsLinks: projectsLinks,
            }),
          }
        );
        const data = await resposne.json();
        setstatus(resposne.status);
        resposne.status !== 200
          ? setmsg("something went wrong")
          : setmsg("Profile added successfully");
        if (data) {
          setemail("");
          setname("");
          setaddress("");
          setgithub("");
          setlinkedin("");
          setfacebook("");
          settwitter("");
          setcity("");
          setpincode("");
          setprojectsLinks("");
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="btn bg-secondary bg-gradient text-light"
        data-bs-toggle="modal"
        data-bs-target="#addprofilemodal"
      >
        Add Profile
      </button>

      <div
        className="modal fade modal-xl"
        id="addprofilemodal"
        tabIndex="-1"
        aria-labelledby="addprofilemodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-primary"
                id="addprofilemodalLabel"
              >
                Add New Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row g-3 text-dark fs-6">
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    id="inputPassword4"
                    value={name}
                    onChange={handleNamechanged}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    id="inputEmail4"
                    value={email}
                    onChange={handleEmailchanged}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="example street 12 E"
                    value={address}
                    onChange={handleAddressChanged}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    placeholder="City"
                    onChange={handleCityChanged}
                    value={city}
                  />
                </div>
                {/* <div className="col-md-4">
                  <label htmlFor="inputState" className="form-label">
                    State
                  </label>
                  <select id="inputState" className="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div> */}
                <div className="col-md-2">
                  <label htmlFor="inputZip" className="form-label">
                    Pincode
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={handlePincodeChanged}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Github
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Github Link"
                    id="inputPassword4"
                    value={github}
                    onChange={handleGithubChanged}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Linkedin
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Linkedin link"
                    id="inputPassword4"
                    value={linkedin}
                    onChange={handleLinkedinChanged}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Facebook
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Facebook link"
                    id="inputPassword4"
                    value={facebook}
                    onChange={handleFacebookChanged}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Twitter
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Twitter link"
                    id="inputPassword4"
                    value={twitter}
                    onChange={handleTwitterChanged}
                  />
                </div>
                <div className="col">
                  <label htmlFor="inputPassword4" className="form-label">
                    Projects (complete/ongoing)
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Projects link"
                    id="inputPassword4"
                    value={projectsLinks}
                    onChange={handleProjectsLinksChanged}
                  />
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label className="form-check-label" htmlFor="gridCheck">
                      Share with anyone
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleAddProfile}
                  >
                    {loading ? "Loading.." : "Create Profile"}
                  </button>
                </div>
              </form>
            </div>

            <div className="fs-5">
              <div
                className={`container fs-6 text-${
                  status === 200 ? "success" : "danger"
                }`}
              >
                {msg !== "" ? msg : ""}
              </div>
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

export default AddProfile;
