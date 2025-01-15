import { screen } from "@testing-library/react";

const assertShopItems = (expectedPageState, expectedData) => {
  expect(screen.getByTestId("page-state").textContent).toEqual(
    expectedPageState
  );
  expect(screen.getByTestId("game-card-name").textContent).toEqual(
    expectedData
  );
};

export default assertShopItems;
