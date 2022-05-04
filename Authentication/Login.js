import React, { useState } from "react";
import logo from "../../images/LogoB.png";
import Button from "../UI/Button/Button";
import "./Login.css";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import UserPool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Home from "../Home/Home";

function Login() {
  const location = {
    pathname: "/home",
  };
  const [showLogin, setShowLogin] = useState(true);
  const [enteredID, setEnteredID] = useState("");
  const [enteredpass, setEnteredpass] = useState("");
  const [wrongInfo, setWrongInfo] = useState(false);
  const [msgReceived, setMsgReceived]=useState("");
  const IDChangeHandler = (event) => {
    setEnteredID(event.target.value);
  };

  const passChangeHandler = (event) => {
    setEnteredpass(event.target.value);
  };

  function setShowLoginHandler() {
    setShowLogin(false);
  }

  const onSubmit = (event) => {
    // console.log(enteredpass);
    event.preventDefault();

    const user = new CognitoUser({
      Username: enteredID,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: enteredID,
      Password: enteredpass,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        setMsgReceived("Success")
        console.log("onSucess: ", data);
        setShowLogin(false);
      },
      onFailure: (err) => {
        console.log("onFailure: ", err);
        setWrongInfo(true);
      },

      newPasswordRequired: (data) => {
        setMsgReceived("New Password")
        console.log("newPasswordReq: ", data);
        setShowLogin(false);
      },
    });
  };
  return (
    <div className={`${showLogin ? "login" : "loginNot"}`}>
      {/* <div className="login"> */}
      {/* {!showLogin && <Header/>} */}
      <img src={logo}></img>
      <div className="login__title">Log In</div>

      <form onSubmit={onSubmit}>
        <div className={`${wrongInfo ? "showErr" : "hideErr"}`}>
          Invalid Username/Password
        </div>
        <input
          type="text"
          placeholder="Email or Phone No."
          value={enteredID}
          onChange={(event) => setEnteredID(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={enteredpass}
          onChange={(event) => setEnteredpass(event.target.value)}
        />
        <Button type="submit" id="confirm">
          Confirm
        </Button>
      </form>

      {/* <a href="http://localhost:3000/home"> */}

      {/* </a> */}
      {!showLogin && <Navigate to="/home" />}
    </div>
  );
}

export default Login;

//aishani-- aishani111