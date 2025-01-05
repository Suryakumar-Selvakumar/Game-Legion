// libs
import { Component } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

// components
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import Games from "../components/Games";

// utils
import { getGamesData } from "../utils/getGamesData";
import { getAPIURL } from "../utils/getAPIURL";
import DropDown from "../components/DropDown";

const StyledShop = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  background-color: rgb(15, 16, 17);
  padding-top: 5rem;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: min-content 1fr;
  grid-template-areas:
    "sidebar first-row"
    "sidebar games";
`;

const FirstRow = styled.div`
  grid-area: first-row;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  height: min-content;

  h1 {
    color: white;
    font-family: myFontBold;
    font-size: 60px;
    line-height: 1;
    padding: 0rem 2rem 0rem 2rem;
  }
`;

const DropDownsContainer = styled.div`
  display: flex;
  width: 100%;
  height: min-content;
`;

class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gamesData: null,
      loading: true,
      error: null,
      pageState: null,
      dropDownOpen: false,
      orderBy: "Popularity",
      sortBy: "High to Low",
    };

    this.setPageState = this.setPageState.bind(this);
    this.setOrderBy = this.setOrderBy.bind(this);
    this.setSortBy = this.setSortBy.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  setPageState(newPageState) {
    this.setState((state) => ({ ...state, pageState: newPageState }));
  }

  setOrderBy(newOrderBy) {
    this.setState((state) => ({
      ...state,
      orderBy: newOrderBy,
    }));
  }

  setSortBy(newSortBy) {
    this.setState((state) => ({
      ...state,
      sortBy: newSortBy,
    }));
  }

  setLoading() {
    this.setState((state) => ({
      ...state,
      loading: true,
    }));
  }

  static contextType = ThemeContext;

  fetchGamesData = async () => {
    try {
      const fetchedGamesData = await getGamesData(
        getAPIURL(this.state.pageState, this.state.orderBy, this.state.sortBy)
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
        error: err.message,
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
    if (
      this.state.pageState !== prevState.pageState ||
      this.state.orderBy !== prevState.orderBy ||
      this.state.sortBy !== prevState.sortBy
    ) {
      this.fetchGamesData();
      this.setLoading();
    }
  }

  render() {
    const theme = this.context;

    return (
      <StyledShop>
        <Header />
        <Body>
          <Sidebar
            pageState={this.state.pageState}
            setPageState={this.setPageState}
          />
          <FirstRow>
            {this.state.pageState && <h1>{this.state.pageState}</h1>}

            {this.state.pageState !== "Best of the year" &&
              this.state.pageState !== "Popular in 2026" &&
              this.state.pageState !== "All time top" && (
                <DropDownsContainer>
                  <DropDown
                    menuItem={this.state.orderBy}
                    setMenuItem={this.setOrderBy}
                    menuItems={["Name", "Release Date", "Popularity", "Rating"]}
                    menuName="Order By: "
                  />
                  <DropDown
                    menuItem={this.state.sortBy}
                    setMenuItem={this.setSortBy}
                    menuItems={["Low to High", "High to Low"]}
                    menuName="Sort By: "
                  />
                </DropDownsContainer>
              )}
          </FirstRow>

          <Games
            gamesData={this.state.gamesData}
            theme={theme}
            loading={this.state.loading}
            error={this.state.error}
          />
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
