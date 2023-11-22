import { SortBy } from "../components/ApartmentsList/ResultAndSortBy/SortBy";

export type FilterbarType = {
  sortby: SortBy;
  keyword: string;
  categories: string[];
  price: {
    from: number;
    to: number;
  };
  stars: number;
  cityCode: number;
  districtCode: number;
};