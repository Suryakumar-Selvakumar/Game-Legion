import styled from "styled-components";
import IconStyles from "./IconStyles";
import ButtonLabel from "./ButtonLabel";
import CheckBox from "./CheckBox";

const Icon = styled(IconStyles)`
  ${CheckBox}:checked + ${ButtonLabel} & {
    background-color: transparent;
  }

  ${CheckBox}:checked + ${ButtonLabel} &::before {
    top: 0;
    transform: rotate(135deg);
  }

  ${CheckBox}:checked + ${ButtonLabel} &::after {
    top: 0;
    transform: rotate(-135deg);
  }
`;

export default Icon;
