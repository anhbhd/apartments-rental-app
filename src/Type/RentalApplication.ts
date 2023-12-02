import { FirebaseDate } from "./Apartment";

export type RentalApplication = {
  id?: string;
  tenantId: string;
  apartmentId: string;
  note: string;
  status: string;
  depositMoneyAtRentalTime: number;
  pricePerMoAtRentalTime: number;
  startDate: FirebaseDate;
  endDate: FirebaseDate;
  createdDate: FirebaseDate;
};
