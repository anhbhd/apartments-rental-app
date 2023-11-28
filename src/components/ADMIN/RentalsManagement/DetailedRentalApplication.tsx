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

const { Paragraph } = Typography;
interface IDetailedRentalApplicationProps {
  rentalApp: RentalAppRow;
  onChangeStatusRentalApp: (
    id: string,
    apartmentId: string,
    status: RentAppStatus
  ) => void;
  onExtendRentalPeriod: (id: string, apartmentId: string) => Promise<void>;
}

const DetailedRentalApplication: React.FC<IDetailedRentalApplicationProps> = ({
  rentalApp,
  onChangeStatusRentalApp,
  onExtendRentalPeriod,
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

  const textForOkBtn =
    rentalApp?.status === RentAppStatus.PENDING
      ? "Processing"
      : rentalApp?.status === RentAppStatus.PROCESSING
      ? "Confirm Rented"
      : rentalApp?.status === RentAppStatus.RENTING
      ? "Ok"
      : rentalApp?.status === RentAppStatus.EXPIRED
      ? "Move to cancel"
      : "Ok";

  const handleChangeStatusForApplication = () => {
    let targetStatus = "";
    switch (rentalApp.status) {
      case RentAppStatus.PENDING:
        targetStatus = RentAppStatus.PROCESSING;
        break;
      case RentAppStatus.PROCESSING:
        targetStatus = RentAppStatus.RENTING;
        break;
      case RentAppStatus.RENTING:
        targetStatus = "";
        break;
      case RentAppStatus.EXPIRED:
        targetStatus = RentAppStatus.CANCELED;
        break;
    }
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
        okText={textForOkBtn}
        onOk={handleChangeStatusForApplication}
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
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            {rentalApp.status === RentAppStatus.EXPIRED && (
              <Button
                onClick={() =>
                  onExtendRentalPeriod(rentalApp.id, rentalApp.apartmentId)
                }
              >
                Extend rental period
              </Button>
            )}
            <CancelBtn />
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
              <div>
                {secondsToDateTime(rentalApp.createdDate.seconds).toUTCString()}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className="font-bold">Start date</div>
            </Col>
            <Col span={15}>
              <div>
                {secondsToDateTime(rentalApp.startDate.seconds).toUTCString()}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className="font-bold">End date</div>
            </Col>
            <Col span={15}>
              <div>
                {secondsToDateTime(rentalApp.endDate.seconds).toUTCString()}
              </div>
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
