import React, { useContext, useEffect, useState } from "react";
import LoginImg from "../../Assets/Images/loginpage-image.jpg";
import "../Login/Login.css";
import LoginProfileImg from "../../Assets/Images/Login-profile-img.png";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

function Login() {
  const [loginstep, setloginstep] = useState("mobile");
  const [errormsgmobile, seterrormsgmobile] = useState("");
  const [otpValue, setOtpValue] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const {AuthenticatedUser} = useContext(ShopContext);
  const [AuthUser, setAuthUser] = useState(null);
  const [profileMenuSelect, setProfileMenuSelect] = useState('profile')

  useEffect(() => {
    if (localStorage.getItem('loginUser')) {
      setloginstep("Autenticated");
    }
    setAuthUser(AuthenticatedUser)
  },[AuthenticatedUser])

  const handleChangeMobile = (e) => {
    // Remove non-numeric characters from the input value using a regular expression
    const newValue = e.target.value.replace(/\D/g, '');
    setMobileNumber(newValue);
  };

  const handleChangeOTP = (e) => {
    // Remove non-numeric characters from the input value using a regular expression
    const newValue = e.target.value.replace(/\D/g, '');
    setOtpValue(newValue);
  };

  const handleGetOtp = () => {
    if (mobileNumber === "") {
      seterrormsgmobile("Please Enter Mobile Number");
    } else if (mobileNumber.length < 10) {
      seterrormsgmobile("Please Provide 10 digits Number");
    } else {
      seterrormsgmobile("");
      setloginstep("otp");
    }
  };

  const submitOTP = async () => {
    if (otpValue === "") {
      seterrormsgmobile("Please Enter OTP");
    } else if (otpValue.length < 4) {
      seterrormsgmobile("Please Provide 4 digits OTP");
    } else if (otpValue !== '1998') {
      seterrormsgmobile("Incorrect OTP");
    } else {
      seterrormsgmobile("");
      const userdetail = {
        mobile: mobileNumber,
        otp: otpValue
      }

      let responseData;
      let userDetail = userdetail;
  
      await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetail),
      }).then((res) => res.json()).then((data) => {responseData = data});
      localStorage.setItem('loginUser', responseData.mobile)

      setloginstep("Autenticated");
    }
  }

  const handleprofilemenuSelect = (e) => {
    setProfileMenuSelect(e.target.id)
  }


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
              value={mobileNumber}
              onChange={handleChangeMobile}
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
            <input type="text" id="otpInput" value={otpValue} pattern="[0-9]*" maxlength="4" onChange={handleChangeOTP} /><br/>
            <p className={`error-message-mobile error-message ${errormsgmobile === "" ? "d-none" : ""}`}>{errormsgmobile}</p>
          </div>
          <button className="submit-otp" onClick={submitOTP}>SUBMIT OTP</button>
        </div>
      </div>
    );
  } else if (loginstep === 'Autenticated') {
    return(
      <div className="profile-details-container row">
          <div className="profile-left-section col-3">
            {AuthUser ? (
              <div className="user-greet-container">
              <p>Hello</p>
              <p className="greet-mobile">{AuthUser.name !== '' ? AuthUser.name : AuthUser.mobile}</p>
            </div>
            ) : (
              <div className="user-greet-container">
              <p>Loading...</p>
              {/* <p className="greet-mobile">{AuthUser.name !== '' ? AuthUser.name : AuthUser.mobile}</p> */}
            </div>
            )}
            
            <div onClick={handleprofilemenuSelect} className={`profile-menu ${profileMenuSelect === 'profile' ? 'active' : ''}`} id="profile">My Profile</div>
            <div onClick={handleprofilemenuSelect} className={`profile-menu ${profileMenuSelect === 'orders' ? 'active' : ''}`} id="orders">Orders</div>
            <div onClick={handleprofilemenuSelect} className={`profile-menu ${profileMenuSelect === 'address' ? 'active' : ''}`} id="address">Saved Address</div>
            <div onClick={handleprofilemenuSelect} className={`profile-menu ${profileMenuSelect === 'offers' ? 'active' : ''}`} id="offers">Offers</div>
          </div>
          <div className="profile-right-section col-9">
            <div className={`${profileMenuSelect === 'profile' ? '' : 'd-none'}`}>
              {AuthUser ? (
                <div>
                  <h2>User Details</h2>
                  <p>Name: {AuthUser.name}</p>
                  <p>Email: {AuthUser.email}</p>
                  <p>Mobile: {AuthUser.mobile}</p> {/* Safely access user.mobile */}
                  {/* Add more user details as needed */}
                </div>
              ) : (
                <p>Loading user details...</p>
              )}
            </div>
            <div className={`${profileMenuSelect === 'orders' ? '' : 'd-none'}`}>orders</div>
            <div className={`${profileMenuSelect === 'address' ? '' : 'd-none'}`}>address</div>
            <div className={`${profileMenuSelect === 'offers' ? '' : 'd-none'}`}>Offers</div>
          </div>
      </div>
    )
  }
}

export default Login;
