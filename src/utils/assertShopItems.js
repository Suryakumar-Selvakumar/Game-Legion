import { screen } from "@testing-library/react";

const assertShopItems = (expectedPageState, expectedData) => {
  expect(screen.getByTestId("page-state").textContent).toEqual(
    expectedPageState
  );
  const gameCardNames = screen.getAllByTestId("game-card-name");
  expect(gameCardNames[0].textContent).toEqual(expectedData[0]);
  expect(gameCardNames[1].textContent).toEqual(expectedData[1]);
};

export default assertShopItems;
