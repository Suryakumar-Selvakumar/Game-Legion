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
import { getAPIURL } from "../utils/getAPIURL";

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
      pageState: null,
    };

    this.setPageState = this.setPageState.bind(this);
  }

  setPageState(newPageState) {
    this.setState((state) => ({ ...state, pageState: newPageState }));
  }

  static contextType = ThemeContext;

  fetchGamesData = async () => {
    try {
      const fetchedGamesData = await getGamesData(
        getAPIURL(this.state.pageState)
      );
      console.log("Fetched Data: ", fetchedGamesData);
      this.setState(
        (state) => ({
          ...state,
          gamesData: fetchedGamesData,
          error: null,
        }),
        () => {
          console.log("Updated gameState Data: ", this.state.gamesData); // Logs updated state
        }
      );
    } catch (err) {
      this.setState((state) => ({
        ...state,
        gamesData: null,
        error: err,
      }));
    } finally {
      this.setState((state) => ({
        ...state,
        loading: false,
      }));
    }
  };

  componentDidMount() {
    this.fetchGamesData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.pageState !== prevState.pageState) {
      this.fetchGamesData();
    }
  }

  render() {
    const theme = this.context;

    return (
      <StyledShop>
        <Header />
        <Body>
          <Sidebar setPageState={this.setPageState} />
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
