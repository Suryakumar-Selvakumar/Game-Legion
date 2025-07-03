// libs
import { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { NavButton } from "./QuickNavigation";

// assets
import githubIcon from "../assets/icons/github.svg";
import rawgIcon from "../assets/icons/rawg.png";
import media from "../utils/breakpoints";

const StyledInfoCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`;

const Info = styled.div`
  background-color: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 500px;
  align-items: center;
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  p {
    font-size: 1rem;
    text-align: center;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 500;
    font-family: myFontBold;
  }

  @media ${media.mobile} {
    gap: 0.25rem;
    width: 350px;
    padding: 1rem;

    p {
      font-size: 1rem;
    }

    h1 {
      font-size: 2rem;
    }
  }

  @media ${media.tablet} {
    gap: 0.25rem;
    width: 425px;
    padding: 1rem;

    p {
      font-size: 1rem;
    }

    h1 {
      font-size: 2.5rem;
    }
  }
`;

const InfoLinks = styled.div`
  width: 500px;
  background-color: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-evenly;
  padding: 0.75rem 0;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  @media ${media.mobile} {
    width: 350px;
    padding: 0.5rem 0;
    border-radius: 15px;
    gap: 0.75rem;
  }

  @media ${media.tablet} {
    width: 425px;
    padding: 0.75rem 0.75rem;
    border-radius: 15px;
    gap: 1rem;
  }
`;

export class InfoCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledInfoCard aria-labelledby="info-heading" role="region">
        <Info>
          <h1 id="info-heading">Game Legion</h1>
          <p>
            It's just a personal project. The games cannot be bought and the
            prices are fake, generated to imitate a real shop.
          </p>
          <p>Have fun 😉</p>
        </Info>
        <InfoLinks>
          <NavButton
            to="https://github.com/Suryakumar-Selvakumar"
            target="_blank"
            data-testid="github"
            aria-label="Visit GitHub profile"
          >
            <img src={githubIcon} alt="" aria-hidden="true" />
            <span>Suryakumar-Selvakumar</span>
          </NavButton>
          <NavButton
            data-testid="rawg-api"
            to="https://rawg.io/apidocs"
            target="_blank"
            aria-label="Visit RAWG API documentation"
          >
            <img src={rawgIcon} alt="" aria-hidden="true" />
            <span>RAWG API</span>
          </NavButton>
        </InfoLinks>
      </StyledInfoCard>
    );
  }
}

export { StyledInfoCard };
