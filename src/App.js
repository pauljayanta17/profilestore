import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import About from "./pages/About";
import Spinner from "./components/Spinner";

function App() {
  const [connection, setconnection] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setconnection(window.navigator.onLine);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [connection]);

  return (
    <>
      {connection ? (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </Router>
      ) : (
        <Spinner title="No Internet Connection" />
      )}
    </>
  );
}

export default App;
