import { css } from "styled-components";

export const size = {
  mobile: "769px",
  pc: "819px",
};

const media = {
  mobile: `(max-width: ${size.mobile})`,
  pc: `(min-width: ${size.pc})`,
};

export default media;
