import React from "react";

import "./Login.scss";
import GoogleIcon from "../../icons/GoogleIcon";

const Login = () => {
  return (
    <div className="loginpage">
      <div className="login">
        <div className="login__text-header">
          <h3 className="login__text-header--text-lg">Sign in</h3>
          <p className="login__text-header--text-normal">
            Sign in with yout account and discover our features.
          </p>
        </div>
        <form>
          <div className="login__field">
            <label>Email</label>
            <input type="text" placeholder="Enter Email" />
          </div>
          <div className="login__field">
            <label>Password</label>
            <input type="password" placeholder="Enter Password" />
          </div>

          <button className="login__signin-button">Sign in</button>
          <p className="login__text-or">OR</p>

          <button className="login__google-button">
            <GoogleIcon className="google-icon" height="20" width="20" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
