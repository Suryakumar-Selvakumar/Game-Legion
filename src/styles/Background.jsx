import styled from "styled-components";
import CheckBox from "./CheckBox";
import media from "../utils/breakpoints";

const Background = styled.div`
  height: 2.75rem;
  width: 2.75rem;
  border-radius: 50%;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-image: radial-gradient(rgb(255, 255, 255), rgb(255, 255, 255));
  z-index: 2;
  transition: transform 1s ease;

  @media ${media.mobile} and (pointer: coarse) {
    ${CheckBox}:checked ~ & {
      transform: scale(60);
    }
  }

  @media ${media.mobile} and (pointer: fine) {
    ${CheckBox}:checked ~ & {
      transform: scale(67.5);
    }
  }
`;

export default Background;
