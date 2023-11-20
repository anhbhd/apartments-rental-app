import { Link } from "react-router-dom";
import "./ModalBackToPersonalInfo.scss";
import { IoClose } from "react-icons/io5";
import { Backdrop } from "../../../utils/Backdrop/Backdrop";

interface IModalBackToPersonalInfoProps {
  onClose: () => void;
}

const ModalBackToPersonalInfo = ({
  onClose,
}: IModalBackToPersonalInfoProps) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="ModalBackToPersonalInfo">
        <div className="header-box">
          <IoClose className="close-icon" onClick={onClose} />
        </div>
        <h1>You need to update your profile first</h1>
        <Link to="/personal_info">
          <button>Update Profile</button>
        </Link>
      </div>
    </>
  );
};

export default ModalBackToPersonalInfo;
