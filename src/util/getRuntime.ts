export const getRuntime = (time: number) => {
  const hours = Math.floor(time / 60);
  const remainingMinutes = time % 60;
  let formattedTime = "";

  if (hours > 0) {
    formattedTime += hours + "h ";
  }

  if (remainingMinutes > 0 || formattedTime === "") {
    formattedTime += remainingMinutes + "m";
  }

  return formattedTime;
};
