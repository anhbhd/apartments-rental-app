import React, { useEffect, useState } from "react";
import "./ApartmentsList.scss";

import Filterbar from "../../components/ApartmentsList/Filterbar/Filterbar";
import ApartmentsListResult from "../../components/ApartmentsList/ApartmentsListResult/ApartmentsListResult";
import Pagination from "../../components/ApartmentsList/Pagination/Pagination";
import { db } from "../../config/firebase_config";
import { collection, getDocs } from "@firebase/firestore";

const ApartmentsList: React.FC = () => {
  // const [users, setUsers] = useState<any[]>([]);
  // const usersCollectionRef = collection(db, "users");
  // useEffect(() => {
  //   const getApartments = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     console.log(data);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     console.log(users);
  //   };
  //   getApartments();
  // }, []);

  return (
    <main className="aparments-list">
      <div className="aparments-list__textheader">
        <h3 className="header--bigtext">Available apartments for rent</h3>
        <p className="header--smalltext">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="aparments-list__main-content">
        <Filterbar />
        <ApartmentsListResult />
      </div>

      <nav className="aparments-list__pagination">
        <Pagination />
      </nav>
    </main>
  );
};

export default ApartmentsList;
