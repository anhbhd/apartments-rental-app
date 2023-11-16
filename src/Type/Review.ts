import { FirebaseDate } from "./Apartment";

export type Review = {
  id: string;
  apartmentId: string;
  comment: string;
  numberOfStars: number;
  userId: string;
  createdDate: FirebaseDate;
};
