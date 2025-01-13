import styled from "styled-components";
import CheckBox from "./CheckBox";

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

  ${CheckBox}:checked ~ & {
    transform: scale(50);
  }
`;

export default Background;
