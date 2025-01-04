import {
  format,
  subDays,
  startOfWeek,
  endOfWeek,
  add,
  startOfYear,
  endOfYear,
  addYears,
} from "date-fns";

export const getAPIURL = (pageState) => {
  const currentDate = new Date();
  const currentDateFormatted = format(currentDate, "yyyy-MM-dd");
  const weekEndDate = format(endOfWeek(new Date()), "yyyy-MM-dd");

  switch (pageState) {
    case "Last 30 days": {
      const Last30DaysDate = format(subDays(currentDate, 30), "yyyy-MM-dd");
      return `https://api.rawg.io/api/games?dates=${Last30DaysDate},${currentDateFormatted}&key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40`;
    }
    case "This week": {
      const weekStartDate = format(startOfWeek(new Date()), "yyyy-MM-dd");

      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&dates=${weekStartDate},${weekEndDate}`;
    }
    case "Next week": {
      const weekEndDate = endOfWeek(currentDate);
      const nextWeekDate = add(weekEndDate, { days: 2 });
      const nextWeekStartDate = format(startOfWeek(nextWeekDate), "yyyy-MM-dd");
      const nextWeekEndDate = format(endOfWeek(nextWeekDate), "yyyy-MM-dd");
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&dates=${nextWeekStartDate},${nextWeekEndDate}`;
    }
    case "Best of the year": {
      const yearStartDate = format(startOfYear(currentDate), "yyyy-MM-dd");
      const yearEndDate = format(endOfYear(currentDate), "yyyy-MM-dd");
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&dates=${yearStartDate},${yearEndDate}&ordering=-added`;
    }
    case "Popular in 2026": {
      const nextYearDate = addYears(currentDate, 1);
      const nextYearStartDate = format(startOfYear(nextYearDate), "yyyy-MM-dd");
      const nextYearEndDate = format(startOfYear(nextYearDate), "yyyy-MM-dd");
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&dates=${nextYearStartDate},${nextYearEndDate}&ordering=-added`;
    }
    case "All time top": {
      const oldDate = new Date(1960, 1, 1);
      const oldDateFormatted = format(oldDate, "yyyy-MM-dd");
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&dates=${oldDateFormatted},${currentDateFormatted}&ordering=-added`;
    }
    case "PC": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&parent_platforms=1`;
    }
    case "PlayStation": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&parent_platforms=2`;
    }
    case "Xbox": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&parent_platforms=3`;
    }
    case "Nintendo Switch": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&parent_platforms=7`;
    }
    case "iOS": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&parent_platforms=5`;
    }
    case "Android": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&parent_platforms=8`;
    }
    case "Action": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&genres=4`;
    }
    case "Strategy": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&genres=10`;
    }
    case "RPG": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&genres=5`;
    }
    case "Shooter": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&genres=2`;
    }
    case "Adventure": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&genres=3`;
    }
    case "Puzzle": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&genres=7`;
    }
    case "Racing": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&genres=1`;
    }
    case "Sports": {
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&genres=15`;
    }
    default: {
      return "https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40";
    }
  }
};
