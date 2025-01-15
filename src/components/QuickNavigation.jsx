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

export const QuickNavButton = styled(Link)`
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

    img {
      position: relative;
      top: -1px;
    }
  }

  div > img {
    width: 25px;
  }

  ${StyledInfoCard} & {
    width: max-content;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  ${StyledInfoCard} &:last-child > div > span {
    position: relative;
    top: 1px;
  }

  @media ${media.mobile} {
    font-size: 1rem;
    padding: 0.5rem 0rem;
    border-radius: 15px;
    width: 175px;

    div > img {
      width: 20px;
    }

    div {
      gap: 0.25rem;
      align-items: center;
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

    div {
      align-items: center;
    }

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
    const gameIds = [];

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
      <StyledQuickNavigation>
        <h2>Quick Navigation</h2>
        <QuickNavButton
          onClick={this.handleNavigation}
          data-testid="im-feeling-lucky"
        >
          <div>
            <img src={cloverIcon} alt="a clover icon" />
            <span>I'm feeling lucky</span>
          </div>
        </QuickNavButton>
        <QuickNavButton
          data-testid="new-this-week"
          to={"/shop"}
          state={{ pageState: "This week" }}
        >
          <div>
            <img src={fireIcon} alt="a star icon" />
            <span>New this week</span>
          </div>
        </QuickNavButton>
        <QuickNavButton data-testid="last-30-days" to={"/shop"} state={{ pageState: "Last 30 days" }}>
          <div>
            <img src={starIcon} alt="a star icon" />
            <span>Last 30 days</span>
          </div>
        </QuickNavButton>
        <QuickNavButton data-testid="best-of-the-year" to={"/shop"} state={{ pageState: "Best of the year" }}>
          <div>
            <img src={trophyIcon} alt="a trophy icon" />
            <span>{"Best of the year"}</span>
          </div>
        </QuickNavButton>
        <QuickNavButton data-testid="popular-in-2026" to={"/shop"} state={{ pageState: "Popular in 2026" }}>
          <div>
            <img src={barChartIcon} alt="a bar chart icon" />
            <span>Popular in 2026</span>
          </div>
        </QuickNavButton>
        <QuickNavButton data-testid="all-time-top" to={"/shop"} state={{ pageState: "All time top" }}>
          <div>
            <img src={crownIcon} alt="a crown icon" />
            <span>All time top</span>
          </div>
        </QuickNavButton>
      </StyledQuickNavigation>
    );
  }
}

QuickNavigation.propTypes = {
  navigate: PropTypes.func,
};

export default withRouter(QuickNavigation);
