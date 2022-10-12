import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setstatus] = useState("");
  const [msg, setmsg] = useState("");
  const [loading, setloading] = useState(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    if (email !== "" && password !== "") {
      try {
        setloading(true);
        const resposne = await fetch(
          "https://profilestore.herokuapp.com/auth/login",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );
        const data = await resposne.json();
        setstatus(resposne.status);
        resposne.status !== 200
          ? setmsg("something went wrong")
          : setmsg("Login successfully");

        if (data.authToken) {
          window.localStorage.setItem("user", data.authToken);
          setEmail("");
          setPassword("");
        }
        setloading(false);
      } catch (error) {
        console.log(error.code);
      }
    } else {
      setmsg("Email and Password can not be empty");
    }
  };

  const handleEmailchanged = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordchanged = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setmsg("");
    }, 1500);
    return () => {
      clearInterval(interval);
    };
  }, [msg]);

  const renderRedirect = () => {
    const authToken = window.localStorage.getItem("user");
    if (authToken) {
      return <Navigate to="/" />;
    }
  };
  return (
    <>
      {renderRedirect()}

      <div className="mx-auto my-3" style={{ width: "25rem" }}>
        <div className="card" style={{ width: "25rem", border: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#881ad9" fillOpacity="1" d="M0,224L48,202.7C96,181,192,139,288,122.7C384,107,480,117,576,144C672,171,768,213,864,197.3C960,181,1056,107,1152,96C1248,85,1344,139,1392,165.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
          <div className="card-body">
            <h5 className="card-title text-center py-2 text-dark">
              Login To Account
            </h5>
            <div className="container">
              <form>
                <div className="mb-3 input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={handleEmailchanged}
                    value={email}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-key-fill"></i>
                  </span>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={handlePasswordchanged}
                    value={password}
                  />
                </div>

                <div
                  className="d-flex justify-content-between"
                  onClick={handleLogin}
                >
                  <button className="btn btn-primary">Login</button>
                  <Link to="/signup" className="btn btn-success">
                    Create Account
                  </Link>
                </div>
              </form>
              {loading ? <Spinner /> : <></>}
            </div>
          </div>
          <div
            className={`container my-2 text-center text-${
              status === 200 ? "success" : "danger"
            }`}
          >
            {msg !== "" ? msg : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
