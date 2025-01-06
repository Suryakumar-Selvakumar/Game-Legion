// libs
import { Component } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

// assets
import pcIcon from "../assets/icons/windows.svg";
import playStationIcon from "../assets/icons/playstation.svg";
import xboxIcon from "../assets/icons/xbox.svg";
import nintendoIcon from "../assets/icons/nintendo.svg";
import appleIcon from "../assets/icons/apple.svg";
import androidIcon from "../assets/icons/android.svg";
import placeHolderImage from "../assets/icons/placeholder-image.jpg";

const StyledGameCard = styled.div`
  display: grid;
  grid-template-rows: 250px 150px;
  background-color: rgb(32, 32, 32);
  border-radius: 20px;
  transition: transform 400ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const GameImage = styled.img`
  object-fit: fill;
  height: 100%;
  width: 100%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  cursor: pointer;
`;

const GameCardDetails = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    color: rgb(153, 153, 153);
    font-size: 1rem;
  }

  div > button {
    background-color: rgb(32, 32, 32);
    border: none;
    outline: none;
    color: rgb(153, 153, 153);
    padding: 0;

    cursor: pointer;
    line-height: 1;
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: start;
  gap: 0.5rem;
  align-items: center;

  img {
    width: 15px;
    height: 16px;
  }
`;

const GameName = styled.p`
  color: white;
  font-family: myFontBold;
  font-size: 1.375rem;
  line-height: 1;
  padding: 0.25rem 0;
  cursor: pointer;
`;

class GameCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <StyledGameCard>
        <GameImage
          src={
            this.props.gameDetails.image !== null
              ? this.props.gameDetails.image
              : placeHolderImage
          }
          alt={this.props.gameDetails.name}
        />
        <GameCardDetails>
          <div>
            <button>Add to cart +</button>
            <p>${this.props.gameDetails.price}</p>
          </div>
          <Icons>
            {this.props.gameDetails.platforms?.includes("PC") && (
              <img src={pcIcon} alt="pc icon" />
            )}
            {this.props.gameDetails.platforms?.includes("PlayStation") && (
              <img
                src={playStationIcon}
                alt="playstation icon"
                style={{
                  width: "17.5px",
                  height: "17.5px",
                }}
              />
            )}
            {this.props.gameDetails.platforms?.includes("Xbox") && (
              <img src={xboxIcon} alt="xbox icon" />
            )}
            {this.props.gameDetails.platforms?.includes("Nintendo") && (
              <img
                src={nintendoIcon}
                alt="nintendo icon"
                style={{
                  width: "17.5px",
                  height: "17.5px",
                }}
              />
            )}
            {this.props.gameDetails.platforms?.includes("Android") && (
              <img src={androidIcon} alt="android icon" />
            )}
            {this.props.gameDetails.platforms?.includes("Apple Macintosh") && (
              <img
                src={appleIcon}
                alt="apple icon"
                style={{
                  width: "17.5px",
                  height: "17.5px",
                }}
              />
            )}
          </Icons>
          <GameName>{this.props.gameDetails.name}</GameName>
        </GameCardDetails>
      </StyledGameCard>
    );
  }
}

GameCard.propTypes = {
  gameDetails: PropTypes.object,
};

export default GameCard;
