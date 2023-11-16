import { FirebaseDate } from "./Apartment";

export type WishListItem = {
  id: string;
  apartmentId: string;
  userId: string;
  createdDate: FirebaseDate;
};
