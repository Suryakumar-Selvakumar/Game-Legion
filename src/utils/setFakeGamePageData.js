import createFetchResponse from "./createFetchResponse";

const setFakeGamePageData = (id, gameName, ratings) =>
  createFetchResponse({
    name: `${gameName} Game - ${id}`,
    description_raw: "Dummy Game added for testing",
    website: "dummy.com",
    released: "2025-01-15",
    genres: [{ name: "G1" }, { name: "G2" }, { name: "G3" }],
    parent_platforms: [
      { platform: { name: "PF1" } },
      { platform: { name: "PF2" } },
      { platform: { name: "PF3" } },
    ],
    developers: [{ name: "D1" }, { name: "D2" }, { name: "D3" }],
    background_image: "dummyUrl",
    publishers: [{ name: "PB1" }, { name: "PB2" }, { name: "PB3" }],
    ratings: [
      { percent: ratings[0] },
      { percent: ratings[1] },
      { percent: ratings[2] },
      { percent: ratings[3] },
    ],
    esrb_rating: { name: "M1" },
    id: id,
  });

export default setFakeGamePageData;
