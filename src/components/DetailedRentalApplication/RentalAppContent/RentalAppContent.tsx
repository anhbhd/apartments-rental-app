import { useEffect, useState } from "react";
import { Apartment } from "../../../type/Apartment";
import { RentalApplication } from "../../../type/RentalApplication";
import { secondsToDateTime } from "../../../utils/SecondToDate";
import "./RentalAppContent.scss";
import { Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase_config";
import { User } from "../../../type/User";
import { RentAppStatus } from "../../../common/constants/RentalAppStatus";
import FullLoadingScreen from "../../../utils/FullLoadingScreen/FullLoadingScreen";

interface IRentalAppContentProps {
  rental: RentalApplication;
  onSetRentalApp: (rentalApp: RentalApplication) => void;
}

const RentalAppContent = ({
  rental,
  onSetRentalApp,
}: IRentalAppContentProps) => {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchRental() {
      const docSnapshot = await getDoc(
        doc(db, `apartments/${rental?.apartmentId}`)
      );
      if (!docSnapshot.exists) {
        console.log("No such document!");
      } else {
        setApartment({
          ...(docSnapshot.data() as Apartment),
          id: docSnapshot.id as string,
        });
      }
    }

    fetchRental();
  }, [rental?.apartmentId]);

  useEffect(() => {
    async function fetchRental() {
      const docSnapshot = await getDoc(doc(db, `users/${rental?.tenantId}`));
      if (!docSnapshot.exists) {
        console.log("No such document!");
      } else {
        setUserData({
          ...(docSnapshot.data() as User),
          id: docSnapshot.id as string,
        });
      }
    }

    fetchRental();
  }, [rental?.tenantId]);

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
        console.log("Document written");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };
  useEffect(() => {
    if (userData && apartment) {
      setIsLoading(false);
    }
  }, [apartment, userData]);
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
              <label>Deposit</label>
              <span>{apartment?.depositMoney} $</span>
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
              <label>Fullname</label>
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
