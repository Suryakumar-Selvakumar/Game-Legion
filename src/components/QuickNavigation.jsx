// libs
import { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { StyledInfoCard } from "./InfoCard";
import PropTypes from "prop-types";

// assets
import crownIcon from "../assets/icons/crown.svg";
import trophyIcon from "../assets/icons/trophy.svg";
import barChartIcon from "../assets/icons/bar-chart.svg";
import starIcon from "../assets/icons/star.svg";
import cloverIcon from "../assets/icons/clover.svg";
import fireIcon from "../assets/icons/fire.svg";
import { getRandomId } from "../utils/getRandomId";

// utils
import { getGamesData } from "../utils/getGamesData";
import { getAPIURL } from "../utils/getAPIURL";
import media from "../utils/breakpoints";
import withRouter from "./withRouter";

const StyledQuickNavigation = styled.section`
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
    font-family: myFontBold;
    font-size: 2rem;
  }

  @media ${media.mobile} {
    padding: 1.25rem 1rem 1.25rem 1rem;
    gap: 0.8rem;

    h2 {
      font-size: 1.5rem;
      width: 200px;
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  @media ${media.tablet} {
    h2 {
      font-size: 2rem;
      width: 225px;
      text-align: center;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
`;

export const NavButton = styled(Link)`
  color: black;
  text-decoration: none;
  background-color: white;
  padding: 0.5rem 0rem;
  font-size: 1.25rem;
  cursor: pointer;
  border-radius: 20px;
  width: 225px;
  transition: transform 250ms ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${(props) =>
      props.theme.currentTheme === "norse" ? "#46afe8" : "#ff5a5a"};
    transform: scale(1.05);
  }

  &:nth-child(3) {
    position: relative;
    top: 1px;

    img {
      position: relative;
      top: -1px;
    }
  }

  img {
    width: 25px;
  }

  ${StyledInfoCard} & {
    width: max-content;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  ${StyledInfoCard} &:last-child > span {
    position: relative;
    top: 1px;
  }

  @media ${media.mobile} {
    font-size: 1rem;
    padding: 0.5rem 0rem;
    border-radius: 15px;
    width: 175px;
    gap: 0.25rem;
    align-items: center;

    img {
      width: 20px;
    }

    ${StyledInfoCard} & {
      border-radius: 10px;
      font-size: 0.95rem;
      width: max-content;
      padding: 0.4rem 0rem;
      padding-left: 0.6rem;
      padding-right: 0.6rem;
    }

    ${StyledInfoCard} &:first-child {
      padding-left: 0.45rem;
      padding-right: 0.45rem;
    }
  }

  @media ${media.tablet} {
    border-radius: 15px;
    width: 200px;
    align-items: center;

    ${StyledInfoCard} & {
      border-radius: 10px;
      font-size: 1.09rem;
      width: max-content;
      padding: 0.5rem;
    }
  }
`;

class QuickNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: null,
      gameId: null,
    };
  }

  getGameId = async () => {
    try {
      const fetchedGenresData = await getGamesData(
        getAPIURL("genres", "", "", ""),
        null,
        "genres"
      );

      this.setState(
        (state) => ({
          ...state,
          gameId: String(
            getRandomId(
              fetchedGenresData.flatMap((genre) =>
                genre.games.map((gameId) => gameId)
              )
            )[0]
          ),
        }),
        () => {
          this.props.navigate(`/shop/game/${this.state.gameId}`, {
            state: {
              currentPath: "home",
            },
          });
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  handleNavigation = async () => {
    await this.getGameId();
  };

  render() {
    return (
      <StyledQuickNavigation role="region" aria-labelledby="quick-nav-heading">
        <h2 id="quick-nav-heading">Quick Navigation</h2>
        <NavButton
          onClick={this.handleNavigation}
          data-testid="im-feeling-lucky-home"
        >
          <img src={cloverIcon} alt="" aria-hidden="true" />
          <span>I'm feeling lucky</span>
        </NavButton>
        <NavButton
          data-testid="new-this-week-home"
          to={"/shop"}
          state={{ pageState: "This week" }}
        >
          <img src={fireIcon} alt="" aria-hidden="true" />
          <span>New this week</span>
        </NavButton>
        <NavButton
          data-testid="last-30-days-home"
          to={"/shop"}
          state={{ pageState: "Last 30 days" }}
        >
          <img src={starIcon} alt="" aria-hidden="true" />
          <span>Last 30 days</span>
        </NavButton>
        <NavButton
          data-testid="best-of-the-year-home"
          to={"/shop"}
          state={{ pageState: "Best of the year" }}
        >
          <img src={trophyIcon} alt="" aria-hidden="true" />
          <span>{"Best of the year"}</span>
        </NavButton>
        <NavButton
          data-testid="popular-in-2026-home"
          to={"/shop"}
          state={{ pageState: "Popular in 2026" }}
        >
          <img src={barChartIcon} alt="" aria-hidden="true" />
          <span>Popular in 2026</span>
        </NavButton>
        <NavButton
          data-testid="all-time-top-home"
          to={"/shop"}
          state={{ pageState: "All time top" }}
        >
          <img src={crownIcon} alt="" aria-hidden="true" />
          <span>All time top</span>
        </NavButton>
      </StyledQuickNavigation>
    );
  }
}

QuickNavigation.propTypes = {
  navigate: PropTypes.func,
};

export default withRouter(QuickNavigation);
