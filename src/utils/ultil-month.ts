import { FirebaseDate } from "../Type/Apartment";

export function getMonthFromTimestamp(timestamp: FirebaseDate): number {
  const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  const month = date.getMonth() + 1; // getMonth() returns 0-based month

  return month;
}

export function getCurrentMonth(): number {
  const currentDate = new Date();
  const currentMonth: number = currentDate.getMonth() + 1;
  return currentMonth;
}
