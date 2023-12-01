import { SortBy } from "../components/ApartmentsList/ResultAndSortBy/SortBy";

export type FilterbarType = {
  sortby: SortBy;
  keyword: string;
  categories: string[];
  price: {
    from: { value: string; displayValue: string };
    to: { value: string; displayValue: string };
  };
  canBeRented: string;
  stars: number;
  cityCode: number;
  districtCode: number;
};
