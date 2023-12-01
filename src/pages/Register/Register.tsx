import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "./../../config/firebase_config";
import "./Register.scss";
import GoogleIcon from "../../icons/GoogleIcon";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../type/User";
import { toast } from "react-toastify";
import FullLoadingScreen from "../../utils/FullLoadingScreen/FullLoadingScreen";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register: React.FC = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const userDocRef = doc(db, `users/${response.user.uid}`);

        await setDoc(userDocRef, {
          email: response.user.email,
          isAdmin: false,
          createdDate: Timestamp.now(),
          active: true,
        });

        toast.success("Register successfully!", {
          position: "bottom-right",
          autoClose: 1500,
          style: { fontSize: "15px" },
        });

        navigate("/");
      } catch (err) {
        toast.error("Email is already used!", {
          position: "bottom-right",
          autoClose: 1500,
          style: { fontSize: "15px" },
        });
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
    <div className="registerpage">
      {isSubmitting && <FullLoadingScreen />}
      <div className="register">
        <div className="register__text-header">
          <h3 className="register__text-header--text-lg">Create account</h3>
          <p className="register__text-header--text-normal">
            Create an account to find out some more of our interesting features.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="register__field">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? "invalid" : ""}
            />
            <p className="error-msg-form">{touched.email && errors.email}</p>
          </div>
          <div className="register__field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.password && errors.password ? "invalid" : ""}
            />
            <p className="error-msg-form">
              {touched.password && errors.password}
            </p>
          </div>
          <div className="register__field">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.confirmPassword && errors.confirmPassword
                  ? "invalid"
                  : ""
              }
            />
            <p className="error-msg-form">
              {touched.confirmPassword && errors.confirmPassword}
            </p>
          </div>
          <Link className="login-link" to="/login">
            Already have an account?
          </Link>
          <button
            className="register__register-button"
            type="submit"
            disabled={isSubmitting}
          >
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
