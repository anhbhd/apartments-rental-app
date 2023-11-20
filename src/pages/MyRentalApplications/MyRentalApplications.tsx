import { useEffect, useState } from "react";

import "./MyRentalApplication.scss";
import Filter from "../../components/MyRentalApplication/Filter/Filter";
import ApplicationsList from "../../components/MyRentalApplication/ApplicationsList/ApplicationsList";
import Pagination from "../../components/ApartmentsList/Pagination/Pagination";
import { RentalApplication } from "../../type/RentalApplication";
import { useAuth } from "../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase_config";

const MyRentalApplications = () => {
  const [rentalApps, setRentalApps] = useState<RentalApplication[]>([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    const fetchRentalApps = async () => {
      const rentalAppsCollectionRef = collection(db, "rentalApplications");

      try {
        const applicationsData: RentalApplication[] = [];
        const q = query(
          rentalAppsCollectionRef,
          where("tenantId", "==", currentUser.uid)
        );

        const rentalApplicationCollectionSnapshot = await getDocs(q);
        rentalApplicationCollectionSnapshot.docs.forEach((doc) =>
          applicationsData.push({
            ...(doc.data() as RentalApplication),
            id: doc.id as string,
          })
        );

        setRentalApps(applicationsData);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchRentalApps();
  }, [currentUser.uid]);

  return (
    <main className="my-rental-app">
      <h3 className="my-rental-app__title">
        My <span>rental applications</span>
      </h3>
      <Filter />
      <ApplicationsList rentalApps={rentalApps} />
      {rentalApps.length > 6 && <Pagination />}
    </main>
  );
};

export default MyRentalApplications;
