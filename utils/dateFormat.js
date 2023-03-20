const months = {
    short: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    long: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  function addDateSuffix(date) {
    const suffix =
      date === 1 || date === 21 || date === 31 ? "st" :
      date === 2 || date === 22 ? "nd" :
      date === 3 || date === 23 ? "rd" :
      "th";
  
    return `${date}${suffix}`;
  }
  
  function formatTimestamp(timestamp, options = {}) {
    const { monthLength = "short", dateSuffix = true } = options;
    const dateObj = new Date(timestamp);
    const months = monthLength === "long" ? long : short;
    const formattedMonth = months[dateObj.getMonth()];
    const formattedDate = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
    const formattedYear = dateObj.getFullYear();
    let formattedHour = dateObj.getHours() % 12;
    formattedHour = formattedHour === 0 ? 12 : formattedHour;
    const formattedMinutes = (dateObj.getMinutes() < 10 ? "0" : "") + dateObj.getMinutes();
    const periodOfDay = dateObj.getHours() >= 12 ? "pm" : "am";
    const formattedTimeStamp = `${formattedMonth} ${formattedDate}, ${formattedYear} at ${formattedHour}:${formattedMinutes} ${periodOfDay}`;
  
    return formattedTimeStamp;
  }
  
  module.exports = formatTimestamp;