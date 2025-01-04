import { Component } from "react";
import styled, { keyframes, ThemeContext } from "styled-components";
import PropTypes from "prop-types";

const StyledError = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding-top: 7.5rem;
  flex-direction: column;
  color: red;
  gap: 1rem;

  svg {
    width: 75px;
  }
`;

class Error extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log(this.props.error);
  }

  render() {
    return;
      // <StyledError>
      //   <svg
      //     viewBox="0 0 24 24"
      //     fill="none"
      //     xmlns="http://www.w3.org/2000/svg"
      //     strokeWidth="0.6"
      //   >
      //     <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      //     <g
      //       id="SVGRepo_tracerCarrier"
      //       strokeLinecap="round"
      //       strokeLinejoin="round"
      //     />

      //     <g id="SVGRepo_iconCarrier">
      //       {" "}
      //       <path
      //         d="M12 22.75C9.87386 22.75 7.79545 22.1195 6.02762 20.9383C4.2598 19.7571 2.88194 18.0781 2.0683 16.1138C1.25466 14.1495 1.04177 11.9881 1.45656 9.90278C1.87135 7.81748 2.89519 5.90201 4.39861 4.3986C5.90202 2.89518 7.81749 1.87135 9.90278 1.45656C11.9881 1.04176 14.1495 1.25465 16.1139 2.06829C18.0782 2.88193 19.7571 4.25979 20.9383 6.02762C22.1195 7.79545 22.75 9.87385 22.75 12C22.7474 14.8503 21.6139 17.583 19.5985 19.5985C17.583 21.6139 14.8503 22.7474 12 22.75ZM12 2.75C10.1705 2.75 8.38213 3.2925 6.86098 4.3089C5.33983 5.32531 4.15423 6.76996 3.45412 8.46018C2.75401 10.1504 2.57083 12.0103 2.92774 13.8046C3.28465 15.5989 4.16563 17.2471 5.45927 18.5407C6.7529 19.8344 8.40109 20.7153 10.1954 21.0723C11.9897 21.4292 13.8496 21.246 15.5398 20.5459C17.23 19.8458 18.6747 18.6602 19.6911 17.139C20.7075 15.6179 21.25 13.8295 21.25 12C21.2474 9.54756 20.272 7.19632 18.5378 5.46218C16.8037 3.72804 14.4524 2.75264 12 2.75Z"
      //         fill="#ff0000"
      //       />{" "}
      //       <path
      //         d="M9.17 15.58C9.07146 15.5805 8.97382 15.5612 8.88281 15.5235C8.7918 15.4857 8.70925 15.4301 8.64 15.36C8.49955 15.2194 8.42066 15.0287 8.42066 14.83C8.42066 14.6312 8.49955 14.4406 8.64 14.3L14.3 8.64C14.4422 8.50752 14.6302 8.43539 14.8245 8.43882C15.0188 8.44225 15.2042 8.52096 15.3416 8.65838C15.479 8.79579 15.5577 8.98117 15.5612 9.17547C15.5646 9.36978 15.4925 9.55782 15.36 9.7L9.7 15.36C9.6311 15.4306 9.54862 15.4864 9.45753 15.5243C9.36643 15.5621 9.26862 15.581 9.17 15.58Z"
      //         fill="#ff0000"
      //       />{" "}
      //       <path
      //         d="M14.83 15.58C14.7314 15.581 14.6336 15.5621 14.5425 15.5243C14.4514 15.4864 14.3689 15.4306 14.3 15.36L8.64001 9.7C8.50753 9.55782 8.4354 9.36978 8.43883 9.17547C8.44226 8.98117 8.52097 8.79579 8.65838 8.65838C8.7958 8.52096 8.98118 8.44225 9.17548 8.43882C9.36978 8.43539 9.55783 8.50752 9.70001 8.64L15.36 14.3C15.5005 14.4406 15.5793 14.6312 15.5793 14.83C15.5793 15.0287 15.5005 15.2194 15.36 15.36C15.2908 15.4301 15.2082 15.4857 15.1172 15.5235C15.0262 15.5612 14.9285 15.5805 14.83 15.58Z"
      //         fill="#ff0000"
      //       />{" "}
      //     </g>
      //   </svg>
      //   <h1>Error fetching games</h1>
      //   <p>{this.props.error}</p>
      // </StyledError>
    // );
  }
}

Error.propTypes = {
  error: PropTypes.any,
};

export default Error;
