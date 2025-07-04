import styled from "styled-components";
import CheckBox from "./CheckBox";

const ButtonLabel = styled.label`
  background-color: white;
  height: 2.75rem;
  width: 2.75rem;
  border-radius: 50%;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 4;
  text-align: center;
  cursor: pointer;

  ${CheckBox}:focus-visible {
    & {
      box-shadow: 0 0 0 1.5px black;
    }
  }
`;

export default ButtonLabel;
