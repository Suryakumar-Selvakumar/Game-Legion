// libs
import { Component } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

const StyledGameCard = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const GameCardDetails = styled.div``;

const Icons = styled.div``;

const GameName = styled.div``;

class GameCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledGameCard>
        <img src="" alt="" />
        <GameCardDetails>
          <button>Add to cart +</button>
          <p>$</p>
        </GameCardDetails>
        <Icons></Icons>
        <GameName></GameName>
      </StyledGameCard>
    );
  }
}

export default GameCard;
