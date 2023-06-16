export function formatDate(date: any) {
  const createdAtDate = new Date(date);
  const formattedDate = `${createdAtDate.getDate()}/${
    createdAtDate.getMonth() + 1
  }/${createdAtDate.getFullYear()}`;
  const formattedTime = `${createdAtDate.getHours()}:${createdAtDate.getMinutes()}:${createdAtDate.getSeconds()}`;

  return formattedDate + " " + formattedTime;
}
