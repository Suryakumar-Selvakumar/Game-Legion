// libs
import { Component } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

// components
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import Games from "../components/Games";
import Loading from "../components/Loading";
import Error from "../components/Error";

// utils
import { getGamesData } from "../utils/getGamesData";

const StyledShop = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  background-color: rgb(15, 16, 17);
  padding-top: 5rem;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
`;

class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gamesData: null,
      loading: true,
      error: null,
    };
  }

  static contextType = ThemeContext;

  componentDidMount() {
    const fetchGamesData = async () => {
      try {
        const fetchedGamesData = await getGamesData(
          "https://api.rawg.io/api/games?key=c82b4f25a584475299b48ed1f5a6e8ed&page_size=40"
        );
        this.setState((state) => ({
          ...state,
          gamesData: fetchedGamesData,
          error: null,
        }));
        console.log(this.state.gamesData);
      } catch (err) {
        this.setState((state) => ({
          ...state,
          gamesData: null,
          error: err.message,
        }));
      } finally {
        this.setState((state) => ({
          ...state,
          loading: false,
        }));
      }
    };

    fetchGamesData();
  }

  render() {
    const theme = this.context;

    return (
      <StyledShop>
        <Header />
        <Body>
          <Sidebar />
          {this.state.loading && <Loading theme={theme} />}
          {this.state.error && <Error error={this.state.error} />}
          {this.state.gamesData && (
            <Games gamesData={this.state.gamesData} theme={theme} />
          )}
        </Body>
      </StyledShop>
    );
  }
}

Shop.propTypes = {
  setTheme: PropTypes.func,
};

export default Shop;

export { StyledShop };
