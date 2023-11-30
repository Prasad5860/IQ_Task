import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Register = () => {
  const [regDetails, setDetails] = useState({});
  const navigate = useNavigate();
  const [eye, setEye] = useState("fa-eye-slash");
  const [eye2, setEye2] = useState("fa-eye-slash");
  const [load, setLoad] = useState(false);
  const updateValue = (e) => {
    setDetails({ ...regDetails, [e.target.name]: e.target.value });
    console.log(regDetails);
  };
  const photoTaken = (e) => {
    let file = e.target.files[0];
    if (!file || !/image\/.*/.test(file.type)) return;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setDetails({ ...regDetails, photo: reader.result });
      console.log(reader.result);
    };
    reader.onerror = function () {
      alert("please select profile photo");
    };
  };
  const passwordIconChange = () => {
    if (eye === "fa-eye") setEye("fa-eye-slash");
    else setEye("fa-eye");
    if (document.getElementById("password-reg").type === "text")
      document.getElementById("password-reg").type = "password";
    else document.getElementById("password-reg").type = "text";
  };
  const passwordIcon2Change = () => {
    if (eye2 === "fa-eye") setEye2("fa-eye-slash");
    else setEye2("fa-eye");
    if (document.getElementById("password-reg2").type === "text")
      document.getElementById("password-reg2").type = "password";
    else document.getElementById("password-reg2").type = "text";
  };
  const signUp = (e) => {
    e.preventDefault();
    console.log(regDetails);
    setLoad(true);
    axios
      .post("http://localhost:1111/register", regDetails)
      .then((res) => {
        console.log(res.data);
        setLoad(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data.message);
        setLoad(false);
      });
  };
  return (
    <form onSubmit={signUp}>
      <div className="signup">
        <h3 className="signText">Register Here</h3>
        <div className="signup-input">
          <div className="signup-div">
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              onChange={updateValue}
              className="cont-spac"
              required
            />
            <span className="signup-span">First Name</span>
          </div>
          <div className="signup-div">
            <input
              type="text"
              placeholder="Middle Name (optional) "
              name="middlename"
              onChange={updateValue}
              className="cont-spac"
            />
            <span className="signup-span">Middle Name (optional) </span>
          </div>
          <div className="signup-div">
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              onChange={updateValue}
              className="cont-spac"
              required
            />
            <span className="signup-span">Last Name</span>
          </div>
          <div className="signup-div">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={updateValue}
              className="cont-spac"
              required
            />
            <span className="signup-span">Email</span>
          </div>
          <div className="signup-div">
            <input
              type="password"
              id="password-reg"
              placeholder="Password"
              name="password"
              onChange={updateValue}
              className="cont-spac"
              required
            />
            <span className="signup-span">Password</span>
            <div className="password-icon" onClick={passwordIconChange}>
              <i className={`fa ${eye}`}></i>
            </div>
          </div>
          <div className="signup-div">
            <input
              type="password"
              id="password-reg2"
              placeholder="Confirm Password"
              name="confirmpassword"
              onChange={updateValue}
              className="cont-spac"
              required
            />
            <span className="signup-span">Confirm Password</span>
            <div className="password-icon" onClick={passwordIcon2Change}>
              <i className={`fa ${eye2}`}></i>
            </div>
          </div>
          <div className="signup-div">
            <input
              type="text"
              placeholder="Mobile Number"
              name="mobile"
              onChange={updateValue}
              className="cont-spac"
              required
            />
            <span className="signup-span">Mobile Number </span>
          </div>
          <div className="signup-div">
            <textarea
              type="text"
              placeholder="Current Address"
              name="currentAddress"
              onChange={updateValue}
              className="cont-spac"
              required
            ></textarea>
            <span className="signup-span">Current Address </span>
          </div>
          <div className="signup-div">
            <textarea
              type="text"
              placeholder="Permanant Address"
              name="permanentAddress"
              onChange={updateValue}
              className="cont-spac"
              required
            ></textarea>
            <span className="signup-span">Permanant Address </span>
          </div>
          <div className="signup-div">
            <input type="file" onChange={photoTaken} className="cont-spac" />
          </div>

          <div
            className="col-md-4"
            style={{
              margin: "10px",
              display: "flex",
            }}
          ></div>
          <div className="signup-div">
            <button className="signupSubmit btn btn-primary" type="submit">
              {load ? <i class="fas fa-spinner fa-pulse"></i> : ""} &nbsp; Sign
              up
            </button>
          </div>
          <div className="signup-div">
            <code>Already have an account</code> &nbsp;{" "}
            <button
              className="btn btn-warning"
              onClick={() => {
                navigate("/");
              }}
            >
              Sign in
            </button>{" "}
            &nbsp; <code> here</code>
          </div>
        </div>
      </div>
      {/* {regDetails.photo && <img src={regDetails.photo} height={'100px'} />} */}
    </form>
  );
};

export default Register;
