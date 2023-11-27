import AppItem from "./AppItem/AppItem";
import "./ApplicationsList.scss";
import { RentalApplication } from "../../../type/RentalApplication";
import { Option } from "../../../type/Option";

interface IApplicationsListProps {
  rentalApps: RentalApplication[];
  filter: Option;
}

const ApplicationsList = ({ rentalApps, filter }: IApplicationsListProps) => {
  return (
    <section className="apps-list">
      {rentalApps.length <= 0 && (
        <p className="empty">
          Currently, You do not have any requests/applications for renting any
          apartments in <strong>{filter.label} list</strong>
        </p>
      )}
      {rentalApps.map((app) => (
        <AppItem key={app.id} rentalApplication={app} />
      ))}
    </section>
  );
};

export default ApplicationsList;
