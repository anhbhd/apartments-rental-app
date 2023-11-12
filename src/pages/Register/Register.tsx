import React from "react";

import "./Register.scss";
import GoogleIcon from "../../icons/GoogleIcon";

const Register = () => {
  return (
    <div className="registerpage">
      <div className="register">
        <div className="register__text-header">
          <h3 className="register__text-header--text-lg">Create account</h3>
          <p className="register__text-header--text-normal">
            Create an account to find out some more our interesting features.
          </p>
        </div>
        <form>
          <div className="register__field">
            <label>Email</label>
            <input type="text" placeholder="Enter Email" />
          </div>
          <div className="register__field">
            <label>Password</label>
            <input type="password" placeholder="Enter Password" />
          </div>
          <div className="register__field">
            <label>Confirm Password</label>
            <input type="password" placeholder="Re-enter Password" />
          </div>
          <button className="register__register-button">Sign up</button>
          <p className="register__text-or">OR</p>

          <button className="register__google-button">
            <GoogleIcon className="google-icon" height="20" width="20" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
