export const setCurrentSortBy = (orderBy, currentSortBy) => {
  switch (orderBy) {
    case "Name":
      {
        if (currentSortBy === "High to Low" || currentSortBy === "New to Old") {
          return "Z to A";
        } else if (
          currentSortBy === "Low to High" ||
          currentSortBy === "Old to New"
        ) {
          return "A to Z";
        }
      }
      break;
    case "Release Date":
      {
        if (currentSortBy === "High to Low" || currentSortBy === "Z to A") {
          return "New to Old";
        } else if (
          currentSortBy === "Low to High" ||
          currentSortBy === "A to Z"
        ) {
          return "Old to New";
        }
      }
      break;
    case "Popularity":
      {
        if (
          currentSortBy === "New to Old" ||
          currentSortBy === "Z to A" ||
          currentSortBy === "High to Low"
        ) {
          return "High to Low";
        } else if (
          currentSortBy === "Old to New" ||
          currentSortBy === "A to Z" ||
          currentSortBy === "Low to High"
        ) {
          return "Low to High";
        }
      }
      break;
    case "Rating":
      {
        if (
          currentSortBy === "New to Old" ||
          currentSortBy === "Z to A" ||
          currentSortBy === "High to Low"
        ) {
          return "High to Low";
        } else if (
          currentSortBy === "Old to New" ||
          currentSortBy === "A to Z" ||
          currentSortBy === "Low to High"
        ) {
          return "Low to High";
        }
      }
      break;
  }
};
