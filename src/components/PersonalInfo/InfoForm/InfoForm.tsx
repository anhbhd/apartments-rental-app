import React, { useState } from "react";
import "./InfoForm.scss";

interface IInfoFormProps {
  className?: string;
  style?: React.CSSProperties;
}

interface IFormState {
  email: string;
  fullName: string;
  phoneNumber: string;
  gender: string;
  hometown: string;
}

const InfoForm: React.FC<IInfoFormProps> = ({ className = "", style }) => {
  const [isEditing, setIsEditting] = useState(false);
  const [formState, setFormState] = useState<IFormState>({
    email: "",
    fullName: "",
    phoneNumber: "",
    gender: "",
    hometown: "",
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
        <label>Email</label>
        <input
          type="text"
          value={formState.email}
          name="email"
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
          disabled={!isEditing}
        />
      </div>
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
        <label>Gender</label>
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
      <div className="info-form__input-field">
        <label>Hometown</label>
        <input
          type="text"
          name="hometown"
          value={formState.hometown}
          onChange={(e) =>
            setFormState({ ...formState, hometown: e.target.value })
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
          Edit
        </button>
      )}
    </form>
  );
};

export default InfoForm;
