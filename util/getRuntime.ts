export function getRuntime(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }

  if (minutes > 0 || formattedTime === "") {
    formattedTime += `${minutes}m`;
  }

  return formattedTime;
}
