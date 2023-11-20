import "./DetailedRentalApplication.scss";
import RentalAppContent from "../../components/DetailedRentalApplication/RentalAppContent/RentalAppContent";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase_config";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { RentalApplication } from "../../type/RentalApplication";

const DetailedRentalApplication = () => {
  const location = useLocation();

  const rentalAppId = location.pathname.split("/").pop();

  const [rental, setRental] = useState<RentalApplication | null>(null);

  useEffect(() => {
    async function fetchRental() {
      const docSnapshot = await getDoc(
        doc(db, `rentalApplications/${rentalAppId}`)
      );
      if (!docSnapshot.exists) {
        console.log("No such document!");
      } else {
        setRental({
          ...(docSnapshot.data() as RentalApplication),
          id: docSnapshot.id as string,
        });
      }
    }

    fetchRental();
  }, [rentalAppId]);

  return (
    <main className="detailed-rental-app">
      <h3 className="detailed-rental-app__title">
        <span>Detailed</span> Application/Request
      </h3>
      <RentalAppContent
        onSetRentalApp={setRental}
        rental={rental as RentalApplication}
      />
    </main>
  );
};

export default DetailedRentalApplication;
