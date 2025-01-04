export const getGamesPrice = (ratingsArr) => {
  let price = 0;

  if (ratingsArr.length === 0 || ratingsArr.length === 1) {
    price = 49.99;
  } else {
    ratingsArr.forEach((rating) => {
      if (rating.percent > price) {
        price = rating.percent;
      }
    });
  }

  return price;
};
