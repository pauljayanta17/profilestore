import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setcnfPassword] = useState("");
  const [name, setname] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setstatus] = useState("");
  const [msg, setmsg] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    if (
      cnfpassword === password &&
      password !== "" &&
      name !== "" &&
      email !== ""
    ) {
      setstatus("");
      setLoading(true);
      try {
        const resposne = await fetch(
          "https://profilestore.herokuapp.com/auth/createuser",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          }
        );
        const data = await resposne.json();
        setstatus(resposne.status);
        resposne.status !== 200
          ? setmsg("something went wrong")
          : setmsg("Register successfully");
        if (data.authToken) {
          setEmail("");
          setPassword("");
          setname("");
          setcnfPassword("");
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    else{
      setmsg("All field must be filled")
    }
  };

  const handleEmailchanged = (event) => {
    setEmail(event.target.value);
  };
  const handleNamechanged = (event) => {
    setname(event.target.value);
  };
  const handlePasswordchanged = (event) => {
    setPassword(event.target.value);
  };
  const handleCnfPasswordchanged = (event) => {
    setcnfPassword(event.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setmsg("");
    }, 1500);
    return () => {
      clearInterval(interval);
    };
  }, [msg]);


  return (
    <center>
      <div
        className="card my-5"
        style={{ width: "18rem", border: "none", marginTop: "3rem" }}
      >
        <form>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#158227"
              fillOpacity="1"
              d="M0,288L34.3,272C68.6,256,137,224,206,181.3C274.3,139,343,85,411,96C480,107,549,181,617,224C685.7,267,754,277,823,240C891.4,203,960,117,1029,112C1097.1,107,1166,181,1234,218.7C1302.9,256,1371,256,1406,256L1440,256L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            ></path>
          </svg>
          <h4 className="mb-4">Create New Account</h4>
          <div className="mb-3">
            <label
              htmlFor="exampleInputName"
              className="form-label float-start"
            >
              <i className="bi bi-person-fill"></i> Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              onChange={handleNamechanged}
              value={name}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label float-start"
            >
              <i className="bi bi-envelope-fill"></i> Email address
            </label>
            <input
              type="email"
              placeholder="Email address"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleEmailchanged}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label float-start"
            >
              <i className="bi bi-key-fill"></i> Password
            </label>
            <input
              type="password"
              placeholder="New Password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handlePasswordchanged}
              value={password}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label float-start"
            >
              <i className="bi bi-key-fill"></i> Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleCnfPasswordchanged}
              value={cnfpassword}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-primary float-start"
              onClick={handleSignup}
            >
              Register
            </button>
            <Link
              to={"/login"}
              type="submit"
              className="btn btn-success float-start"
            >
              Login
            </Link>
          </div>
          <div
            className={`container my-3 text-${
              status === 200 ? "success" : "danger"
            }`}
          >
            {msg !== "" ? msg : ""}
          </div>
          {loading ? <Spinner /> : <></>}
        </form>
      </div>
    </center>
  );
}

export default SignupPage;
