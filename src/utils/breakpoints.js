export const size = {
  mobile: "600px",
  tablet: "768px",
  pc: "1366px",
};

const media = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet}) and (max-width: 1100px)`,
  tabletPro: "(min-width: 1100px) and (max-width: 1300px)",
  pc: `(min-width: ${size.pc})`,
};

export default media;
