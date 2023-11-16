import { FirebaseDate } from "./Apartment";

export type RentalApplication = {
  id: string;
  tenantId: string;
  apartmentId: string;
  deposit: number;
  note: string;
  status: string;
  startDate: FirebaseDate;
  endDate: FirebaseDate;
  createdDate: FirebaseDate;
};
