import { useEffect, useState } from "react";
import "./PersonalInfo.scss";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase_config";
import { User } from "../../type/User";
import anonymouseAva from "./../../assets/anonymous-avatarjpg.jpg";
import FullLoadingScreen from "../../utils/FullLoadingScreen/FullLoadingScreen";
import SuccessModal from "./Modal/Modal";

const PersonalInfo = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<User | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const uid = currentUser.uid;

  const handleCloseSuccessBox = () => {
    setUpdateSuccess(false);
  };

  useEffect(() => {
    const userDocRef = doc(db, `users/${uid}`);
    const fetchUser = async () => {
      const response = await getDoc(userDocRef);
      const userData = response.data();
      setUserData(userData as User);
      setLoading(false);
    };
    fetchUser();
  }, [uid]);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedData({ ...(userData as User) });
  };

  const handleSaveClick = async () => {
    setEditMode(false);
    setUserData({ ...(editedData as User) });

    try {
      const userDocRef = doc(db, `users/${currentUser.uid}`);

      await updateDoc(userDocRef, { ...editedData });
      setUpdateSuccess(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleChange = (fieldName: keyof User, value: string) => {
    setEditedData((prevData) => ({
      ...(prevData as User),
      [fieldName]: value,
    }));
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
                <img src={currentUser.photoURL || anonymouseAva} alt="" />
              </div>
              <div className="current-info__field">
                <span>Your email</span>
                <span>{userData?.email}</span>
              </div>
              {editMode ? (
                <>
                  <div className="current-info__field">
                    <span>Full name</span>
                    <input
                      autoFocus
                      type="text"
                      value={editedData?.fullName || ""}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                    />
                  </div>
                  <div className="current-info__field">
                    <span>Phone number</span>
                    <input
                      type="text"
                      value={editedData?.phoneNumber || ""}
                      onChange={(e) =>
                        handleChange("phoneNumber", e.target.value)
                      }
                    />
                  </div>
                  <div className="current-info__field">
                    <span>Year of Birth</span>
                    <input
                      type="text"
                      value={editedData?.yearOfBirth || ""}
                      onChange={(e) =>
                        handleChange("yearOfBirth", e.target.value)
                      }
                    />
                  </div>
                  <div className="btn-container">
                    <button className="save-btn btn" onClick={handleSaveClick}>
                      Save
                    </button>
                    <button
                      className="cancel-btn btn"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
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
