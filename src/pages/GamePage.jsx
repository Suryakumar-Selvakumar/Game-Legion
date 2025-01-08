import { useParams } from "react-router-dom";

export function GamePage() {
  let params = useParams();

  console.log(params.gameId);

  return <h1>Hello</h1>;
}
