import { useEffect, useState } from "react";
import "./PersonalInfo.scss";
import { useAuth } from "../../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase_config";
import { User } from "../../Type/User";
import anonymousAva from "./../../assets/anonymous-avatarjpg.jpg";
import FullLoadingScreen from "../../utils/FullLoadingScreen/FullLoadingScreen";
import SuccessModal from "./Modal/Modal";
import { getDocument } from "../../services/getDocument";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Invalid phone number")
    .required("Phone number is required"),
  yearOfBirth: Yup.string()
    .matches(/^(19[6-9]\d|20[0-2]\d)$/, "Invalid year of birth")
    .required("Year of Birth is required"),
});
interface UserFormData {
  fullName: string;
  phoneNumber: string;
  yearOfBirth: string;
}

const initialFormValue: UserFormData = {
  fullName: "",
  phoneNumber: "",
  yearOfBirth: "",
};
const PersonalInfo = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const uid = currentUser.uid;

  const {
    isSubmitting,
    setSubmitting,
    values,
    errors,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues: initialFormValue,
    validationSchema,
    onSubmit: async (values) => {
      setEditMode(false);

      try {
        const userDocRef = doc(db, `users/${currentUser.uid}`);
        await updateDoc(userDocRef, { ...values });
        setUserData({ ...userData, ...values } as unknown as User);
        setUpdateSuccess(true);
        setSubmitting(false);
      } catch (err: any) {
        setError(err.message);
      }
    },
  });

  const handleCloseSuccessBox = () => {
    setUpdateSuccess(false);
  };

  const fetchUser = async () => {
    const userData: User = await getDocument("users", uid);
    setUserData(userData);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [uid]);

  const handleEditClick = () => {
    setEditMode(true);
    setValues({ ...(userData as unknown as UserFormData) });
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  return (
    <main className="personal-info">
      {updateSuccess && (
        <SuccessModal errorMessage={error} onClose={handleCloseSuccessBox} />
      )}
      {loading && <FullLoadingScreen />}
      {!loading && (
        <div className="personal-info__container">
          <h3 className="title">
            Your <span>information</span>
          </h3>

          <div className="grid-container">
            <div className="current-info">
              <div className="img-container">
                <img src={currentUser.photoURL || anonymousAva} alt="" />
              </div>
              <div className="current-info__field">
                <span>Your email</span>
                <span>{userData?.email}</span>
              </div>
              {editMode ? (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="current-info__field">
                      <span>Full name</span>
                      <input
                        type="text"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.fullName && errors.fullName && (
                        <div className="error">{errors.fullName}</div>
                      )}
                    </div>
                    <div className="current-info__field">
                      <span>Phone number</span>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.phoneNumber && errors.phoneNumber && (
                        <div className="error">{errors.phoneNumber}</div>
                      )}
                    </div>
                    <div className="current-info__field">
                      <span>Year of Birth</span>
                      <input
                        type="text"
                        name="yearOfBirth"
                        value={values.yearOfBirth}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.yearOfBirth && errors.yearOfBirth && (
                        <div className="error">{errors.yearOfBirth}</div>
                      )}
                    </div>

                    <div className="btn-container">
                      <button
                        className="save-btn btn"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        Save
                      </button>
                      <button
                        className="cancel-btn btn"
                        type="button"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="current-info__field">
                    <span>Full name</span>
                    <span className={!userData?.fullName ? "color-red" : ""}>
                      {userData?.fullName || "N/A"}
                    </span>
                  </div>
                  <div className="current-info__field">
                    <span>Phone number</span>
                    <span className={!userData?.phoneNumber ? "color-red" : ""}>
                      {userData?.phoneNumber || "N/A"}
                    </span>
                  </div>
                  <div className="current-info__field">
                    <span>Year of Birth</span>
                    <span className={!userData?.yearOfBirth ? "color-red" : ""}>
                      {userData?.yearOfBirth || "N/A"}
                    </span>
                  </div>
                  <div className="btn-container">
                    <button className="edit-btn btn" onClick={handleEditClick}>
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PersonalInfo;
