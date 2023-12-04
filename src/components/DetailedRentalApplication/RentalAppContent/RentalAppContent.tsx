import { useEffect, useState } from "react";
import { RentalApplication } from "../../../Type/RentalApplication";
import { secondsToDateTime } from "../../../utils/SecondToDate";
import "./RentalAppContent.scss";
import { Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase_config";
import { User } from "../../../Type/User";
import { RentAppStatus } from "../../../common/constants/RentalAppStatus";
import FullLoadingScreen from "../../../utils/FullLoadingScreen/FullLoadingScreen";
import { toast } from "react-toastify";
import { getDocument } from "../../../services/getDocument";

interface IRentalAppContentProps {
  rental: RentalApplication;
  onSetRentalApp: (rentalApp: RentalApplication) => void;
}

const RentalAppContent = ({
  rental,
  onSetRentalApp,
}: IRentalAppContentProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchUserData() {
    const userData: User = await getDocument("users", rental?.tenantId);
    setUserData(userData);
    setIsLoading(false);
  }

  const handleCancelRequest = async () => {
    if (
      rental.status === RentAppStatus.PENDING ||
      rental.status === RentAppStatus.PROCESSING
    ) {
      try {
        const docRef = doc(db, `rentalApplications/${rental.id}`);
        await updateDoc(docRef, {
          status: RentAppStatus.CANCELED,
        });
        onSetRentalApp({
          ...rental,
          status: RentAppStatus.CANCELED,
        });
        toast.success("Cancel successfully", {
          autoClose: 1500,
          position: "bottom-right",
          style: {
            fontSize: "15px",
          },
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [rental?.tenantId]);

  return (
    <>
      {isLoading && <FullLoadingScreen />}
      {!isLoading && (
        <div className="rental-app-content">
          <div className="rental-app-content__info">
            <p className="line">
              <label>Created date</label>
              <span>{secondsToDateTime(rental?.createdDate.seconds)}</span>
            </p>
            <p className="line">
              <label>Start date</label>
              <span>{secondsToDateTime(rental?.startDate.seconds)}</span>
            </p>
            <p className="line">
              <label>End date</label>
              <span>{secondsToDateTime(rental?.endDate.seconds)}</span>
            </p>

            <p className="line">
              <label>Deposit (at rental time)</label>
              <span>{rental?.depositMoneyAtRentalTime} $</span>
            </p>
            <p className="line">
              <label>Price/month (at rental time)</label>
              <span>{rental?.pricePerMoAtRentalTime} $</span>
            </p>
            <p className="line">
              <label>Status</label>
              <span>{rental?.status}</span>
            </p>
            <div className="line">
              <label>Note</label>
              <p>{rental?.note || "N/A"}</p>
            </div>
          </div>
          <div className="rental-app-content__tenant-info">
            <p className="line">
              <label>Full name</label>
              <span>{userData?.fullName || "N/A"}</span>
            </p>

            <p className="line">
              <label>Year of birth</label>
              <span>{userData?.yearOfBirth}</span>
            </p>
            <p className="line">
              <label>Phone number</label>
              <span>{userData?.phoneNumber}</span>
            </p>
            <p className="line">
              <label>Email</label>
              <span>{userData?.email}</span>
            </p>
          </div>
          <div className="rental-app-content__apartment-info">
            <p>
              Click here to view the apartment information and terms of rental:
            </p>
            <Link to={`/apartments/${rental?.apartmentId}`}>
              Link to the apartment info
            </Link>
          </div>

          <div className="rental-app-content__actions">
            {(rental?.status === RentAppStatus.PENDING ||
              rental?.status === RentAppStatus.PROCESSING) && (
              <button onClick={handleCancelRequest}>Request to cancel</button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RentalAppContent;
