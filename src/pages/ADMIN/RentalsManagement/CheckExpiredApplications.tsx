import { useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { getDataCollection } from "../../../services/getDataCollection";
import { RentalApplication } from "../../../type/RentalApplication";
import { updateDocument } from "../../../services/updateDocument";
import { RentAppStatus } from "../../../common/constants/RentalAppStatus";

const CheckExpiredApplications = () => {
  useEffect(() => {
    const checkExpiredStatus = async () => {
      try {
        const [rentalApplicationsData] = await getDataCollection(
          "rentalApplications"
        );

        const now = Timestamp.now().seconds;

        (rentalApplicationsData as RentalApplication[]).forEach(async (doc) => {
          const endDate = doc.endDate.seconds;

          if (endDate < now) {
            await updateDocument("rentalApplications", doc.id as string, {
              status: RentAppStatus.EXPIRED,
            });
          }
        });
        console.log("run fake cronjob to check expired rental application");
      } catch (error) {
        console.error("Error checking expired applications:", error);
      }
    };
    checkExpiredStatus();
  }, []);

  return null;
};

export default CheckExpiredApplications;
