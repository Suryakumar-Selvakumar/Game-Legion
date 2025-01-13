import styled from "styled-components";

const IconStyles = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);

  &,
  &::before,
  &::after {
    width: 3rem;
    height: 2px;
    background-color: gray;
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
    top: -0.8rem;
  }

  &::after {
    top: 0.8rem;
  }
`;

export default IconStyles;