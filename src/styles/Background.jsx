import styled from "styled-components";
import CheckBox from "./CheckBox";

const Background = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  position: fixed;
  bottom: 5.5dvh;
  right: 5.5dvw;
  background-image: radial-gradient(rgb(255, 255, 255), rgb(255, 255, 255));
  z-index: 1000;
  transition: transform 1s ease;

  ${CheckBox}:checked ~ & {
    transform: scale(35);
  }
`;

export default Background;
