// libs
import { Component } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

// components
import GameCard from "./GameCard";

const StyledGames = styled.div`

`;

class Games extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledGames>
        {this.props.gamesData.map((game) => (
          <GameCard key={game.id} gameDetails={game} />
        ))}
      </StyledGames>
    );
  }
}

Games.propTypes = {
  gamesData: PropTypes.array,
};

export default Games;
