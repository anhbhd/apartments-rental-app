import React from "react";

import "./PersonalInfo.scss";
import InfoForm from "../../components/PersonalInfo/InfoForm/InfoForm";
const PersonalInfo = () => {
  return (
    <main className="personal-info">
      <h3 className="personal-info__title">
        Your <span>information</span>
      </h3>
      <InfoForm />
    </main>
  );
};

export default PersonalInfo;
