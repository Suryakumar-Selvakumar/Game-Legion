// libs
import { Component, createRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Games from "../components/Games";

// utils
import { getGamesData } from "../utils/getGamesData";
import { getAPIURL } from "../utils/getAPIURL";
import DropDown from "../components/DropDown";
import { setSortByArr } from "../utils/setSortByArr";
import { setCurrentSortBy } from "../utils/setCurrentSortBy";
import { CartContext } from "../components/CartContext";

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

    const { state } = this.props.location;

    this.state = {
      gamesData: null,
      loading: true,
      error: null,
      pageState:
        (state && state.pageState) ||
        JSON.parse(localStorage.getItem("page-state")) ||
        "default",
      dropDownOpen: false,
      orderBy: JSON.parse(localStorage.getItem("order-by")) || "Popularity",
      sortBy: JSON.parse(localStorage.getItem("sort-by")) || "High to Low",
      searchInput: (state && state.searchInput) || "",
    };

    this.setPageState = this.setPageState.bind(this);
    this.setOrderBy = this.setOrderBy.bind(this);
    this.setSortBy = this.setSortBy.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.setSearchInput = this.setSearchInput.bind(this);
    this.signalRef = createRef(null);
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

  setSearchInput(newInput) {
    this.setState((state) => ({
      ...state,
      searchInput: newInput,
    }));
  }

  static contextType = CartContext;

  fetchGamesData = async () => {
    const controller = new AbortController();
    this.signalRef.current = controller;

    try {
      const fetchedGamesData = await getGamesData(
        getAPIURL(
          this.state.pageState,
          this.state.orderBy,
          this.state.sortBy,
          this.state.searchInput
        ),
        controller.signal,
        "games"
      );
      this.setState((state) => ({
        ...state,
        gamesData: fetchedGamesData,
        error: null,
      }));
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Aborted");
        return;
      }
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
    const storedPageState = JSON.parse(localStorage.getItem("page-state"));
    const { state } = this.props.location;

    this.setPageState(state?.pageState || storedPageState || "default");

    const storedSortBy = JSON.parse(localStorage.getItem("sort-by"));
    this.setSortBy(storedSortBy || "High to Low");

    const storedOrderBy = JSON.parse(localStorage.getItem("order-by"));
    this.setOrderBy(storedOrderBy || "Popularity");

    if (this.state.pageState === state?.pageState) {
      localStorage.setItem("page-state", JSON.stringify(this.state.pageState));
    }

    this.setSearchInput(state?.searchInput);

    if (this.state.pageState !== "Wishlist") {
      this.setLoading();
      this.fetchGamesData();
    } else {
      const { cart, setCart, theme, setTheme, wishList, setWishList } =
        this.context;

      this.setState((state) => ({
        ...state,
        gamesData: wishList !== null || undefined ? wishList : [],
        error: null,
        loading: false,
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { cart, setCart, theme, setTheme, wishList, setWishList } =
      this.context;

    if (
      this.state.pageState !== prevState.pageState ||
      this.state.orderBy !== prevState.orderBy ||
      this.state.sortBy !== prevState.sortBy ||
      this.state.searchInput !== prevState.searchInput
    ) {
      if (this.state.pageState !== "Wishlist") {
        this.fetchGamesData();
        this.setLoading();
      } else {
        this.setState((state) => ({
          ...state,
          gamesData: wishList !== null || undefined ? wishList : [],
          error: null,
          loading: false,
        }));
      }
    }

    if (
      this.state.pageState === "Wishlist" &&
      this.state.gamesData !== wishList
    ) {
      this.setState((state) => ({
        ...state,
        gamesData: wishList !== null || undefined ? wishList : [],
        error: null,
        loading: false,
      }));
    }

    if (this.state.pageState !== prevState.pageState) {
      localStorage.setItem("page-state", JSON.stringify(this.state.pageState));
    }

    if (this.state.sortBy !== prevState.sortBy) {
      localStorage.setItem("sort-by", JSON.stringify(this.state.sortBy));
    }

    if (this.state.orderBy !== prevState.orderBy) {
      this.setSortBy(setCurrentSortBy(this.state.orderBy, this.state.sortBy));
      localStorage.setItem("order-by", JSON.stringify(this.state.orderBy));
    }
  }

  componentWillUnmount() {
    this.signalRef.current?.abort();
  }

  render() {
    const { cart, setCart, theme, setTheme, wishList, setWishList } =
      this.context;

    return (
      <StyledShop>
        <Header
          isInShop={true}
          setShopSearchInput={this.setSearchInput}
          setPageState={this.setPageState}
        />
        <Body>
          <Sidebar
            pageState={this.state.pageState}
            setPageState={this.setPageState}
          />
          <FirstRow>
            {this.state.pageState && (
              <h1>
                {this.state.pageState === "Results"
                  ? `Results for "${this.state.searchInput}"`
                  : this.state.pageState === "default"
                  ? null
                  : this.state.pageState}
              </h1>
            )}

            {this.state.pageState !== "Best of the year" &&
              this.state.pageState !== "Popular in 2026" &&
              this.state.pageState !== "All time top" &&
              this.state.pageState !== "Wishlist" && (
                <DropDownsContainer>
                  <DropDown
                    menuItem={this.state.orderBy}
                    setMenuItem={this.setOrderBy}
                    menuItems={["Name", "Release Date", "Popularity", "Rating"]}
                    menuName="Order by: "
                  />
                  <DropDown
                    menuItem={this.state.sortBy}
                    setMenuItem={this.setSortBy}
                    menuItems={setSortByArr(this.state.orderBy)}
                    menuName="Sort by: "
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
  location: PropTypes.any,
};

export default Shop;

export { StyledShop };
