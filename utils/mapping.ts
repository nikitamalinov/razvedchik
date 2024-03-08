import moment from "moment-timezone";

function convertMonth(month: string) {
  switch (parseInt(month)) {
    case 1:
      return "January";
    case 2:
      return "Febuary";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "Augest";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    default:
      return "December";
  }
}

function convertHoursMinutes(time: string) {
  time = time.split("T")[1];
  let hours = parseInt(time.split(":")[0]);
  let minutes = time.split(":")[1];

  let ampm = "am";
  if (hours > 12) {
    hours -= 12;
    ampm = "pm";
  }
  return `${hours}:${minutes}${ampm}`;
}

function addDateSuffix(day: number) {
  if (day === 1 || day === 21 || day === 31) {
    return `${day}st`;
  } else if (day === 2 || day === 22) {
    return `${day}nd`;
  } else if (day === 3 || day === 23) {
    return `${day}rd`;
  } else {
    return `${day}th`;
  }
}

function convertDayOfWeek(day: number) {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuseday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    default:
      return "Saturday";
  }
}

function convertYearMonthDay(date: string) {
  date = date.split("T")[0];
  let year = date.split("-")[0];
  let month = date.split("-")[1];
  let day = date.split("-")[2];
  const dateObject = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day)
  );
  const dayOfWeekInt = dateObject.getDay();
  const dayOfWeek = convertDayOfWeek(dayOfWeekInt);
  month = convertMonth(month);
  day = addDateSuffix(parseInt(day));
  return `${dayOfWeek}, ${month} ${day}, ${year}`;
}

function convertMonthDay(date: string) {
  date = date.split("T")[0];
  let year = date.split("-")[0];
  let month = date.split("-")[1];
  let day = date.split("-")[2];
  const dateObject = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day)
  );
  const dayOfWeekInt = dateObject.getDay();
  const dayOfWeek = convertDayOfWeek(dayOfWeekInt);
  month = convertMonth(month);
  day = addDateSuffix(parseInt(day));
  return `${dayOfWeek}, ${month} ${day}`;
}

function convertYear(date: string) {
  let year = date.split("-")[0];
  return year;
}

export function convertDate(from: string, to: string) {
  from = moment(from).tz("America/Los_Angeles").format("YYYY-MM-DDTHH:mm");
  to = moment(to).tz("America/Los_Angeles").format("YYYY-MM-DDTHH:mm");

  let isSameDate = from.split("T")[0] === to.split("T")[0];
  if (isSameDate) {
    return (
      convertYearMonthDay(from) +
      " " +
      convertHoursMinutes(from) +
      " - " +
      convertHoursMinutes(to)
    );
  }

  return (
    convertMonthDay(from) +
    " " +
    convertHoursMinutes(from) +
    " - " +
    convertMonthDay(to) +
    " " +
    convertHoursMinutes(to) +
    " " +
    convertYear(to)
  );
}
