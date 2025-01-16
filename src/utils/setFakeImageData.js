import createFetchResponse from "./createFetchResponse";

const setFakeImageData = () =>
  createFetchResponse({
    results: [
      {
        image: "dummy url 1",
      },
      {
        image: "dummy url 2",
      },
      {
        image: "dummy url 3",
      },
      {
        image: "dummy url 4",
      },
    ],
  });

export default setFakeImageData;
