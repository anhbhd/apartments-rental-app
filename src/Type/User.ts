import { FirebaseDate } from "./Apartment";

export type User = {
  id: string;
  fullName?: string;
  gender?: string;
  phoneNumber?: string;
  password?: string;
  avatarUrl?: string;
  isAdmin?: boolean;
  email: string;
  createdDate: FirebaseDate;
};
