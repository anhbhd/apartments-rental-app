import { Button, Modal } from "antd";
import React, { useState } from "react";

interface IActionDialogButtonProps {
  buttonName: string;
  onConfirmation: () => void;
  type: "link" | "text" | "primary" | "default" | "dashed" | undefined;
  title: string;
  contentOfModal: string;
  danger?: boolean;

  cancelButtonType:
    | "link"
    | "text"
    | "primary"
    | "default"
    | "dashed"
    | undefined;
}

const ActionDialogButton: React.FC<IActionDialogButtonProps> = ({
  buttonName,
  onConfirmation,
  type,
  title,
  contentOfModal,
  danger,
  cancelButtonType,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    onConfirmation();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button danger={danger} type={type} onClick={showModal}>
        {buttonName}
      </Button>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        okType={danger ? "danger" : "primary"}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelButtonProps={{
          type: cancelButtonType,
        }}
      >
        <p>{contentOfModal}</p>
      </Modal>
    </>
  );
};

export default ActionDialogButton;
