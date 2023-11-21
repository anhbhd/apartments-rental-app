import React, { ChangeEvent, FormEvent, useState } from "react";

import "./Login.scss";
import GoogleIcon from "../../icons/GoogleIcon";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../config/firebase_config";
import { useAuth } from "../../context/AuthContext";
import { emailRegex } from "../../utils/regex";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import FullLoadingScreen from "../../utils/FullLoadingScreen/FullLoadingScreen";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [promisedError, setPromisedError] = useState<string>();
  const { setCredentialUserForApp } = useAuth();
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const validateEmail = (email: string): boolean => {
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLogging(true);
    if (isValidEmail && email && password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setIsLogging(false);
          navigate("/");
          console.log("login successfully");
          console.log(user);
        })
        .catch((error: any) => {
          setPromisedError(error.code);
          setIsLogging(false);
        });
    } else {
      setIsValidEmail(false);
      return;
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      const userDocRef = doc(db, `users/${response.user.uid}`);

      setCredentialUserForApp({
        uid: response.user.uid,
        email: response.user.email,
        displayName: response.user.displayName,
        photoURL: response.user.photoURL,
      });

      try {
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            email: response.user.email,
            isAdmin: false,
            createdDate: Timestamp.now(),
          });
        }
      } catch (err: any) {
        setPromisedError(err.code);
      }

      navigate("/");
    } catch (err: any) {
      setPromisedError(err.code);
    }
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
    }
    setPromisedError("");
  };

  return (
    <div className="loginpage">
      {isLogging && <FullLoadingScreen />}
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
          <Link className="create-account" to="/signup">
            Create an account
          </Link>
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
        {promisedError && <p className="error-server">{promisedError}</p>}
      </div>
    </div>
  );
};

export default Login;
