import React, { ChangeEvent, FormEvent, useState } from "react";

import "./Login.scss";
import GoogleIcon from "../../icons/GoogleIcon";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../config/firebase_config";
import { emailRegex } from "../../utils/regex";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import FullLoadingScreen from "../../utils/FullLoadingScreen/FullLoadingScreen";
import { toast } from "react-toastify";
import { User } from "../../type/User";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex)
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [isLogging, setIsLogging] = useState<boolean>(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        setIsLogging(true);
        try {
          const usersRef = collection(db, "users");
          let q = query(usersRef, where("email", "==", values.email));
          const firstDocSnapshot = (await getDocs(q)).docs.at(0);
          if (firstDocSnapshot) {
            const user = {
              ...firstDocSnapshot.data(),
              id: firstDocSnapshot.id,
            } as User;

            if (!user.active)
              throw new Error(
                "Your account has been deactivate by administrator"
              );
          }
          await signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              // Signed in

              setIsLogging(false);
              navigate("/");
              toast.success("Login successfully!", {
                position: "bottom-right",
                autoClose: 1500,
                style: { fontSize: "1.5rem" },
              });
            })
            .catch((error: any) => {
              toast.error("Email or Password is not correct", {
                position: "bottom-right",
                style: {
                  fontSize: "1.4rem",
                },
              });

              setIsLogging(false);
            });
        } catch (err: any) {
          toast.error(err.message, {
            position: "bottom-right",
            style: {
              fontSize: "1.4rem",
            },
          });
        } finally {
          setIsLogging(false);
        }
      },
    });

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
      console.error(err.message);
    }
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
        {/* className={`${!isValidEmail && "invalid"}`} */}
        <form onSubmit={handleSubmit}>
          <div className="login__field">
            <label>Email</label>
            <input
              className={`${errors.email && "invalid"}`}
              type="text"
              placeholder="Enter Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name="email"
            />
            {touched.email && errors.email ? (
              <p className="error-msg-form">Please input a valid email</p>
            ) : null}
          </div>

          <div className="login__field">
            <label>Password</label>
            <input
              className={`${errors.password && "invalid"}`}
              type="password"
              placeholder="Enter Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              name="password"
            />
            {touched.password && errors.password ? (
              <p className="error-msg-form">{errors.password}</p>
            ) : null}
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
      </div>
    </div>
  );
};

export default Login;
