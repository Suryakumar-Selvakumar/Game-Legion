// libs
import { Component } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

// components
import GameCard from "./GameCard";
import Loading from "../components/Loading";
import Error from "../components/Error";

const StyledGames = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: 400px;
  gap: 2rem;
  padding: 2rem 2rem 2rem 2rem;
  grid-area: games;
`;

class Games extends Component {
  constructor(props) {
    super(props);
  }

  static contextType = ThemeContext;

  render() {
    const theme = this.context;

    return (
      <>
        {this.props.loading && <Loading theme={theme} />}
        {this.props.error && <Error error={this.props.error} />}
        {this.props.gamesData &&
          !this.props.loading &&
          this.props.error === null && (
            <StyledGames>
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
