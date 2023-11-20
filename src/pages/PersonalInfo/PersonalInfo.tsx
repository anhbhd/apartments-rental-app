import React, { useEffect, useState } from "react";

import "./PersonalInfo.scss";
import InfoForm from "../../components/PersonalInfo/InfoForm/InfoForm";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase_config";
import { User } from "../../type/User";
import anonymouseAva from "./../../assets/anonymous-avatarjpg.jpg";

const PersonalInfo = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const { currentUser } = useAuth();
  const uid = currentUser.uid;

  useEffect(() => {
    const userDocRef = doc(db, `users/${uid}`);
    const fetchUser = async () => {
      const response = await getDoc(userDocRef);
      const userData = await response.data();
      setUserData(userData as User);
    };
    fetchUser();
  }, [uid]);

  return (
    <main className="personal-info">
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
            </div>{" "}
            <div className="current-info__field">
              <span>Fullname</span>
              <span>{userData?.fullName || "Update your fullname"}</span>
            </div>
            <div className="current-info__field">
              <span>Phone number</span>
              <span className={!userData?.phoneNumber ? "color-red" : ""}>
                {userData?.phoneNumber || "Update your phone number"}
              </span>
            </div>
            <div className="current-info__field">
              <span>Year of Birth</span>
              <span className={!userData?.yearOfBirth ? "color-red" : ""}>
                {userData?.yearOfBirth || "Update your year of birth"}
              </span>
            </div>
          </div>
          <InfoForm userData={userData as User} />
        </div>
      </div>
    </main>
  );
};

export default PersonalInfo;
