export default function calculateTimeInFormat(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return "Invalid Input";
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedTime =
    hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(remainingSeconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(
          remainingSeconds
        ).padStart(2, "0")}`;

  return formattedTime;
}
