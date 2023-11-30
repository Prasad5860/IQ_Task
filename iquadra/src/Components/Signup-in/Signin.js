import React from "react";
import "./signup.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const [eye, setEye] = useState("fa-eye-slash");
  const [loginDetails, setLoginDetails] = useState({});
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const passwordIconChange = () => {
    if (eye === "fa-eye") setEye("fa-eye-slash");
    else setEye("fa-eye");
    if (document.getElementById("password-signup").type === "text")
      document.getElementById("password-signup").type = "password";
    else document.getElementById("password-signup").type = "text";
  };
  const LoginUpdate = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  const login = (e) => {
    e.preventDefault();
    setLoad(true);
    axios
      .post("http://localhost:1111/login", loginDetails)
      .then((val) => {
        navigate("/dashboard");
        localStorage.setItem("user", JSON.stringify(val.data));
        setLoad(false);
      })
      .catch((err) => {
        setLoad(false);
        alert(err.response.data.message);
      });
  };
  return (
    <form onSubmit={login}>
      <div className="signup" style={{ marginBottom: "30px" }}>
        <h3 className="signText">SIGN IN</h3>
        <div className="signup-input">
          <div className="signup-div">
            <input
              type="email"
              placeholder="EMAIL"
              name="email"
              onChange={LoginUpdate}
              className="cont-spac"
              required
            />
            <span className="signup-span">EMAIL</span>
          </div>
          <div className="signup-div">
            <input
              type="password"
              id="password-signup"
              onChange={LoginUpdate}
              name="password"
              placeholder="PASSWORD"
              className="cont-spac"
              required
            />
            <span className="signup-span">PASSWORD</span>
            <div className="password-icon" onClick={passwordIconChange}>
              <i className={`fa ${eye}`}></i>
            </div>
          </div>
          <div
            className="signup-div"
            style={{
              display: "flex",
              margin: "10px",
            }}
          >
            {/* <select
            onChange={(e) => setRole(e.target.value)}
            style={{
              height: "30px",
            }}
          >
            <option value="select">Select Role</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
            <option value="user">User</option>
          </select> */}
          </div>

          <div
            style={{
              margin: "10px",
              display: "flex",
            }}
          >
            <Link
              onClick={() => {
                alert("Sorrry We will reach you ");
              }}
            >
              forgot Password
            </Link>
          </div>
          <div className="signup-div">
            <button className="signupSubmit btn btn-primary" type="submit">
              {load ? <i class="fas fa-spinner fa-pulse"></i> : ""} &nbsp; Login
            </button>
          </div>

          <div className="signup-div">
            <code>Don't you have an account</code> &nbsp;
            <button
              className="btn btn-warning"
              onClick={() => {
                navigate("/register");
              }}
            >
              Signup
            </button>{" "}
            &nbsp; <code> here</code>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signin;
