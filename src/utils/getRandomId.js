import sampleSize from "lodash.samplesize";

export function getRandomId(gameIds) {
  return sampleSize(gameIds, 1);
}
