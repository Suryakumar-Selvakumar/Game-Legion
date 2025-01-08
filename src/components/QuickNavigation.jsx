// libs
import { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { StyledInfoCard } from "./InfoCard";

// assets
import crownIcon from "../assets/icons/crown.svg";
import trophyIcon from "../assets/icons/trophy.svg";
import barChartIcon from "../assets/icons/bar-chart.svg";
import starIcon from "../assets/icons/star.svg";
import cloverIcon from "../assets/icons/clover.svg";
import fireIcon from "../assets/icons/fire.svg";

const StyledQuickNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 20px;
  padding: 1.25rem 1.5rem 1.5rem 1.5rem;
  background-color: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(20px);
  justify-content: end;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  h2 {
    color: white;
    font-size: 2rem;
  }
`;

const QuickNavButton = styled(Link)`
  color: black;
  text-decoration: none;
  background-color: white;
  padding: 0.5rem 0rem;
  font-size: 1.25rem;
  cursor: pointer;
  border-radius: 20px;
  width: 225px;
  transition: transform 250ms ease-out;

  &:hover {
    background-color: ${(props) =>
      props.theme.currentTheme === "norse" ? "#46afe8" : "#ff5a5a"};
    transform: scale(1.05);
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  &:nth-child(3) > div {
    position: relative;
    top: 1px;
  }

  div > img {
    width: 25px;
  }

  ${StyledInfoCard} & {
    width: max-content;
    padding-left: 1rem;
    padding-right: 1rem;
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
            <span>I'm feeling lucky</span>
          </div>
        </QuickNavButton>
        <QuickNavButton to={"/shop"} state={{ pageState: "This week" }}>
          <div>
            <img src={fireIcon} alt="a star icon" />
            <span>New this week</span>
          </div>
        </QuickNavButton>
        <QuickNavButton to={"/shop"} state={{ pageState: "Last 30 days" }}>
          <div>
            <img src={starIcon} alt="a star icon" />
            <span>Last 30 days</span>
          </div>
        </QuickNavButton>
        <QuickNavButton to={"/shop"} state={{ pageState: "Best of the year" }}>
          <div>
            <img src={trophyIcon} alt="a trophy icon" />
            <span>{"Best of the year"}</span>
          </div>
        </QuickNavButton>
        <QuickNavButton to={"/shop"} state={{ pageState: "Popular in 2026" }}>
          <div>
            <img src={barChartIcon} alt="a bar chart icon" />
            <span>Popular in 2026</span>
          </div>
        </QuickNavButton>
        <QuickNavButton to={"/shop"} state={{ pageState: "All time top" }}>
          <div>
            <img src={crownIcon} alt="a crown icon" />
            <span>All time top</span>
          </div>
        </QuickNavButton>
      </StyledQuickNavigation>
    );
  }
}

export { QuickNavButton };
