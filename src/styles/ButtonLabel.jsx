import styled from "styled-components";
import Icon from "./IconStyles";

const ButtonLabel = styled.label`
  background-color: white;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  position: fixed;
  bottom: 5dvh;
  right: 5dvw;
  z-index: 2000;
  text-align: center;
  cursor: pointer;

  &:hover ${Icon}::before {
    top: -1rem;
  }

  &:hover ${Icon}::after {
    top: 1rem;
  }
`;

export default ButtonLabel;
