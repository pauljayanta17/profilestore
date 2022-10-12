import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setstatus] = useState("");
  const [msg, setmsg] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const resposne = await fetch("https://profilestore.herokuapp.com/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
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
    } catch (error) {
      console.log(error.code);
    }
  };

  const handleEmailchanged = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordchanged = (event) => {
    setPassword(event.target.value);
  };
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
          <img
            src="https://cdn.pixabay.com/photo/2018/07/25/16/00/art-3561710__340.jpg"
            alt="error"
            className="card-img-top rounded-3 position-relative img-thumbnail"
          />
          <div className="card-body">
            <h5 className="card-title position-absolute top-0 end-0 mx-5 my-5 text-light">
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
