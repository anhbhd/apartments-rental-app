import { useEffect, useState } from "react";
import Card from "../../../components/ADMIN/Dashboard/Card";
import { User } from "../../../type/User";
import UsersChart from "../../../components/ADMIN/Dashboard/UsersChart";
import { getDataCollection } from "../../../services/getDataCollection";
import { Spin } from "antd";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase_config";

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  const [numberRentedApartments, setNumberRentedApartments] =
    useState<number>(0);
  const [
    numberAvailableForRentingApartments,
    setNumberAvailableForRentingApartments,
  ] = useState<number>(0);

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
    fetchUsers();
  }, []);
  return (
    <div className="pt-10 pr-10">
      <h2 className="font-bold text-2xl ">Dashboard</h2>
      {isLoading ? (
        <div className="w-full flex justify-center mt-40">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-5 mt-10">
            <Card value={users.length} label={"Total users"} imgIcon={""} />
            <Card
              value={numberRentedApartments}
              label={"Number of Rented apartments"}
              imgIcon={""}
            />
            <Card
              value={numberAvailableForRentingApartments}
              label={"Available for renting"}
              imgIcon={""}
            />
            <Card
              value={1000}
              label={"Estimate revenue of this month"}
              imgIcon={""}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-20">
            <div className="flex flex-col items-center">
              <UsersChart usersList={users} />
              <p className="font-bold italic mt-10 text-gray-500">
                User statistics within 6 months
              </p>
            </div>
            <div className="flex flex-col items-center">
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
