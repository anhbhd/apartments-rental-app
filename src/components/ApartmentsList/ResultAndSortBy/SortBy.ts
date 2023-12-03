import { Option } from "../../../Type/Option";

export enum SortBy {
  ALL = "ALL",
  NEWEST = "NEWEST",
  OLDEST = "OLDEST",
  LOWTOHIGHPRICE = "LOWTOHIGHPRICE",
  HIGHTOLOWPRICE = "HIGHTOLOWPRICE",
}

export const sortBySelection: Option[] = [
  { label: "All", value: SortBy.ALL },
  { label: "Posted: Newest", value: SortBy.NEWEST },
  { label: "Posted: Oldest", value: SortBy.OLDEST },
  { label: "Price: Low to high", value: SortBy.LOWTOHIGHPRICE },
  { label: "Price: High to low", value: SortBy.HIGHTOLOWPRICE },
];
