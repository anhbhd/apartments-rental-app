import { FirebaseDate } from "./Apartment";

export type RentalApplication = {
  id?: string;
  tenantId: string;
  apartmentId: string;
  note: string;
  status: string;
  startDate: FirebaseDate;
  endDate: FirebaseDate;
  createdDate: FirebaseDate;
};
