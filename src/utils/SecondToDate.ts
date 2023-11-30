export function secondsToDateTime(seconds: number): string {
  const milliseconds = seconds * 1000;
  const dateTime = new Date(milliseconds);

  // Specify the time zone as 'Asia/Ho_Chi_Minh' for Vietnam Standard Time (ICT)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false, // Use 24-hour format
  };

  const formattedDateTime = dateTime.toLocaleString("en-US", options);
  return formattedDateTime;
}
