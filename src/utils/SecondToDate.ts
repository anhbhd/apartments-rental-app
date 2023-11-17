export function secondsToDateTime(seconds: number): Date {
  const milliseconds = seconds * 1000;
  const dateTime = new Date(milliseconds);
  return dateTime;
}
