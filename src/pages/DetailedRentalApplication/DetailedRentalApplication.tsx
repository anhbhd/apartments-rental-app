import "./DetailedRentalApplication.scss";
import RentalAppContent from "../../components/DetailedRentalApplication/RentalAppContent/RentalAppContent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RentalApplication } from "../../Type/RentalApplication";
import { getDocument } from "../../services/getDocument";

const DetailedRentalApplication = () => {
  const location = useLocation();

  const [rental, setRental] = useState<RentalApplication | null>(null);
  const rentalAppId = location.pathname.split("/").pop();

  async function fetchRental() {
    const rentalApp: RentalApplication = await getDocument(
      "rentalApplications",
      rentalAppId as string
    );
    setRental(rentalApp);
  }
  useEffect(() => {
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
