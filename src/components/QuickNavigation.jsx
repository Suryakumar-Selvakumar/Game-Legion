// libs
import { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// assets
import crownIcon from "../assets/icons/crown.svg";
import trophyIcon from "../assets/icons/trophy.svg";
import barChartIcon from "../assets/icons/bar-chart.svg";
import starIcon from "../assets/icons/star.svg";
import cloverIcon from "../assets/icons/clover.svg";

const StyledQuickNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 15px;
  padding: 1.25rem 1.5rem 1.5rem 1.5rem;
  background-color: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(10px);
  justify-content: end;

  h2 {
    color: white;
    font-size: 1.75rem;
  }
`;

const QuickNavButton = styled(Link)`
  color: black;
  text-decoration: none;
  background-color: white;
  padding: 0.5rem 0rem;
  font-size: 1.25rem;
  cursor: pointer;
  border-radius: 15px;
  width: 225px;
  transition: transform 250ms ease-out;

  &:hover {
    background-color: #46afe8;
    transform: scale(1.05);
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }

  div > img {
    width: 25px;
  }
`;

export class QuickNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledQuickNavigation>
        <h2>Quick Navigation</h2>
        <QuickNavButton>
          <div>
            <img src={cloverIcon} alt="a clover icon" />
            <span>I'm Feeling Lucky</span>
          </div>
        </QuickNavButton>
        <QuickNavButton>
          <div>
            <img src={starIcon} alt="a star icon" />
            <span>Last 30 days</span>
          </div>
        </QuickNavButton>
        <QuickNavButton>
          <div>
            <img src={barChartIcon} alt="a bar chart icon" />
            <span>Popular in 2024</span>
          </div>
        </QuickNavButton>
        <QuickNavButton>
          <div>
            <img src={trophyIcon} alt="a trophy icon" />
            <span>Best of the year</span>
          </div>
        </QuickNavButton>
        <QuickNavButton>
          <div>
            <img src={crownIcon} alt="a crown icon" />
            <span>All time top</span>
          </div>
        </QuickNavButton>
      </StyledQuickNavigation>
    );
  }
}
