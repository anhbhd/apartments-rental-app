import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { UserRow } from "./UsersList";

const { confirm } = Modal;

interface IPopupConfirmProps {
  title: string;
  danger: boolean;
  content: string;
  buttonName: string;
  buttonType: any;
  onActivateOrDeActivate: (user: UserRow) => Promise<void>;
}

const PopupConfirm: React.FC<IPopupConfirmProps> = ({
  title,
  danger,
  content,
  buttonName,
  buttonType,
  onActivateOrDeActivate,
}) => {
  const showPromiseConfirm = () => {
    confirm({
      title: title,
      icon: <ExclamationCircleFilled />,
      content: content,
      onOk: onActivateOrDeActivate,
      onCancel() {},
    });
  };
  return (
    <Button onClick={showPromiseConfirm} type={buttonType} danger={danger}>
      {buttonName}
    </Button>
  );
};

export default PopupConfirm;
