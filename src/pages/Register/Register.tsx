import React, { useState, ChangeEvent, FormEvent } from "react";

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "./../../config/firebase_config";
import "./Register.scss";
import GoogleIcon from "../../icons/GoogleIcon";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { emailRegex } from "../../utils/regex";

interface FormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formInputs, setFormInputs] = useState<FormInputs>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [promisedError, setPromisedError] = useState<string>();
  const navigate = useNavigate();

  const { setCredentialUserForApp } = useAuth();

  const validateEmail = () => {
    setEmailError(
      !emailRegex.test(formInputs.email) ? "Invalid email address" : ""
    );
  };

  const validatePassword = () => {
    setPasswordError(
      formInputs.password.length < 8
        ? "Password must be at least 8 characters"
        : ""
    );
  };

  const validateConfirmPassword = () => {
    setConfirmPasswordError(
      formInputs.password !== formInputs.confirmPassword
        ? "Passwords do not match"
        : ""
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
    setPromisedError("");
  };

  const handleRegisterFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (!emailError && !passwordError && !confirmPasswordError) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          formInputs.email,
          formInputs.password
        );
        const userDocRef = doc(db, `users/${response.user.uid}`);
        try {
          await setDoc(userDocRef, {
            email: response.user.email,
            isAdmin: false,
            createdDate: Timestamp.now(),
          });
          navigate("/login");
        } catch (err: any) {
          setPromisedError(err.code);
        }
      } catch (err: any) {
        setPromisedError(err.code);
      }
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

  return (
    <div className="registerpage">
      <div className="register">
        <div className="register__text-header">
          <h3 className="register__text-header--text-lg">Create account</h3>
          <p className="register__text-header--text-normal">
            Create an account to find out some more of our interesting features.
          </p>
        </div>
        <form onSubmit={handleRegisterFormSubmit}>
          <div className="register__field">
            <label>Email</label>
            <input
              className={`${emailError && "invalid"}`}
              type="text"
              placeholder="Enter Email"
              name="email"
              value={formInputs.email}
              onChange={handleInputChange}
              onBlur={validateEmail}
            />
            <p className="error-msg-form">{emailError}</p>
          </div>
          <div className="register__field">
            <label>Password</label>
            <input
              className={`${passwordError && "invalid"}`}
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formInputs.password}
              onChange={handleInputChange}
              onBlur={validatePassword}
            />
            <p className="error-msg-form ">{passwordError}</p>
          </div>
          <div className="register__field">
            <label>Confirm Password</label>
            <input
              className={`${confirmPasswordError && "invalid"}`}
              type="password"
              placeholder="Re-enter Password"
              name="confirmPassword"
              value={formInputs.confirmPassword}
              onChange={handleInputChange}
              onBlur={validateConfirmPassword}
            />
            <p className="error-msg-form">{confirmPasswordError}</p>
          </div>
          <button className="register__register-button" type="submit">
            Sign up
          </button>
          <p className="register__text-or">OR</p>
        </form>
        <button
          className="register__google-button"
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

export default Register;
