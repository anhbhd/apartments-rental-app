import React, { useEffect, useState } from "react";

import "./PersonalInfo.scss";
import InfoForm from "../../components/PersonalInfo/InfoForm/InfoForm";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase_config";
import { User } from "../../type/User";

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
  }, []);

  return (
    <main className="personal-info">
      <h3 className="personal-info__title">
        Your <span>information</span>
      </h3>
      <InfoForm userData={userData as User} />
    </main>
  );
};

export default PersonalInfo;
