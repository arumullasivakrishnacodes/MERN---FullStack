import React, { useRef, useState } from "react";
import LoginImg from "../../Assets/Images/loginpage-image.jpg";
import "../Login/Login.css";
import LoginProfileImg from "../../Assets/Images/Login-profile-img.png";
import { NavLink } from "react-router-dom";

function Login() {
  const [loginstep, setloginstep] = useState("mobile");
  const [errormsgmobile, seterrormsgmobile] = useState("");

  const [inputs, setInputs] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleInputChange = (index, value) => {
    // Check if the entered value is a number
    if (!isNaN(value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);

      // Move focus to next input if value is entered
      if (value !== "" && index < 3) {
        refs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && inputs[index] === "") {
      // Move focus to previous input and clear value
      if (index > 0) {
        const newInputs = [...inputs];
        newInputs[index - 1] = "";
        setInputs(newInputs);
        refs[index - 1].current.focus();
      }
    }
  };

  const handleChange = (event) => {
    const input = event.target.value;
    const numericInput = input.replace(/[^0-9]/g, ""); // Replace any non-numeric character with an empty string
    document.getElementById("MobileNumber").value = numericInput; // Update the state with the numeric only input
  };

  const handleGetOtp = () => {
    let getInputValue = document.getElementById("MobileNumber").value;

    if (getInputValue === "") {
      seterrormsgmobile("Please Enter Mobile Number");
    } else if (getInputValue.length < 10) {
      seterrormsgmobile("Please Provide 10 digits Number");
    } else {
      seterrormsgmobile("");
      setloginstep("otp");
    }
  };

  if (loginstep === "mobile") {
    return (
      <div className="login-main-container row">
        <div className="col-lg-6 col-12 login-main-image">
          <img src={LoginImg} alt="" />
        </div>
        <div
          className={`col-lg-6 col-12 login-components-container`}
          loginstep={loginstep}
        >
          <img src={LoginProfileImg} className="profile-image" alt="" />
          <div className="mobile-number-input">
            <div className="country-code">+ 91</div>
            <input
              type="text"
              id="MobileNumber"
              onChange={handleChange}
              className="mobile-input"
              pattern="[0-9]*"
              maxlength="10"
              placeholder="Enter Mobile Number..."
            />
          </div>
          <p
            className={`error-message-mobile error-message ${
              errormsgmobile === "" ? "d-none" : ""
            }`}
          >
            {errormsgmobile}
          </p>
          <p className="login-accept-terms">
            By continuing, I agree to <NavLink to="/">Terms</NavLink> of use and{" "}
            <NavLink to="/">Privacy Policy</NavLink>
          </p>
          <button className="get-otp" onClick={handleGetOtp}>
            GET OTP
          </button>
        </div>
      </div>
    );
  } else if (loginstep === "otp") {
    return (
      <div className="login-main-container row">
        <div className="col-lg-6 col-12 login-main-image">
          <img src={LoginImg} alt="" />
        </div>
        <div className={`handle-otp-container col-lg-6 col-12`} loginstep={loginstep}>
          <img src={LoginProfileImg} className="profile-image" alt="" />
          <p className="otpheading">Enter OTP</p>
          <div className="otp-input-container" id="otpinputsContainer">
            <input
              type="text"
              id="otpInput"
              onChange={(e) => handleInputChange(0, e.target.value)}
              onKeyDown={(e) => handleKeyDown(0, e)}
              ref={refs[0]}
              pattern="[0-9]*"
              maxlength="1"
            />
            <input
              type="text"
              id="otpInput"
              onChange={(e) => handleInputChange(1, e.target.value)}
              onKeyDown={(e) => handleKeyDown(1, e)}
              ref={refs[1]}
              pattern="[0-9]*"
              maxlength="1"
            />
            <input
              type="text"
              id="otpInput"
              onChange={(e) => handleInputChange(2, e.target.value)}
              onKeyDown={(e) => handleKeyDown(2, e)}
              ref={refs[2]}
              pattern="[0-9]*"
              maxlength="1"
            />
            <input
              type="text"
              id="otpInput"
              onChange={(e) => handleInputChange(3, e.target.value)}
              onKeyDown={(e) => handleKeyDown(3, e)}
              ref={refs[3]}
              pattern="[0-9]*"
              maxlength="1"
            />
          </div>
          <button className="submit-otp">SUBMIT OTP</button>
        </div>
      </div>
    );
  }
}

export default Login;
