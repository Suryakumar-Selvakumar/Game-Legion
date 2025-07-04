// libs
import { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// components
import GameCard from "./GameCard";
import Loading from "../components/Loading";
import Error from "../components/Error";
import media from "../utils/breakpoints";

const StyledGames = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: 400px;
  gap: 2rem;
  padding: 2rem 2rem 2rem 2rem;
  grid-area: games;

  @media ${media.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
    grid-auto-rows: 350px;
    padding: 1.75rem;
  }

  @media ${media.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
  }
`;

class Games extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.loading && (
          <Loading width="100px" height="100px" />
        )}
        {this.props.error && <Error error={this.props.error} />}
        {this.props.gamesData &&
          !this.props.loading &&
          this.props.error === null && (
            <StyledGames aria-label="Game results" data-testid="games">
              {this.props.gamesData.map((game) => (
                <GameCard key={game.id} gameDetails={game} />
              ))}
            </StyledGames>
          )}
      </>
    );
  }
}

Games.propTypes = {
  gamesData: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

export default Games;
