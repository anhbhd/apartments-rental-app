import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Tag } from "antd";
import { RentalAppRow } from "./RentalAppsList";
import { secondsToDateTime } from "../../../utils/SecondToDate";
import { Apartment } from "../../../type/Apartment";
import { User } from "../../../type/User";
import { RentAppStatus } from "../../../common/constants/RentalAppStatus";
import { Typography } from "antd";
import { updateDocument } from "../../../services/updateDocument";
import { getDocument } from "../../../services/getDocument";
import { Link } from "react-router-dom";
import ActionDialogButton from "./ActionsWithDialog/ActionDialogButton";

const { Paragraph } = Typography;
interface IDetailedRentalApplicationProps {
  rentalApp: RentalAppRow;
  onChangeStatusRentalApp: (
    id: string,
    apartmentId: string,
    status: RentAppStatus
  ) => void;
  onExtendRentalPeriod: (id: string, apartmentId: string) => Promise<void>;
  onCancelPendingOrProcessing: (id: string) => Promise<void>;
  handleCancelRentingOrExpired: (
    rentalAppId: string,
    apartmentId: string
  ) => Promise<void>;
}

const DetailedRentalApplication: React.FC<IDetailedRentalApplicationProps> = ({
  rentalApp,
  onChangeStatusRentalApp,
  onExtendRentalPeriod,
  onCancelPendingOrProcessing,
  handleCancelRentingOrExpired,
}) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const [apartment, setApartment] = useState<Apartment>();
  const [note, setNote] = useState(rentalApp.note);

  const fetchUserInfo = async () => {
    const userInfo: User = await getDocument("users", rentalApp.tenantId);
    setUser(userInfo);
  };

  const fetchApartmentInfo = async () => {
    const apartmentInfo: Apartment = await getDocument(
      "apartments",
      rentalApp.apartmentId
    );

    setApartment(apartmentInfo);
  };

  useEffect(() => {
    fetchUserInfo();
    fetchApartmentInfo();
  }, [rentalApp]);

  const handleChangeNoteRentalApp = async (note: string) => {
    setNote(note);
    await updateDocument("rentalApplications", rentalApp.id, {
      note: note,
    });
  };

  const handleChangeStatusForApplication = (targetStatus: RentAppStatus) => {
    onChangeStatusRentalApp(
      rentalApp.id,
      rentalApp.apartmentId,
      targetStatus as RentAppStatus
    );
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Details
      </Button>
      <Modal
        title={`Detailed Rental Application`}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        okButtonProps={
          rentalApp.status === RentAppStatus.EXPIRED
            ? {
                className: "ant-btn-dangerous",
              }
            : {
                className: "",
              }
        }
        width={800}
        footer={(_, { OkBtn }) => (
          <>
            {/* cancel the contract if user want to cancel */}
            {(rentalApp.status === RentAppStatus.EXPIRED ||
              rentalApp.status === RentAppStatus.RENTING) && (
              <ActionDialogButton
                cancelButtonType="primary"
                buttonName={"Cancel contract"}
                onConfirmation={() => {
                  handleCancelRentingOrExpired(
                    rentalApp.id,
                    rentalApp.apartmentId
                  );
                  setOpen(false);
                }}
                type={"dashed"}
                title={"Cancel contract?"}
                danger={true}
                contentOfModal={
                  "Confirm that you and the customer agree to cancel contract?"
                }
              />
            )}
            {/* extend rental period for user */}
            {rentalApp.status === RentAppStatus.EXPIRED && (
              <ActionDialogButton
                cancelButtonType="primary"
                buttonName={"Extend rental period"}
                onConfirmation={() => {
                  onExtendRentalPeriod(rentalApp.id, rentalApp.apartmentId);
                  setOpen(false);
                }}
                type={"dashed"}
                title={"Extend rental period?"}
                danger={false}
                contentOfModal={
                  "Confirm that you and the customer agree to extend the rental period?"
                }
              />
            )}

            {/* move this one to cancel list if 2 parties did not find an agreement */}
            {(rentalApp.status === RentAppStatus.PENDING ||
              rentalApp.status === RentAppStatus.PROCESSING) && (
              <ActionDialogButton
                cancelButtonType="primary"
                buttonName={"Move to cancel list"}
                onConfirmation={() => {
                  onCancelPendingOrProcessing(rentalApp.id);
                  setOpen(false);
                }}
                type={"primary"}
                title={`Are you sure to remove this application from ${rentalApp.status} list?`}
                danger={true}
                contentOfModal={
                  "Confirm that you want to move this to cancel list"
                }
              />
            )}

            {/* button to move the application from pending to processing list */}
            {rentalApp.status === RentAppStatus.PENDING && (
              <ActionDialogButton
                cancelButtonType="text"
                buttonName={"Processing"}
                onConfirmation={() => {
                  handleChangeStatusForApplication(RentAppStatus.PROCESSING);
                  setOpen(false);
                }}
                type={"default"}
                title={"Move on to processing?"}
                danger={false}
                contentOfModal={
                  "Confirm that you are going to process this application (making a phone call to discuss with the customer)?"
                }
              />
            )}
            {/* button to move the application from processing to renting list */}
            {rentalApp.status === RentAppStatus.PROCESSING && (
              <ActionDialogButton
                cancelButtonType="text"
                buttonName={"Confirm for Renting"}
                onConfirmation={() => {
                  handleChangeStatusForApplication(RentAppStatus.RENTING);
                  setOpen(false);
                }}
                type={"default"}
                title={"Confirm that user will rent this apartment?"}
                danger={false}
                contentOfModal={
                  "Confirm that you and the customer have discussed through the phone and made an agreement?"
                }
              />
            )}

            <OkBtn />
          </>
        )}
      >
        <div className="max-h-96  py-10">
          <Row>
            <Col span={5}>
              <div className="font-bold">ID</div>
            </Col>
            <Col span={15}>
              <div>{rentalApp.id}</div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className="font-bold">Created date</div>
            </Col>
            <Col span={15}>
              <div>{secondsToDateTime(rentalApp.createdDate.seconds)}</div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className="font-bold">Start date</div>
            </Col>
            <Col span={15}>
              <div>{secondsToDateTime(rentalApp.startDate.seconds)}</div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className="font-bold">End date</div>
            </Col>
            <Col span={15}>
              <div>{secondsToDateTime(rentalApp.endDate.seconds)}</div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className="font-bold">Customer name</div>
            </Col>
            <Col span={15}>
              <div>{rentalApp.customerName}</div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className="font-bold">Year of Birth</div>
            </Col>
            <Col span={15}>
              <div>{user?.yearOfBirth}</div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className="font-bold">Phone number</div>
            </Col>
            <Col span={15}>
              <div>{user?.phoneNumber}</div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className="font-bold">Email</div>
            </Col>
            <Col span={15}>
              <div>{user?.email}</div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className="font-bold">Deposit</div>
            </Col>
            <Col span={15}>
              <div>
                <Tag bordered={false} color="processing">
                  $ {apartment?.depositMoney}
                </Tag>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className="font-bold">Status</div>
            </Col>
            <Col span={15}>
              <Tag
                bordered={false}
                color={
                  rentalApp?.status === RentAppStatus.PENDING
                    ? "warning"
                    : rentalApp?.status === RentAppStatus.PROCESSING
                    ? "processing"
                    : rentalApp?.status === RentAppStatus.RENTING
                    ? "success"
                    : rentalApp?.status === RentAppStatus.EXPIRED
                    ? "orange"
                    : "error"
                }
              >
                <div>{rentalApp?.status}</div>
              </Tag>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className="font-bold">Note</div>
            </Col>
            <Col span={15}>
              <div>
                <Paragraph
                  editable={{
                    onChange: handleChangeNoteRentalApp,
                    maxLength: 50,
                    autoSize: { maxRows: 5, minRows: 3 },
                  }}
                >
                  {note || "N/A"}
                </Paragraph>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <div className="font-semibold text-blue-500">
                <Link to={`/apartments/${apartment?.id}`}>
                  Link to the Apartment info and Rental terms
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <div className="font-semibold text-red-200  ">
                <Link to={`/admin/apartments/add_or_edit/${apartment?.id}`}>
                  Link to edit apartment info
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default DetailedRentalApplication;
