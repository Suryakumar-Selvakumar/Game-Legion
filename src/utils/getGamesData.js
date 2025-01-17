import { getGamesPrice } from "./getGamesPrice";

export const getGamesData = async (url, signal = null, state) => {
  const response = await fetch(url, {
    mode: "cors",
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  const games = await response.json();

  if (state !== "game")
    if (!games.results || !Array.isArray(games.results)) {
      return [];
    }

  if (state === "games") {
    return games.results.map((gameObj) => {
      return {
        id: gameObj.id,
        name: gameObj.name,
        image: gameObj.background_image,
        platforms: gameObj.parent_platforms?.map(
          (platform) => platform.platform.name
        ),
        price: Number(getGamesPrice(gameObj.ratings)),
      };
    });
  }

  if (state === "game") {
    const {
      name,
      description_raw,
      website,
      released,
      genres,
      parent_platforms,
      developers,
      background_image,
      publishers,
      ratings,
      esrb_rating,
      id,
      ...rest
    } = games;

    return {
      name,
      description: description_raw,
      website,
      released,
      genres: genres.map((genre) => genre.name),
      platforms: parent_platforms?.map((platform) => platform.platform.name),
      developers: developers?.map((dev) => dev.name),
      background_image,
      publishers: publishers?.map((pub) => pub.name),
      price: Number(getGamesPrice(ratings)),
      ageRating: esrb_rating?.name,
      id,
    };
  }

  if (state === "screenshot") {
    return games.results.map((image) => {
      return image.image;
    });
  }

  if (state === "genres") {
    return games.results.map((genre) => {
      return {
        games: genre.games.map((game) => game.id),
      };
    });
  }
};
