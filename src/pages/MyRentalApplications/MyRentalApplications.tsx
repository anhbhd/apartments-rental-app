import { useEffect, useState } from "react";

import "./MyRentalApplication.scss";
import Filter from "../../components/MyRentalApplication/Filter/Filter";
import ApplicationsList from "../../components/MyRentalApplication/ApplicationsList/ApplicationsList";
import { RentalApplication } from "../../Type/RentalApplication";
import { useAuth } from "../../context/AuthContext";
import { mapCollectionToArrayObject } from "./../../utils/Mapper";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase_config";
import FullLoadingScreen from "../../utils/FullLoadingScreen/FullLoadingScreen";
import { Option } from "../../Type/Option";
import Pagination from "../../components/ApartmentsList/Pagination/Pagination";
import { paginate } from "../../utils/paginate";

const MyRentalApplications = () => {
  const [rentalApps, setRentalApps] = useState<RentalApplication[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState<Option>({
    value: "",
    label: "All",
  });
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rentalAppDisplayed, setRentalAppsDisplayed] = useState<
    RentalApplication[]
  >([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchRentalApps = async () => {
      setLoading(true);
      const rentalAppsCollectionRef = collection(db, "rentalApplications");

      try {
        const q = query(
          rentalAppsCollectionRef,
          where("tenantId", "==", currentUser.uid)
        );

        const rentalApplicationCollectionSnapshot = await getDocs(q);
        setTotalItems(rentalApplicationCollectionSnapshot.size);
        let applicationsData: RentalApplication[] = mapCollectionToArrayObject(
          rentalApplicationCollectionSnapshot
        );
        if (filter.value) {
          applicationsData = applicationsData.filter(
            (app) => app.status === filter.value
          );
        }
        setRentalApps(applicationsData);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchRentalApps();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentUser, filter.value]);

  function handlePageChange(page: number): void {
    setCurrentPage(page);
  }

  useEffect(() => {
    setRentalAppsDisplayed(paginate(rentalApps, currentPage, itemsPerPage));
  }, [currentPage, rentalApps]);

  return (
    <main className="my-rental-app">
      <h3 className="my-rental-app__title">
        My <span>rental applications</span>
      </h3>
      <Filter setFilter={setFilter} selectedOption={filter} />
      {loading && <FullLoadingScreen />}

      {!loading && (
        <>
          <ApplicationsList filter={filter} rentalApps={rentalAppDisplayed} />

          {rentalAppDisplayed.length > itemsPerPage && (
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              initialPage={1}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </main>
  );
};

export default MyRentalApplications;
