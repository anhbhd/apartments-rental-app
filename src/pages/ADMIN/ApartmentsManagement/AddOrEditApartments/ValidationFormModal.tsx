import React from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
interface IModalProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<IModalProps> = ({ isOpenModal, setIsOpenModal }) => {
  const handleOpen = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <Dialog open={isOpenModal} handler={setIsOpenModal}>
      <DialogHeader>Dialog</DialogHeader>
      <DialogBody>Please fulfill the form!!!</DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="blue" onClick={handleOpen}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default Modal;
