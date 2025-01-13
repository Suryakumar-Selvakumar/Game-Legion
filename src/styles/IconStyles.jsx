import styled from "styled-components";

const IconStyles = styled.span`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, 50%);

  &,
  &::before,
  &::after {
    width: 1.25rem;
    height: 2px;
    background-color: #000000;
    display: inline-block;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    transition: all 0.2s;
  }

  &::before {
    top: -0.4rem;
  }

  &::after {
    top: 0.4rem;
  }
`;

export default IconStyles;