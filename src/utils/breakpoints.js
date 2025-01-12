import { css } from "styled-components";

const size = {
  mobile: "769px",
  pc: "819px",
};

const media = {
  mobile: (...args) => css`
    @media (max-width: ${size.mobile}) {
      ${css(...args)};
    }
  `,
  pc: (...args) => css`
    @media (min-width: ${size.pc}) {
      ${css(...args)};
    }
  `,
};
