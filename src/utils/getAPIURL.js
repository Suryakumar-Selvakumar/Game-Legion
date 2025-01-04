import { format, subDays } from "date-fns";

export const getAPIURL = (pageState) => {
  switch (pageState) {
    case "Last 30 days": {
      const currentDate = format(new Date(), "yyyy-MM-dd");
      const Last30DaysDate = subDays(currentDate, 30);
      return `https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40&${Last30DaysDate},${currentDate}`;
    }
    case "This week":
      return;
    case "Next week":
      return;
    case "Best of the year":
      return;
    case "Popular in 2026":
      return;
    case "All time top":
      return;
    case "Platforms":
      return;
    case "PC":
      return;
    case "PlayStation":
      return;
    case "Xbox":
      return;
    case "Nintendo Switch":
      return;
    case "iOS":
      return;
    case "Android":
      return;
    case "Genres":
      return;
    case "Action":
      return;
    case "Strategy":
      return;
    case "RPG":
      return;
    case "Shooter":
      return;
    case "Adventure":
      return;
    case "Puzzle":
      return;
    case "Racing":
      return;
    case "Sports":
      return;
    default:
      return "https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40";
  }
};
