// libs
import { Component, createRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Games from "../components/Games";
import CheckBox from "../styles/CheckBox";
import Icon from "../styles/Icon";
import ButtonLabel from "../styles/ButtonLabel";
import Background from "../styles/Background";

// utils
import { getGamesData } from "../utils/getGamesData";
import { getAPIURL } from "../utils/getAPIURL";
import DropDown from "../components/DropDown";
import { setSortByArr } from "../utils/setSortByArr";
import { setCurrentSortBy } from "../utils/setCurrentSortBy";
import { CartContext } from "../components/CartContext";
import media from "../utils/breakpoints";

const StyledShop = styled.div`
  display: grid;
  grid-template-rows: 1fr;
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

  @media ${media.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const FirstRow = styled.div`
  grid-area: first-row;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  height: min-content;

  h1 {
    color: white;
    font-family: myFontBlack;
    font-size: 60px;
    line-height: 1;
    padding: 0rem 2rem 0rem 2rem;
  }

  @media ${media.mobile} {
    padding-top: 2rem;

    h1 {
      font-size: 3rem;
      text-align: center;
      padding: 0rem 2rem 1.5rem 2rem;
    }
  }
`;

const DropDownsContainer = styled.div`
  display: flex;
  width: 100%;
  height: min-content;

  @media ${media.mobile} {
    justify-content: space-between;
    padding: 0 2rem;
  }
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
      isMobileView: window.matchMedia(media.mobile).matches,
      isSideBarVisible: false,
      isSideBarClosed: true,
    };

    this.setPageState = this.setPageState.bind(this);
    this.setOrderBy = this.setOrderBy.bind(this);
    this.setSortBy = this.setSortBy.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.setSearchInput = this.setSearchInput.bind(this);
    this.signalRef = createRef(null);
    this.setIsMobileView = this.setIsMobileView.bind(this);
    this.mobileRef = createRef(null);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.setSideBarVisible = this.setSideBarVisible.bind(this);
    this.setSideBarClosed = this.setSideBarClosed.bind(this);
    this.closeSideBar = this.closeSideBar.bind(this);
    this.checkBoxRef = createRef(null);
  }

  closeSideBar() {
    this.checkBoxRef.current.checked = !this.checkBoxRef.current.checked;
    this.setState((state) => ({
      ...state,
      isSideBarVisible: this.checkBoxRef.current.checked,
    }));
  }

  setSideBarClosed() {
    !this.state.isSideBarVisible &&
      this.setState((state) => ({
        ...state,
        isSideBarClosed: true,
      }));
  }

  setSideBarVisible(e) {
    this.setState((state) => ({
      ...state,
      isSideBarClosed: state.isSideBarVisible && false,
      isSideBarVisible: e.target.checked,
    }));
  }

  handleMediaChange(e, currentView) {
    currentView === "mobile"
      ? this.setIsMobileView(e.matches)
      : this.setIsTabletView(e.matches);
  }

  setIsMobileView(currentState) {
    this.setState((state) => ({
      ...state,
      isMobileView: currentState,
    }));
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
    document.body.style.overflow = "auto";

    this.mobileRef.current = window.matchMedia(media.mobile);
    this.mobileRef.current.addEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );

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

    this.setSearchInput(state?.searchInput || "");

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

    this.mobileRef.current.removeEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );
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
          {this.state.isMobileView && this.state.gamesData && (
            <>
              <CheckBox
                id="navi-toggle"
                value={this.state.isSideBarVisible}
                onChange={this.setSideBarVisible}
                ref={this.checkBoxRef}
              />
              <ButtonLabel htmlFor="navi-toggle">
                <Icon></Icon>
              </ButtonLabel>
              <Background onTransitionEnd={this.setSideBarClosed}></Background>
            </>
          )}
          {this.state.isMobileView ? (
            !this.state.isSideBarClosed && (
              <Sidebar
                pageState={this.state.pageState}
                setPageState={this.setPageState}
                closeSideBar={this.closeSideBar}
                isSideBarVisible={this.state.isSideBarVisible}
              />
            )
          ) : (
            <Sidebar
              pageState={this.state.pageState}
              setPageState={this.setPageState}
            />
          )}
          <FirstRow>
            {this.state.pageState && this.state.pageState !== "default" && (
              <h1>
                {this.state.pageState === "Results"
                  ? this.state.searchInput !== "" &&
                    `Results for "${this.state.searchInput}"`
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
                    count={1}
                  />
                  <DropDown
                    menuItem={this.state.sortBy}
                    setMenuItem={this.setSortBy}
                    menuItems={setSortByArr(this.state.orderBy)}
                    menuName="Sort by: "
                    count={2}
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
