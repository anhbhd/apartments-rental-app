import React, { useState } from "react";

import Filterbar from "../../../components/ADMIN/RentalsManagement/Filterbar";
import { RentAppStatus } from "../../../common/constants/RentalAppStatus";
import RentalAppsList from "../../../components/ADMIN/RentalsManagement/RentalAppsList";

const RentalApplicationsManagement = () => {
  const [category, setCategory] = useState<string>(RentAppStatus.PENDING);

  const handleChangeCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  return (
    <>
      <div className="max-w-screen-xl bg-white">
        <h1 className="mt-20 mb-10 ml-5 text-2xl font-bold text-gray-900">
          Rental Applications Management
        </h1>
        <Filterbar
          initialSelect={RentAppStatus.PENDING}
          onSetCategory={handleChangeCategory}
        />
      </div>

      <RentalAppsList category={category} />

      {/* <Pagination /> */}
    </>
  );
};

export default RentalApplicationsManagement;
