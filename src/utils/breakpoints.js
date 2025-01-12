import { css } from "styled-components";

export const size = {
  mobile: "768px",
  pc: "820px",
};

const media = {
  mobile: `(max-width: ${size.mobile})`,
  pc: `(min-width: ${size.pc})`,
};

export default media;
