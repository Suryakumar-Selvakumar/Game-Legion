// libs
import { Component } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

// components
import GameCard from "./GameCard";

const StyledGames = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: 400px;
  gap: 2rem;
  padding: 3rem 2rem 2rem 2rem;
`;

class Games extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <>
        {this.props.gamesData && (
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
};

export default Games;
