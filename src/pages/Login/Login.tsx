import React, { ChangeEvent, FormEvent, useState } from "react";

import "./Login.scss";
import GoogleIcon from "../../icons/GoogleIcon";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "../../config/firebase_config";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email: string): boolean => {
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (isValidEmail && email && password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/");
          console.log("login successfully");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      setIsValidEmail(false);
      return;
    }
  };

  const handleSignInWithGoogle = (): void => {
    signInWithGoogle();
  };

  const handleChangeField = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;

    switch (name) {
      case "email":
        const enteredEmail = event.target.value;
        setEmail(enteredEmail);
        setIsValidEmail(validateEmail(enteredEmail));
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        return;
    }
  };

  return (
    <div className="loginpage">
      <div className="login">
        <div className="login__text-header">
          <h3 className="login__text-header--text-lg">Sign in</h3>
          <p className="login__text-header--text-normal">
            Sign in with your account and discover our features.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login__field">
            <label>Email</label>
            <input
              className={`${!isValidEmail && "invalid"}`}
              type="text"
              onChange={handleChangeField}
              placeholder="Enter Email"
              name="email"
              value={email}
            />
            <p className="error-msg-form">{!isValidEmail && "Invalid email"}</p>
          </div>

          <div className="login__field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChangeField}
              value={password}
            />
          </div>

          <button className="login__signin-button" type="submit">
            Sign in
          </button>
          <p className="login__text-or">OR</p>
        </form>
        <button
          className="login__google-button"
          onClick={handleSignInWithGoogle}
        >
          <GoogleIcon className="google-icon" height="20" width="20" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
