export const size = {
  mobile: "768px",
  tablet: "1024px",
  tabletPro: "1280px",
};

const media = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width: 768.000001px) and (max-width: ${size.tablet})`,
  tabletPro: `(min-width: 1024.00001px) and (max-width: ${size.tabletPro})`,
};

export default media;
