import { Link } from "react-router-dom";
import "./SuccessRentModal.scss";
import { IoClose } from "react-icons/io5";
import { Backdrop } from "../../../utils/Backdrop/Backdrop";

interface ISuccessRentModalProps {
  onClose: () => void;
}

const SuccessRentModal = ({ onClose }: ISuccessRentModalProps) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="ModalBackToPersonalInfo">
        <div className="header-box">
          <IoClose className="close-icon" onClick={onClose} />
        </div>
        <h1>Request Successfully!</h1>
        <Link to="/my_rental_apps">
          <button>View your Applications</button>
        </Link>
      </div>
    </>
  );
};

export default SuccessRentModal;
