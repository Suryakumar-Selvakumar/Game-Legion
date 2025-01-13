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

export const getAPIURL = (pageState, orderBy, sortBy, searchInput, gameId) => {
  const currentDate = new Date();
  const currentDateFormatted = format(currentDate, "yyyy-MM-dd");
  const weekEndDate = format(endOfWeek(new Date()), "yyyy-MM-dd");
  let orderByFilter = "";

  switch (orderBy) {
    case "Popularity":
      orderByFilter = `&ordering=${
        sortBy === "Low to High" ? "added" : "-added"
      }`;
      break;
    case "Name":
      orderByFilter = `&ordering=${sortBy === "A to Z" ? "name" : "-name"}`;
      break;
    case "Release Date":
      orderByFilter = `&ordering=${
        sortBy === "Old to New" ? "released" : "-released"
      }`;
      break;
    case "Rating":
      orderByFilter = `&ordering=${
        sortBy === "Low to High" ? "rating" : "-rating"
      }`;
      break;
    default:
      orderByFilter = "";
      break;
  }

  switch (pageState) {
    case "Last 30 days": {
      const Last30DaysDate = format(subDays(currentDate, 30), "yyyy-MM-dd");
      return `https://api.rawg.io/api/games?dates=${Last30DaysDate},${currentDateFormatted}&key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40${orderByFilter}`;
    }
    case "This week": {
      const weekStartDate = format(startOfWeek(new Date()), "yyyy-MM-dd");

      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&dates=${weekStartDate},${weekEndDate}${orderByFilter}`;
    }
    case "Next week": {
      const weekEndDate = endOfWeek(currentDate);
      const nextWeekDate = add(weekEndDate, { days: 2 });
      const nextWeekStartDate = format(startOfWeek(nextWeekDate), "yyyy-MM-dd");
      const nextWeekEndDate = format(endOfWeek(nextWeekDate), "yyyy-MM-dd");
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&dates=${nextWeekStartDate},${nextWeekEndDate}${orderByFilter}`;
    }
    case "Best of the year": {
      const yearStartDate = format(startOfYear(currentDate), "yyyy-MM-dd");
      const yearEndDate = format(endOfYear(currentDate), "yyyy-MM-dd");
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&dates=${yearStartDate},${yearEndDate}&ordering=-added`;
    }
    case "Popular in 2026": {
      const nextYearDate = addYears(currentDate, 1);
      const nextYearStartDate = format(startOfYear(nextYearDate), "yyyy-MM-dd");
      const nextYearEndDate = format(startOfYear(nextYearDate), "yyyy-MM-dd");
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&dates=${nextYearStartDate},${nextYearEndDate}&ordering=-added`;
    }
    case "All time top": {
      const oldDate = new Date(1960, 1, 1);
      const oldDateFormatted = format(oldDate, "yyyy-MM-dd");
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&dates=${oldDateFormatted},${currentDateFormatted}&ordering=-added`;
    }
    case "PC": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&parent_platforms=1${orderByFilter}`;
    }
    case "PlayStation": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&parent_platforms=2${orderByFilter}`;
    }
    case "Xbox": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&parent_platforms=3${orderByFilter}`;
    }
    case "Nintendo Switch": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&parent_platforms=7${orderByFilter}`;
    }
    case "MacOS": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&parent_platforms=5${orderByFilter}`;
    }
    case "Android": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&parent_platforms=8${orderByFilter}`;
    }
    case "Action": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=4${orderByFilter}`;
    }
    case "Strategy": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=10${orderByFilter}`;
    }
    case "RPG": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=5${orderByFilter}`;
    }
    case "Shooter": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=2${orderByFilter}`;
    }
    case "Adventure": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=3${orderByFilter}`;
    }
    case "Puzzle": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=7${orderByFilter}`;
    }
    case "Racing": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=1${orderByFilter}`;
    }
    case "Sports": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=15${orderByFilter}`;
    }
    case "Indie": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=51${orderByFilter}`;
    }
    case "Casual": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=40${orderByFilter}`;
    }
    case "Simulation": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=14${orderByFilter}`;
    }
    case "Arcade": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=11${orderByFilter}`;
    }
    case "Platformer": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=83${orderByFilter}`;
    }
    case "Multiplayer": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=59${orderByFilter}`;
    }
    case "Fighting": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=6${orderByFilter}`;
    }
    case "Family": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=19${orderByFilter}`;
    }
    case "Board Games": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=28${orderByFilter}`;
    }
    case "Educational": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=34${orderByFilter}`;
    }
    case "Card": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&genres=17${orderByFilter}`;
    }
    case "preview": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=8&search=${searchInput}&search_precise=false`;
    }
    case "Results": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40&search=${searchInput}&search_precise=false${orderByFilter}`;
    }
    case "Game": {
      return `https://api.rawg.io/api/games/${gameId}?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a`;
    }
    case "Screenshots": {
      return `https://api.rawg.io/api/games/${gameId}/screenshots?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a`;
    }
    case "genres": {
      return "https://api.rawg.io/api/genres?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a";
    }
    case "default": {
      return `https://api.rawg.io/api/games?key=af39f74fcc0b4b60b7b5fc7bb2a97e2a&page_size=40${orderByFilter}`;
    }
  }
};
