function getTimestamp() {
  let today = new Date;
  let date = today.getDate();
  let month = (today.getMonth() + 1); //January is 0!
  let year = today.getFullYear();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();

  //YYYYMMDD_HHMMSS
  return`${year}${pad(month)}${pad(date)}_${pad(hour)}${pad(minute)}${pad(second)}`;
}

function pad(value, totalWidth=2, paddingChar='0') {
  return value.toString().padStart(totalWidth, paddingChar);
}