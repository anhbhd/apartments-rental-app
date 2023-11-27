import { useEffect, useState } from "react";

import "./MyRentalApplication.scss";
import Filter from "../../components/MyRentalApplication/Filter/Filter";
import ApplicationsList from "../../components/MyRentalApplication/ApplicationsList/ApplicationsList";
import Pagination from "../../components/ApartmentsList/Pagination/Pagination";
import { RentalApplication } from "../../type/RentalApplication";
import { useAuth } from "../../context/AuthContext";
import { mapCollectionToArrayObject } from "./../../utils/Mapper";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase_config";
import FullLoadingScreen from "../../utils/FullLoadingScreen/FullLoadingScreen";
import { Option } from "../../type/Option";

const MyRentalApplications = () => {
  const [rentalApps, setRentalApps] = useState<RentalApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState<Option>({
    value: "PENDING",
    label: "Pending",
  });
  useEffect(() => {
    const fetchRentalApps = async () => {
      const rentalAppsCollectionRef = collection(db, "rentalApplications");

      try {
        const q = query(
          rentalAppsCollectionRef,
          where("tenantId", "==", currentUser.uid)
        );

        const rentalApplicationCollectionSnapshot = await getDocs(q);
        let applicationsData: RentalApplication[] = mapCollectionToArrayObject(
          rentalApplicationCollectionSnapshot
        );
        applicationsData = applicationsData.filter(
          (app) => app.status === filter.value
        );
        setRentalApps(applicationsData);
        setLoading(false);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchRentalApps();
  }, [currentUser.uid, filter]);

  return (
    <main className="my-rental-app">
      <h3 className="my-rental-app__title">
        My <span>rental applications</span>
      </h3>
      <Filter setFilter={setFilter} selectedOption={filter} />
      {loading && <FullLoadingScreen />}

      {!loading && (
        <>
          <ApplicationsList filter={filter} rentalApps={rentalApps} />

          {/* {rentalApps.length > 6 && (
            <Pagination
              totalItems={0}
              itemsPerPage={0}
              onPageChange={function (page: number): void {
                throw new Error("Function not implemented.");
              }}
            />
          )} */}
        </>
      )}
    </main>
  );
};

export default MyRentalApplications;
