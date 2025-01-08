// hooks
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// utils
import { getAPIURL } from "../utils/getAPIURL";
import { getGamesData } from "../utils/getGamesData";

export function GamePage() {
  let params = useParams();

  // states
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [screenShotsData, setScreenShotsData] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const fetchedGameData = await getGamesData(
          getAPIURL("Game", "", "", "", params.gameId),
          null,
          "game"
        );
        const fetchedScreenShotsData = await getGamesData(
          getAPIURL("Screenshots", "", "", "", params.gameId),
          null,
          "screenshot"
        );
        setGameData(fetchedGameData);

        fetchedScreenShotsData.unshift(fetchedGameData.background_image);
        setScreenShotsData(fetchedScreenShotsData);

        setError(null);
        console.log(fetchedScreenShotsData);
        console.log(fetchedGameData);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Aborted");
          return;
        }
        setGameData(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();

    console.log(screenShotsData);
    console.log(gameData);
  }, []);

  return <h1>Hello</h1>;
}
