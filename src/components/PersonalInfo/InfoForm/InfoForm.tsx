import React, { useState } from "react";
import "./InfoForm.scss";
import { User } from "../../../type/User";

interface IInfoFormProps {
  className?: string;
  style?: React.CSSProperties;
  userData: User;
}

interface IFormState {
  email: string;
  fullName: string;
  phoneNumber: string;
  gender: string;
}

const InfoForm: React.FC<IInfoFormProps> = ({
  className = "",
  style,
  userData,
}) => {
  const [isEditing, setIsEditting] = useState(false);
  const [formState, setFormState] = useState<IFormState>({
    email: "",
    fullName: "",
    phoneNumber: "",
    gender: "",
  });

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditting(false);
    console.log("Form submitted:", formState);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      style={style}
      className={`info-form ${className}`}
    >
      <div className="info-form__input-field">
        <label>Full name</label>
        <input
          type="text"
          name="fullName"
          value={formState.fullName}
          onChange={(e) =>
            setFormState({ ...formState, fullName: e.target.value })
          }
          disabled={!isEditing}
        />
      </div>
      <div className="info-form__input-field">
        <label>Phone number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formState.phoneNumber}
          onChange={(e) =>
            setFormState({ ...formState, phoneNumber: e.target.value })
          }
          disabled={!isEditing}
        />
      </div>
      <div className="info-form__input-field">
        <label>Year of Birth</label>
        <input
          type="text"
          name="gender"
          value={formState.gender}
          onChange={(e) =>
            setFormState({ ...formState, gender: e.target.value })
          }
          disabled={!isEditing}
        />
      </div>

      <div className="info-form__button-container">
        {isEditing && <button type="submit">Save</button>}
      </div>
      {!isEditing && (
        <button
          type="button"
          className="edit-btn"
          onClick={() => setIsEditting(true)}
        >
          Edit or Update
        </button>
      )}
    </form>
  );
};

export default InfoForm;
