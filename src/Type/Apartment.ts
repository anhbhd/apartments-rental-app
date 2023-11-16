export type FirebaseDate = {
  seconds: number;
  nanoseconds: number;
};

export type Apartment = {
  id: string;
  area: number;
  avatar: string;
  categoryId: string;
  city: string;
  createdDate: FirebaseDate;
  detailedAddress: string;
  detailedDescription: string;
  direction: string;
  district: string;
  frontWidth: number;
  name: string;
  numberOfFloors: number;
  owner: string;
  ownerPhoneNumber: string;
  pricePerMonth: number;
  rented: boolean;
  yearBuild: string;
  images: string[];
  terms: string[];
  baths: number;
  beds: number;
};
