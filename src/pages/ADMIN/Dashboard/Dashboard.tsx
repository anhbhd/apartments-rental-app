import { useEffect, useState } from "react";
import Card from "../../../components/ADMIN/Dashboard/Card";
import { User } from "../../../Type/User";
import UsersChart from "../../../components/ADMIN/Dashboard/UsersChart";
import { getDataCollection } from "../../../services/getDataCollection";
import { Spin } from "antd";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase_config";
import { RentalApplication } from "../../../Type/RentalApplication";
import { mapCollectionToArrayObject } from "../../../utils/Mapper";
import RevenueChart from "../../../components/ADMIN/Dashboard/RevenueChart";
import { useAuth } from "../../../context/AuthContext";
import RentedIcon from "../../../icons/RentedIcon";
import AvailableForRentingIcon from "../../../icons/AvailableForRentingIcon";
import RevenueIcon from "../../../icons/RevenueIcon";
import DashboardUsersIcon from "../../../icons/DashboardUsersIcon";

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  const [numberRentedApartments, setNumberRentedApartments] =
    useState<number>(0);
  const [
    numberAvailableForRentingApartments,
    setNumberAvailableForRentingApartments,
  ] = useState<number>(0);

  const [rentingRentalAppsThisYear, setRentingRentalAppsThisYear] = useState<
    RentalApplication[]
  >([]);

  const [revenueThisMonth, setRevenueThisMonth] = useState<number>(0);

  const fetchRentingRentalApplicationsDataCurrentYear = async () => {
    const rentalAppsRef = collection(db, "rentalApplications");

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Set the start and end timestamps for the current year
    const startOfYear = new Date(`${currentYear}-01-01T00:00:00`).getTime();
    // Construct the query
    let q = query(
      rentalAppsRef,
      where("contractSigned", "==", true),
      where("endDate", ">=", Timestamp.fromMillis(startOfYear))
    );

    // Execute the query
    const rentalAppsData = await getDocs(q);

    // Convert the result to an array of objects
    let rentalApps = mapCollectionToArrayObject(rentalAppsData);

    // Set the rental applications for this year in your state or wherever needed
    setRentingRentalAppsThisYear(rentalApps as RentalApplication[]);
  };

  const fetchApartmentsData = async () => {
    const apartmentsRef = collection(db, "apartments");
    let total = (await getDocs(apartmentsRef)).size;
    const q = query(apartmentsRef, where("rented", "==", true));
    const numberOfRentedApartments = (await getDocs(q)).size;
    setNumberRentedApartments(numberOfRentedApartments);
    setNumberAvailableForRentingApartments(total - numberOfRentedApartments);
  };

  const fetchUsers = async () => {
    const [users] = await getDataCollection("users");
    setUsers(users as User[]);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchApartmentsData();
    fetchRentingRentalApplicationsDataCurrentYear();
    fetchUsers();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    const startOfMonthThisYear = new Date(
      currentDate.getFullYear(),
      currentMonth - 1,
      1
    ); // Start of the current month

    // Filter rental applications for the current month or later
    const rentalAppsThisMonth = rentingRentalAppsThisYear.filter((app) => {
      const endDate = new Date(app.endDate.seconds * 1000);
      return endDate >= startOfMonthThisYear;
    });

    // Calculate revenue for the current month
    const totalRevenueThisMonth = rentalAppsThisMonth.reduce((total, app) => {
      // Your revenue calculation logic here, for example, using app.pricePerMoAtRentalTime or any other property
      return total + app.pricePerMoAtRentalTime; // Update this based on your actual data structure
    }, 0);

    setRevenueThisMonth(totalRevenueThisMonth);
  }, [rentingRentalAppsThisYear]);

  return (
    <div className="pt-10 pr-10">
      <h2 className="font-bold text-2xl ">
        Welcome,{" "}
        <span className="italic font-light">{currentUser.email} !</span>{" "}
      </h2>
      {isLoading ? (
        <div className="w-full flex justify-center mt-40">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-5 mt-10">
            <Card
              value={users.length}
              label={"Total users"}
              imgIcon={<DashboardUsersIcon height="40" width="50" />}
            />
            <Card
              value={numberRentedApartments}
              label={"Number of Rented apartments"}
              imgIcon={<RentedIcon height="40" width="50" />}
            />
            <Card
              value={numberAvailableForRentingApartments}
              label={"Available for renting"}
              imgIcon={<AvailableForRentingIcon height="40" width="50" />}
            />
            <Card
              value={`$ ${revenueThisMonth}`}
              label={"Estimate revenue of this month"}
              imgIcon={<RevenueIcon height="40" width="50" />}
            />
          </div>
          <div className="grid grid-cols-5 gap-10 mb-10 mt-20">
            <div className="flex flex-col col-span-3 items-center">
              <RevenueChart
                rentingRentalAppsThisYear={rentingRentalAppsThisYear}
              />
              <p className=" font-bold italic mt-10 text-gray-500">
                Revenue statistics this year so far
              </p>
            </div>
            <div className="col-span-2 flex flex-col justify-between items-center">
              <UsersChart usersList={users} />
              <p className="font-bold italic mt-10 text-gray-500">
                User statistics within 6 months
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
