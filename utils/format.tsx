export const formatTime = (dateString: string) => {
  if (dateString == null) return null;
  const now = new Date();
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);

  const specificDate = new Date(year, month - 1, day, hour, minute, second);

  const timeDifference = specificDate.getTime() - now.getTime();

  const seconds = Math.abs(Math.floor(timeDifference / 1000));
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} ngày`;
  } else if (hours > 0) {
    return `${hours} giờ`;
  } else {
    return `${minutes} phút`;
  }
};


export const formatTimeMess = (dateString: string)=>{
const date = new Date(dateString);

const formattedDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

return formattedDate
}