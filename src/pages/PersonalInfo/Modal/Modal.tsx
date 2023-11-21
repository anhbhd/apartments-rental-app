import "./Modal.scss";
import { IoClose } from "react-icons/io5";
import { Backdrop } from "../../../utils/Backdrop/Backdrop";

interface ISuccessModalProps {
  onClose: () => void;
  errorMessage: string;
}

const SuccessModal = ({ onClose, errorMessage }: ISuccessModalProps) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="ModalBackToPersonalInfo">
        <div className="header-box">
          <IoClose className="close-icon" onClick={onClose} />
        </div>
        <h1>{errorMessage || "Update Successfully!"}</h1>
        <button onClick={onClose}>OK</button>
      </div>
    </>
  );
};

export default SuccessModal;
