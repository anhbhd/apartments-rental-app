import React, { useState, ChangeEvent, FormEvent } from "react";

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "./../../config/firebase_config";
import "./Register.scss";
import GoogleIcon from "../../icons/GoogleIcon";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { emailRegex } from "../../utils/regex";
import { getDocument } from "../../services/getDocument";
import { User } from "../../type/User";
import { toast } from "react-toastify";

interface FormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormState: FormInputs = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Register: React.FC = () => {
  const [formInputs, setFormInputs] = useState<FormInputs>(initialFormState);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const navigate = useNavigate();
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
  };

  const handleRegisterFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    validateEmail();
    validatePassword();
    validateConfirmPassword();
    if (JSON.stringify(initialFormState) === JSON.stringify(formInputs)) return;
    if (!emailError && !passwordError && !confirmPasswordError) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          formInputs.email,
          formInputs.password
        );
        const userDocRef = doc(db, `users/${response.user.uid}`);

        await setDoc(userDocRef, {
          email: response.user.email,
          isAdmin: false,
          createdDate: Timestamp.now(),
          active: true,
        });
        navigate("/");
      } catch (err: any) {
        console.error(err.message);
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      const userDocRef = doc(db, `users/${response.user.uid}`);

      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          email: response.user.email,
          isAdmin: false,
          createdDate: Timestamp.now(),
          active: true,
        });
      }

      if ((userDocSnap.data() as User).active) {
        toast.success("Login successfully!", {
          position: "bottom-right",
          autoClose: 1500,
          style: { fontSize: "15px" },
        });
      }
    } catch (err: any) {
      toast.error(err.message, {
        position: "bottom-right",
        style: {
          fontSize: "1.4rem",
        },
      });
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
          <Link className="login-link" to="/login">
            Already have an account?
          </Link>
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
      </div>
    </div>
  );
};

export default Register;
