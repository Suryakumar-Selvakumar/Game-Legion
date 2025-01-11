import { format, getYear, parse } from "date-fns";

function getFormattedDate(stringDate) {
  const dateObj = parse(stringDate, "yyyy-MM-dd", new Date());

  const year = getYear(dateObj);
  const month = format(dateObj, "MMM");
  const day = format(dateObj, "dd");

  return `${month} ${day}, ${year}`;
}

export default getFormattedDate;