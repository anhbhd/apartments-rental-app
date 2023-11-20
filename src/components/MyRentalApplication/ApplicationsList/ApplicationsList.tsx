import AppItem from "./AppItem/AppItem";
import "./ApplicationsList.scss";
import { RentalApplication } from "../../../type/RentalApplication";

interface IApplicationsListProps {
  rentalApps: RentalApplication[];
}

const ApplicationsList = ({ rentalApps }: IApplicationsListProps) => {
  return (
    <section className="apps-list">
      {rentalApps.length <= 0 && (
        <p className="empty">
          Currently, You do not have any requests/applications for renting any
          apartments
        </p>
      )}
      {rentalApps.map((app) => (
        <AppItem key={app.id} rentalApplication={app} />
      ))}
    </section>
  );
};

export default ApplicationsList;
