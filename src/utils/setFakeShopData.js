import createFetchResponse from "./createFetchResponse";

const setFakeShopData = (pageState) =>
  createFetchResponse({
    results: [
      {
        id: 1,
        name: `Dummy ${pageState} Game - 1`,
        image: "dummyUrl",
        parent_platforms: [
          { platform: { name: "PF1" } },
          { platform: { name: "PF2" } },
          { platform: { name: "PF3" } },
        ],
        ratings: [
          { percent: 30 },
          { percent: 40 },
          { percent: 10 },
          { percent: 20 },
        ],
      },
      {
        id: 2,
        name: `Dummy ${pageState} Game - 2`,
        image: "dummyUrl",
        parent_platforms: [
          { platform: { name: "PF1" } },
          { platform: { name: "PF4" } },
          { platform: { name: "PF5" } },
        ],
        ratings: [
          { percent: 10 },
          { percent: 70 },
          { percent: 10 },
          { percent: 20 },
        ],
      },
    ],
  });

export default setFakeShopData;
