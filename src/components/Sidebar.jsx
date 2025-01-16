// libs
import { Component, createRef } from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import media from "../utils/breakpoints";

const sideBarPopIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const sideBarPopOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 2rem;
  grid-area: sidebar;

  @media ${media.mobile} {
    height: 100dvh;
    position: fixed;
    top: 0;
    z-index: 3;
    width: 100%;
    opacity: 0;
    overflow: auto;
    animation: ${sideBarPopIn} 1.5s ease forwards;
    animation-delay: 500ms;

    &.close {
      animation: ${sideBarPopOut} 300ms ease forwards;
    }
  }
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: white;

  @media ${media.mobile} {
    color: black;
  }
`;

const NavIcon = styled.div`
  padding: 0.5rem;
  background-color: rgb(32, 32, 32);
  border-radius: 10px;
  transition: all 500ms ease;

  svg {
    width: 20px;
  }
`;

const NavButton = styled(NavLink)`
  display: flex;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
  align-items: center;

  &:hover > ${NavIcon} {
    background-color: white;
  }

  &:hover {
    svg {
      fill: black;
    }

    svg g {
      fill: black;
    }
  }

  @media ${media.mobile} {
    color: black !important;
  }
`;

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobileView: window.matchMedia(media.mobile).matches,
    };

    this.setIsMobileView = this.setIsMobileView.bind(this);
    this.mobileRef = createRef(null);
    this.handleMediaChange = this.handleMediaChange.bind(this);
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

  componentDidMount() {
    this.mobileRef.current = window.matchMedia(media.mobile);
    this.mobileRef.current.addEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );
  }

  componentWillUnmount() {
    this.mobileRef.current.removeEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );
  }

  render() {
    return (
      <StyledSidebar className={!this.props.isSideBarVisible ? "close" : ""}>
        <Category>
          <h2>Your Games</h2>
          <NavButton
            data-testid="wishlist"
            onClick={() => {
              this.props.setPageState("Wishlist");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Wishlist" && "white",
              }}
            >
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill={this.props.pageState === "Wishlist" ? "black" : "white"}
              >
                <path d="M3 3V0H5C6.65685 0 8 1.34315 8 3C8 1.34315 9.34315 0 11 0H13V3H16V6H0V3H3Z" />
                <path d="M1 8H7V15H1V8Z" />
                <path d="M15 8H9V15H15V8Z" />
              </svg>
            </NavIcon>
            <span>Wishlist</span>
          </NavButton>
        </Category>
        <Category>
          <h2>New Releases</h2>
          <NavButton
            data-testid="last-30-days"
            onClick={() => {
              this.props.setPageState("Last 30 days");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "Last 30 days" && "white",
              }}
            >
              <svg
                version="1.0"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                enableBackground="new 0 0 64 64"
                xmlSpace="preserve"
                fill={
                  this.props.pageState === "Last 30 days" ? "black" : "white"
                }
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z" />
                </g>
              </svg>
            </NavIcon>
            <span>Last 30 days</span>
          </NavButton>
          <NavButton
            data-testid="this-week"
            onClick={() => {
              this.props.setPageState("This week");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "This week" && "white",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-4 0 26 26"
                fill={this.props.pageState === "This week" ? "black" : "white"}
              >
                <path d="M4.929 25.819C1.783 16.36 8.43 12.909 8.43 12.909c-.465 5.046 2.679 8.977 2.679 8.977 1.156-.318 3.363-1.805 3.363-1.805 0 1.805-1.165 5.735-1.165 5.735s4.077-2.875 5.36-7.65c1.281-4.776-2.441-9.57-2.441-9.57.224 3.38-1.03 6.704-3.485 9.244.123-.13.226-.273.305-.43.441-.804 1.15-2.896.735-7.741C13.197 2.868 6.442 0 6.442 0 7.024 4.144 5.28 5.098 1.19 12.964c-4.09 7.864 3.74 12.855 3.74 12.855z" />
              </svg>
            </NavIcon>
            <span>This week</span>
          </NavButton>
          <NavButton
            data-testid="next-week"
            onClick={() => {
              this.props.setPageState("Next week");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "Next week" && "white",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 16"
                fill={this.props.pageState === "Next week" ? "black" : "white"}
              >
                <path d="M19.788.212a.712.712 0 00-.503-.197h-1.428a.712.712 0 00-.502.197.619.619 0 00-.212.468v7.05a.669.669 0 00-.146-.198L9.073.15c-.141-.132-.26-.177-.357-.135-.097.042-.145.152-.145.333V7.73a.668.668 0 00-.145-.198L.502.15C.361.018.242-.027.145.015.048.057 0 .167 0 .348v15.304c0 .18.049.291.145.333.097.042.216-.004.357-.135l7.924-7.382a.906.906 0 00.145-.198v7.382c0 .18.049.291.145.333.097.041.216-.004.357-.136l7.924-7.381a.909.909 0 00.146-.198v7.05c0 .18.07.335.212.467a.712.712 0 00.502.197h1.429c.193 0 .36-.065.502-.197a.62.62 0 00.212-.468V.68a.62.62 0 00-.212-.468z" />
              </svg>
            </NavIcon>
            <span>Next week</span>
          </NavButton>
        </Category>
        <Category>
          <h2>Top</h2>
          <NavButton
            data-testid="best-of-the-year"
            onClick={() => {
              this.props.setPageState("Best of the year");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "Best of the year" && "white",
              }}
            >
              <svg
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                fill={
                  this.props.pageState === "Best of the year"
                    ? "black"
                    : "white"
                }
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <style type="text/css"> </style>
                  <g>
                    <path d="M102.49,0c0,27.414,0,104.166,0,137.062c0,112.391,99.33,156.25,153.51,156.25 c54.18,0,153.51-43.859,153.51-156.25c0-32.896,0-109.648,0-137.062H102.49z M256.289,50.551l-68.164,29.768v98.474l-0.049,19.53 c-0.526-0.112-47.274-10.112-47.274-78.391c0-28.17,0-69.6,0-69.6h60.385L256.289,50.551z" />
                    <polygon points="315.473,400.717 291.681,367.482 279.791,318.506 256,322.004 232.209,318.506 220.314,367.482 205.347,388.394 196.527,400.476 196.699,400.476 196.527,400.717 " />
                    <polygon points="366.93,432.24 366.93,432 145.07,432 145.07,511.598 145.07,511.76 145.07,511.76 145.07,512 366.93,512 366.93,432.402 366.93,432.24 " />
                    <path d="M511.638,96.668c-0.033-1.268-0.068-2.336-0.068-3.174V45.1h-73.889v38.736h35.152v9.658 c0,1.127,0.037,2.557,0.086,4.258c0.389,13.976,1.303,46.707-21.545,70.203c-5.121,5.266-11.221,9.787-18.219,13.613 c-3.883,17.635-10.109,33.564-18.104,47.814c26.561-6.406,48.026-17.898,64.096-34.422 C513.402,159.734,512.121,113.918,511.638,96.668z" />
                    <path d="M60.625,167.955c-22.848-23.496-21.934-56.227-21.541-70.203c0.047-1.701,0.082-3.131,0.082-4.258v-9.658 h34.842h0.07l0,0h0.24V45.1H0.43v48.394c0,0.838-0.032,1.906-0.068,3.174c-0.482,17.25-1.76,63.066,32.494,98.293 c16.068,16.524,37.531,28.014,64.092,34.422c-7.996-14.25-14.22-30.182-18.103-47.816C71.846,177.74,65.746,173.221,60.625,167.955 z" />
                  </g>
                </g>
              </svg>
            </NavIcon>
            <span>Best of the year</span>
          </NavButton>
          <NavButton
            data-testid="popular-in-2026"
            onClick={() => {
              this.props.setPageState("Popular in 2026");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "Popular in 2026" && "white",
              }}
            >
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill={
                  this.props.pageState === "Popular in 2026" ? "black" : "white"
                }
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <path d="M405.333333 469.333333h213.333334v426.666667H405.333333zM128 256h213.333333v640H128zM682.666667 128h213.333333v768H682.666667z" />
                </g>
              </svg>
            </NavIcon>
            <span>Popular in 2026</span>
          </NavButton>
          <NavButton
            data-testid="all-time-top"
            onClick={() => {
              this.props.setPageState("All time top");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "All time top" && "white",
              }}
            >
              <svg
                version="1.2"
                baseProfile="tiny"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 240.5"
                xmlSpace="preserve"
                fill={
                  this.props.pageState === "All time top" ? "black" : "white"
                }
              >
                <path
                  d="M41.316,196.312h173.36v30.237H41.316V196.312z M235.842,59.236c-11.133,0-20.158,9.025-20.158,20.158
	c0,3.212,0.771,6.237,2.107,8.932l-41.834,20.702l-37.704-63.706c5.92-3.512,9.901-9.949,9.901-17.331
	c0-11.133-9.025-20.158-20.158-20.158s-20.158,9.025-20.158,20.158c0,7.382,3.981,13.819,9.901,17.331L80.194,108.76L39.191,88.364
	c1.348-2.704,2.125-5.743,2.125-8.97c0-11.133-9.025-20.158-20.158-20.158S1,68.262,1,79.395c0,11.133,9.025,20.158,20.158,20.158
	c1.34,0,2.646-0.137,3.913-0.387l15.237,76.987h175.375l16.046-77.023c1.328,0.275,2.702,0.422,4.112,0.422
	c11.133,0,20.158-9.025,20.158-20.158C256,68.262,246.975,59.236,235.842,59.236z"
                />
              </svg>
            </NavIcon>
            <span>All time top</span>
          </NavButton>
        </Category>
        <Category>
          <h2>Platforms</h2>
          <NavButton
            data-testid="pc"
            onClick={() => {
              this.props.setPageState("PC");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "PC" && "white",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill={this.props.pageState === "PC" ? "black" : "white"}
              >
                <path d="M0 13.772l6.545.902V8.426H0zM0 7.62h6.545V1.296L0 2.198zm7.265 7.15l8.704 1.2V8.425H7.265zm0-13.57v6.42h8.704V0z" />
              </svg>
            </NavIcon>
            <span>PC</span>
          </NavButton>
          <NavButton
            data-testid="playstation"
            onClick={() => {
              this.props.setPageState("PlayStation");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "PlayStation" && "white",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 21 16"
                fill={
                  this.props.pageState === "PlayStation" ? "black" : "white"
                }
              >
                <path d="M11.112 16L8 14.654V0s6.764 1.147 7.695 3.987c.931 2.842-.52 4.682-1.03 4.736-1.42.15-1.96-.748-1.96-.748V3.39l-1.544-.648L11.112 16zM12 14.32V16s7.666-2.338 8.794-3.24c1.128-.9-2.641-3.142-4.666-2.704 0 0-2.152.099-4.102.901-.019.008 0 1.51 0 1.51l4.948-1.095 1.743.73L12 14.32zm-5.024-.773s-.942.476-3.041.452c-2.1-.024-3.959-.595-3.935-1.833C.024 10.928 3.476 9.571 6.952 9v1.738l-3.693.952s-.632.786.217.81A11.934 11.934 0 007 12.046l-.024 1.5z" />
              </svg>
            </NavIcon>
            <span>PlayStation</span>
          </NavButton>
          <NavButton
            data-testid="xbox"
            onClick={() => {
              this.props.setPageState("Xbox");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Xbox" && "white",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill={this.props.pageState === "Xbox" ? "black" : "white"}
              >
                <path d="M3.564 1.357l-.022.02c.046-.048.11-.1.154-.128C4.948.435 6.396 0 8 0c1.502 0 2.908.415 4.11 1.136.086.052.324.215.446.363C11.4.222 7.993 2.962 7.993 2.962c-1.177-.908-2.26-1.526-3.067-1.746-.674-.185-1.14-.03-1.362.141zm10.305 1.208c-.035-.04-.074-.076-.109-.116-.293-.322-.653-.4-.978-.378-.295.092-1.66.584-3.342 2.172 0 0 1.894 1.841 3.053 3.723 1.159 1.883 1.852 3.362 1.426 5.415A7.969 7.969 0 0016 7.999a7.968 7.968 0 00-2.13-5.434zM10.98 8.77a55.416 55.416 0 00-2.287-2.405 52.84 52.84 0 00-.7-.686l-.848.854c-.614.62-1.411 1.43-1.853 1.902-.787.84-3.043 3.479-3.17 4.958 0 0-.502-1.174.6-3.88.72-1.769 2.893-4.425 3.801-5.29 0 0-.83-.913-1.87-1.544l-.007-.002s-.011-.009-.03-.02c-.5-.3-1.047-.53-1.573-.56a1.391 1.391 0 00-.878.431A8 8 0 0013.92 13.381c0-.002-.169-1.056-1.245-2.57-.253-.354-1.178-1.46-1.696-2.04z" />
              </svg>
            </NavIcon>
            <span>Xbox</span>
          </NavButton>
          <NavButton
            data-testid="nintendo-switch"
            onClick={() => {
              this.props.setPageState("Nintendo Switch");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "Nintendo Switch" && "white",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 21 16"
                fill={
                  this.props.pageState === "Nintendo Switch" ? "black" : "white"
                }
              >
                <path d="M8 0h5a8 8 0 110 16H8A8 8 0 118 0zm-.135 1.935a6.065 6.065 0 000 12.13h5.12a6.065 6.065 0 000-12.13h-5.12zm-1.33 2.304h2.401l3.199 5.175V4.24h2.346v7.495H12.18L8.864 6.537v5.201H6.53l.005-7.499z" />
              </svg>
            </NavIcon>
            <span>Nintendo Switch</span>
          </NavButton>
          <NavButton
            data-testid="mac-os"
            onClick={() => {
              this.props.setPageState("MacOS");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "MacOS" && "white",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={this.props.pageState === "MacOS" ? "black" : "white"}
              >
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
            </NavIcon>
            <span>MacOS</span>
          </NavButton>
          <NavButton
            data-testid="android"
            onClick={() => {
              this.props.setPageState("Android");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Android" && "white",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 18"
                fill={this.props.pageState === "Android" ? "black" : "white"}
              >
                <path d="M1.168 5.86H1.12c-.614 0-1.115.482-1.115 1.07v4.665c0 .59.5 1.071 1.115 1.071h.049c.614 0 1.115-.482 1.115-1.071V6.93c0-.589-.502-1.072-1.116-1.072zm1.65 7.535c0 .541.46.983 1.025.983h1.095v2.519c0 .591.503 1.073 1.116 1.073h.048c.615 0 1.116-.482 1.116-1.073v-2.52H8.75v2.52c0 .591.504 1.073 1.117 1.073h.047c.615 0 1.116-.482 1.116-1.073v-2.52h1.096c.564 0 1.025-.44 1.025-.982V6.03H2.818v7.364zm7.739-11.83l.87-1.29a.173.173 0 00-.054-.246.188.188 0 00-.256.052l-.902 1.335A6.092 6.092 0 007.985 1a6.1 6.1 0 00-2.232.416L4.853.08a.19.19 0 00-.257-.05.173.173 0 00-.055.246l.871 1.29c-1.57.739-2.628 2.131-2.628 3.729 0 .098.006.195.015.29H13.17c.009-.095.014-.192.014-.29 0-1.598-1.059-2.99-2.628-3.73zM5.58 3.875a.489.489 0 01-.5-.48c0-.265.224-.478.5-.478.277 0 .5.213.5.478a.489.489 0 01-.5.48zm4.809 0a.489.489 0 01-.5-.48c0-.265.224-.478.5-.478s.498.213.498.478a.488.488 0 01-.498.48zm4.458 1.985h-.046c-.614 0-1.117.482-1.117 1.07v4.665c0 .59.503 1.071 1.117 1.071h.047c.615 0 1.115-.482 1.115-1.071V6.93c0-.589-.501-1.072-1.116-1.072z" />
              </svg>
            </NavIcon>
            <span>Android</span>
          </NavButton>
        </Category>
        <Category>
          <h2>Genres</h2>
          <NavButton
            data-testid="action"
            onClick={() => {
              this.props.setPageState("Action");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Action" && "white",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill={this.props.pageState === "Action" ? "black" : "white"}
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fillRule="nonzero"
                    d="M9.5 11l.144.007a1.5 1.5 0 0 1 1.35 1.349L11 12.5l-.007.144a1.5 1.5 0 0 1-1.349 1.35L9.5 14H6v2h3.5c1.7 0 3.117-1.212 3.434-2.819l.03-.18L19 13c.711 0 1.388-.149 2-.416V17a3.001 3.001 0 0 1-2 2.829V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1.17A3.001 3.001 0 0 1 3 17v-4a2 2 0 0 1 2-2h4.5zM22 7.5V8l-.005.176a3 3 0 0 1-2.819 2.819L19 11h-6.337a3.501 3.501 0 0 0-2.955-1.994L9.5 9H5c-.729 0-1.412.195-2.001.536L3 6a4 4 0 0 1 4-4h9.5A5.5 5.5 0 0 1 22 7.5z"
                  />
                </g>
              </svg>
            </NavIcon>
            <span>Action</span>
          </NavButton>
          <NavButton
            data-testid="strategy"
            onClick={() => {
              this.props.setPageState("Strategy");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Strategy" && "white",
              }}
            >
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 296.999 296.999"
                xmlSpace="preserve"
                fill={this.props.pageState === "Strategy" ? "black" : "white"}
              >
                <g>
                  <g>
                    <g>
                      <path
                        d="M226.983,260.96c-1.498-4.201-5.476-7.007-9.936-7.007H57.231c-5.099,0-9.468,3.648-10.378,8.666l-4.773,26.333
				c-0.218,1.204-0.173,2.458,0.247,3.607c1.005,2.749,3.556,4.44,6.306,4.44h181.553c1.363,0,2.726-0.345,3.854-1.109
				c2.648-1.794,3.598-5.022,2.599-7.826L226.983,260.96z"
                      />
                      <path
                        d="M253.923,113.07L202.42,35.815l9.914-26.804c0.873-2.361,0.347-5.013-1.362-6.861c-1.71-1.851-4.314-2.584-6.733-1.896
				l-48.56,13.733c-4.755-0.085-22.575,0.281-42.344,9.337c-20.892,9.57-47.981,30.99-58.39,78.68
				c-14.367,65.826-0.383,116.08,8.295,138.569h137.528l12.276-12.276c2.226-2.227,2.598-5.703,0.895-8.351
				c-11.321-17.596-38.038-61.909-48.365-89.48c3.783,1.293,8.071,2.127,12.604,1.89c6.445-0.337,12.327-2.696,17.551-7.028
				l18.855,12.571c5.825,3.884,13.047,5.081,19.815,3.284s12.445-6.42,15.577-12.683l4.365-8.729
				C255.415,117.625,255.255,115.067,253.923,113.07z M181.616,70.076h-9.094c-3.695,0-6.689-2.995-6.689-6.689
				c0-3.695,2.995-6.689,6.689-6.689h9.094c3.695,0,6.689,2.995,6.689,6.689C188.305,67.082,185.311,70.076,181.616,70.076z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </NavIcon>
            <span>Strategy</span>
          </NavButton>
          <NavButton
            data-testid="rpg"
            onClick={() => {
              this.props.setPageState("RPG");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "RPG" && "white",
              }}
            >
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 332.441 332.44"
                xmlSpace="preserve"
                fill={this.props.pageState === "RPG" ? "black" : "white"}
              >
                <g>
                  <g>
                    <g id="Layer_5_34_">
                      <g>
                        <g>
                          <path
                            d="M260.777,217.262l-49.705,49.705c-0.658,0.658-0.658,1.738,0,2.398l14.825,14.824c0.658,0.656,1.738,0.656,2.396,0
						l7.603-7.604c0.657-0.656,1.735-0.656,2.395,0.002l40.512,40.508c20.321,20.324,21.556,19.092,36.378,4.271
						c14.821-14.822,16.057-16.057-4.269-36.379l-40.51-40.512c-0.658-0.656-0.661-1.732-0.003-2.393l7.601-7.602
						c0.661-0.66,0.657-1.736,0-2.396l-14.824-14.828C262.513,216.604,261.436,216.604,260.777,217.262z M298.662,290.619
						l-14.239,14.242c-1.842,1.84-4.826,1.84-6.666,0c-1.841-1.844-1.841-4.826,0-6.668l14.24-14.24c1.842-1.84,4.825-1.842,6.666,0
						C300.503,285.793,300.503,288.778,298.662,290.619z M278.169,270.127l-14.24,14.242c-1.84,1.84-4.824,1.84-6.665,0
						c-1.84-1.84-1.841-4.826-0.001-6.666l14.242-14.24c1.84-1.842,4.824-1.842,6.664-0.002
						C280.012,265.303,280.012,268.287,278.169,270.127z"
                          />
                          <g>
                            <path
                              d="M205.74,189.598c-10.196,8.846-19.131,16.229-28.599,23.863c-0.467,0.377-1.216,1.322-0.272,2.021
							c16.28,12.842,28.107,21.561,33.939,25.824c2.174,1.594,3.363,2.434,4.822,0.977c4.895-4.896,14.315-14.318,19.578-19.58
							c1.463-1.461,1.084-2.674-0.316-4.188c-4.26-4.602-14.407-15.562-26.838-28.982
							C207.724,189.174,207.05,188.471,205.74,189.598z"
                            />
                            <path
                              d="M125.765,170.701c10.861-11.724,20.655-22.288,31.522-33.999c0.535-0.711,0.053-1.865-0.364-2.314
							c-8.375-9.016-15.716-16.908-20.923-22.48C110.686,84.803,45.448,2.472,45.448,2.472s-4.549-6.025-6.226,0.736
							c-2.779,11.213-7.844,37.059,4.221,72.381c9.189,26.9,43.862,63.051,79.581,94.941
							C123.553,171.004,124.738,171.576,125.765,170.701z"
                            />
                          </g>
                        </g>
                        <g>
                          <path
                            d="M293.214,3.209c-1.677-6.762-6.227-0.736-6.227-0.736s-65.236,82.33-90.552,109.436
						c-22.774,24.381-86.349,93.055-98.892,106.606c-1.401,1.516-1.778,2.729-0.317,4.188c5.262,5.262,14.685,14.684,19.579,19.58
						c1.458,1.457,2.65,0.617,4.823-0.977c22.286-16.305,148.499-110.501,167.362-165.719
						C301.058,40.268,295.994,14.422,293.214,3.209z"
                          />
                          <path
                            d="M69.266,217.262L54.439,232.09c-0.658,0.658-0.659,1.734,0,2.396l7.601,7.602c0.659,0.658,0.656,1.734-0.002,2.394
						l-40.509,40.511c-20.324,20.324-19.09,21.557-4.268,36.379c14.822,14.821,16.054,16.055,36.378-4.271l40.509-40.508
						c0.659-0.658,1.737-0.658,2.395-0.002l7.602,7.604c0.657,0.656,1.737,0.656,2.396,0l14.826-14.824
						c0.659-0.66,0.658-1.74,0-2.398l-49.706-49.705C71.004,216.604,69.924,216.604,69.266,217.262z M33.775,283.953
						c1.841-1.842,4.826-1.84,6.667,0l14.241,14.24c1.84,1.842,1.84,4.824,0,6.668c-1.841,1.84-4.826,1.84-6.666,0l-14.241-14.242
						C31.936,288.778,31.935,285.793,33.775,283.953z M54.268,263.461c1.84-1.84,4.826-1.84,6.667,0.002l14.241,14.24
						c1.841,1.84,1.84,4.826,0,6.666c-1.84,1.84-4.825,1.84-6.666,0l-14.241-14.242C52.427,268.287,52.426,265.303,54.268,263.461z"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </NavIcon>
            <span>RPG</span>
          </NavButton>
          <NavButton
            data-testid="shooter"
            onClick={() => {
              this.props.setPageState("Shooter");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Shooter" && "white",
              }}
            >
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 307.296 307.296"
                xmlSpace="preserve"
                fill={this.props.pageState === "Shooter" ? "black" : "white"}
              >
                <g>
                  <g>
                    <path
                      d="M301.395,84.292V62.356h-1.267v-7.789h-13.913v7.789c-18.645,0.022-137.869,0.152-195.067,0.196
			l-7.555-15.637l-14.729-3.927v19.575h-1.485c-8.093,0-24.465,8.55-32.857,24.03c-5.417,9.997-9.105,26.184,4.096,46.493
			l3.628,5.559l0.908-6.576c0.218-1.55,0.8-3.35,1.284-4.063c0.49,0.381,1.626,1.539,3.345,4.873
			c0.044,0.098,4.324,9.698-14.604,33.064C12.646,191.289,0.555,255.802,0,258.973v5.336h82.222v-7.228
			c14.658-16.459,23.616-48.712,28.724-74.711c1.664,0.299,3.323,0.441,4.944,0.441h24.476c16.089,0,37.66-16.709,37.66-33.804
			c0-5.194-1.376-10.312-3.943-14.8h127.301v-21.941h5.912V84.286h-5.901V84.292z M140.371,177.855h-24.476
			c-1.479,0-3.024-0.207-4.558-0.506l4.172-25.101c3.932,7.849,9.556,13.26,16.861,16.111c0.995,0.381,2.051,0.577,3.133,0.577
			c3.535,0,6.772-2.208,8.05-5.515c1.724-4.444-0.49-9.464-4.922-11.215c-7.364-2.839-11.95-11.248-13.734-18.205h43.067
			c3.296,4.368,5.102,9.518,5.102,15.001C173.066,162.935,153.882,177.855,140.371,177.855z"
                    />
                  </g>
                </g>
              </svg>
            </NavIcon>
            <span>Shooter</span>
          </NavButton>
          <NavButton
            data-testid="adventure"
            onClick={() => {
              this.props.setPageState("Adventure");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "Adventure" && "white",
              }}
            >
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512.002 512.002"
                xmlSpace="preserve"
                fill={this.props.pageState === "Adventure" ? "black" : "white"}
              >
                <g>
                  <g>
                    <path
                      d="M276.502,27.81c-4.051-7.562-11.935-12.281-20.515-12.281c-8.579,0-16.462,4.719-20.514,12.281l-81.861,152.808
			c0.182,0.143,0.372,0.273,0.549,0.42l17.699,14.794l18.235,15.243l8.427,7.045l49.444-18.208
			c5.193-1.911,10.896-1.91,16.088,0.003l49.402,18.204l8.424-7.036l18.24-15.235l17.741-14.818c0.164-0.14,0.344-0.258,0.512-0.391
			L276.502,27.81z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M508.654,461.168L380.802,222.513l-18.239,15.235l-18.24,15.232l-11.363,9.492c-6.39,5.339-15.153,6.856-22.966,3.976
			l-53.991-19.894l-54.035,19.896c-2.616,0.963-5.337,1.434-8.039,1.435c-5.376,0-10.675-1.862-14.928-5.416l-11.353-9.492
			l-18.235-15.243l-18.234-15.243L2.759,462.211c-3.863,7.211-3.658,15.924,0.546,22.944c4.204,7.02,11.785,11.318,19.967,11.318
			h465.428c0.012,0,0.023,0,0.031,0c12.854,0,23.271-10.421,23.271-23.271C512,468.797,510.778,464.681,508.654,461.168z"
                    />
                  </g>
                </g>
              </svg>
            </NavIcon>
            <span>Adventure</span>
          </NavButton>
          <NavButton
            data-testid="puzzle"
            onClick={() => {
              this.props.setPageState("Puzzle");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Puzzle" && "white",
              }}
            >
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 206.185 206.185"
                xmlSpace="preserve"
                fill={this.props.pageState === "Puzzle" ? "black" : "white"}
              >
                <path
                  d="M168.395,92.03c-3.313,0-6.574,0.492-9.687,1.44V51.833c0-4.142-3.357-7.5-7.5-7.5h-38.232
	c1.241-3.513,1.888-7.253,1.888-11.104C114.864,14.906,99.958,0,81.635,0S48.405,14.906,48.405,33.229
	c0,3.851,0.646,7.592,1.888,11.104H12.061c-4.143,0-7.5,3.358-7.5,7.5v49.721c0,2.515,1.261,4.863,3.357,6.252
	c2.097,1.389,4.75,1.636,7.066,0.654c2.243-0.95,4.631-1.431,7.097-1.431c10.052,0,18.23,8.178,18.23,18.229
	c0,10.051-8.178,18.229-18.23,18.229c-2.466,0-4.853-0.481-7.097-1.431c-2.316-0.982-4.97-0.735-7.066,0.654
	c-2.097,1.389-3.357,3.737-3.357,6.252v49.721c0,4.142,3.357,7.5,7.5,7.5h45.687c0.007,0.001,0.015,0,0.02,0
	c4.143,0,7.5-3.358,7.5-7.5c0-1.152-0.259-2.243-0.724-3.219c-0.756-2.032-1.139-4.163-1.139-6.341
	c0-10.052,8.178-18.229,18.229-18.229s18.229,8.178,18.229,18.229c0,2.332-0.439,4.609-1.305,6.77
	c-0.926,2.311-0.645,4.931,0.75,6.993c1.396,2.062,3.723,3.297,6.212,3.297h45.687c4.143,0,7.5-3.358,7.5-7.5v-41.636
	c3.112,0.948,6.373,1.44,9.687,1.44c18.322,0,33.229-14.906,33.229-33.229S186.718,92.03,168.395,92.03z"
                />
              </svg>
            </NavIcon>
            <span>Puzzle</span>
          </NavButton>
          <NavButton
            data-testid="racing"
            onClick={() => {
              this.props.setPageState("Racing");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Racing" && "white",
              }}
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1280.000000 1228.000000"
                preserveAspectRatio="xMidYMid meet"
                fill={this.props.pageState === "Racing" ? "black" : "white"}
              >
                <g
                  transform="translate(0.000000,1228.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M10249 12163 c-503 -432 -1098 -737 -1889 -968 -186 -54 -554 -148
-707 -181 -58 -12 -83 -21 -83 -31 0 -8 131 -499 291 -1091 159 -593 299
-1111 310 -1152 41 -153 35 -143 88 -135 132 19 411 95 643 174 223 76 289
103 285 115 -2 6 -163 445 -357 975 -280 767 -350 965 -339 972 8 5 32 14 54
19 103 27 455 147 590 200 300 120 650 307 933 499 67 46 127 81 134 79 15 -5
740 -1807 731 -1820 -11 -19 -326 -249 -468 -343 -344 -228 -683 -398 -1080
-542 -82 -30 -154 -58 -158 -63 -8 -7 746 -2114 762 -2133 9 -10 406 187 603
299 367 208 700 452 1002 733 60 56 114 100 119 98 6 -2 34 -64 63 -138 29
-73 177 -448 328 -833 152 -384 276 -706 276 -715 0 -35 -180 -237 -364 -410
-308 -288 -812 -643 -1231 -867 -105 -56 -129 -63 -138 -41 -2 6 -152 419
-332 917 -181 498 -331 909 -335 913 -4 5 -43 -9 -86 -31 -200 -100 -575 -249
-859 -341 -206 -67 -204 -67 -231 -11 -11 25 -585 1314 -1274 2865 -689 1551
-1259 2827 -1267 2835 -12 13 -81 15 -501 15 -480 0 -565 -4 -927 -41 -720
-74 -1443 -259 -2085 -534 -548 -234 -1101 -573 -1539 -941 -68 -57 -136 -113
-149 -125 -17 -14 -23 -27 -20 -40 3 -10 232 -593 508 -1294 276 -701 609
-1547 740 -1880 131 -333 531 -1350 890 -2260 358 -910 710 -1805 782 -1988
72 -182 134 -332 138 -332 4 0 40 40 79 89 287 364 788 857 1271 1252 971 792
2134 1489 2903 1738 201 65 343 92 477 93 170 0 258 -40 306 -139 25 -50 26
-61 21 -146 -10 -175 -117 -401 -325 -686 -176 -242 -477 -579 -498 -558 -2 1
38 70 87 152 254 424 326 688 216 792 -42 39 -85 53 -166 53 -308 0 -925 -340
-1343 -739 -42 -40 -68 -72 -68 -85 0 -12 18 -52 40 -90 168 -288 438 -456
845 -527 167 -29 507 -32 710 -5 791 102 1695 440 2560 959 722 432 1307 942
1544 1345 l31 53 -74 187 c-395 997 -575 1452 -1106 2792 -337 850 -754 1903
-927 2340 -173 437 -316 796 -317 798 -2 1 -54 -42 -117 -95z m-3842 -1347
c211 -457 379 -834 375 -838 -5 -5 -96 -18 -203 -29 -709 -72 -1379 -225
-2017 -460 -53 -20 -63 -27 -59 -44 8 -42 1002 -2325 1012 -2325 6 0 98 35
205 79 421 169 887 324 1285 426 337 87 725 159 745 139 17 -17 740 -1649 736
-1660 -2 -6 -41 -21 -86 -33 -490 -133 -1233 -498 -1889 -929 -120 -79 -145
-92 -156 -81 -7 8 -201 462 -430 1009 -229 547 -420 999 -425 1004 -15 15
-539 -259 -904 -472 -489 -284 -853 -535 -1297 -891 -21 -17 -33 -21 -40 -14
-12 12 -959 2469 -959 2489 0 16 377 299 580 436 420 281 936 562 1439 783 73
33 135 64 138 71 2 6 -165 435 -372 953 -208 518 -375 947 -372 955 10 26 398
128 647 170 391 66 782 93 1364 92 l300 -1 383 -829z"
                  />
                  <path
                    d="M282 10350 c-145 -65 -265 -120 -267 -122 -1 -1 192 -559 430 -1238
421 -1202 1266 -3614 2520 -7195 339 -968 620 -1764 625 -1769 9 -9 926 349
935 365 3 3 -42 125 -99 270 -58 145 -398 1011 -756 1924 -644 1639 -1479
3766 -2370 6035 -251 641 -517 1319 -591 1507 -95 242 -138 343 -149 342 -8 0
-133 -54 -278 -119z"
                  />
                </g>
              </svg>
            </NavIcon>
            <span>Racing</span>
          </NavButton>
          <NavButton
            data-testid="sports"
            onClick={() => {
              this.props.setPageState("Sports");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Sports" && "white",
              }}
            >
              <svg
                viewBox="-8 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                fill={this.props.pageState === "Sports" ? "black" : "white"}
              >
                <path d="M481.5 60.3c-4.8-18.2-19.1-32.5-37.3-37.4C420.3 16.5 383 8.9 339.4 8L496 164.8c-.8-43.5-8.2-80.6-14.5-104.5zm-467 391.4c4.8 18.2 19.1 32.5 37.3 37.4 23.9 6.4 61.2 14 104.8 14.9L0 347.2c.8 43.5 8.2 80.6 14.5 104.5zM4.2 283.4L220.4 500c132.5-19.4 248.8-118.7 271.5-271.4L275.6 12C143.1 31.4 26.8 130.7 4.2 283.4zm317.3-123.6c3.1-3.1 8.2-3.1 11.3 0l11.3 11.3c3.1 3.1 3.1 8.2 0 11.3l-28.3 28.3 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-28.3-28.3-22.6 22.7 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0L248 278.6l-22.6 22.6 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-28.3-28.3-28.3 28.3c-3.1 3.1-8.2 3.1-11.3 0l-11.3-11.3c-3.1-3.1-3.1-8.2 0-11.3l28.3-28.3-28.3-28.2c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 22.6-22.6-28.3-28.3c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 22.6-22.6-28.3-28.3c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 28.3-28.5z" />
              </svg>
            </NavIcon>
            <span>Sports</span>
          </NavButton>
          <NavButton
            data-testid="indie"
            onClick={() => {
              this.props.setPageState("Indie");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Indie" && "white",
              }}
            >
              <svg
                viewBox="125 0 900 900"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                fill={this.props.pageState === "Indie" ? "black" : "white"}
              >
                <path
                  d="M444 25q-20 0 -42 5q-66 15 -96 74q-27 52 -21 127q5 69 34 129q23 49 68 110q39 54 81 99.5t62 57.5q0 1 -1 3q-5 31 -15.5 55t-27.5 47q-16 19 -38.5 41t-70.5 64q-27 23 -43 50t-27 64q-3 13 -10 42q-11 49 -22.5 73.5t-33.5 45.5q-27 24 -47.5 33.5t-54.5 14.5
q-27 4 -41 11q-11 6 -21 16q-2 2 -2 4.5t2 4.5t4.5 2t4.5 -2q9 -8 18 -13q12 -7 36 -10q36 -5 58 -15q23 -11 52 -37q24 -22 37 -49q11 -25 23 -76q6 -28 10 -41q10 -35 25 -61t40 -47q49 -43 72 -65t39 -42q23 -30 35 -63q-5 33 -25 71l-20 36q-19 33 -24 55.5t0 50.5
q5 34 2 46l-1 1q-4 5 0 9q2 2 5 2t5 -2t3 -6q5 -15 -2 -52q-4 -26 0.5 -46t22.5 -51l21 -37q33 -66 27 -121q0 -2 -1 -3q26 -8 72 -29q63 -29 115 -63q68 -45 105 -93q46 -57 70 -123q26 -72 17 -131q-10 -66 -64 -103q-40 -26 -83 -26q-34 0 -73 18q-21 10 -56 32
q-14 9 -19 12q-9 5 -14 5t-12 -7q-5 -5 -16 -18q-30 -35 -53 -51q-41 -28 -89 -28zM464 937h-1h1z"
                />
              </svg>
            </NavIcon>
            <span>Indie</span>
          </NavButton>
          <NavButton
            data-testid="casual"
            onClick={() => {
              this.props.setPageState("Casual");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Casual" && "white",
              }}
            >
              <svg
                viewBox="1.75 2 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      fill={
                        this.props.pageState === "Casual" ? "black" : "white"
                      }
                      fillRule="nonzero"
                    >
                      <path d="M14.9978834,5 C18.8638767,5 21.9978834,8.13400675 21.9978834,12 C21.9978834,15.7854517 18.9931001,18.8690987 15.2385332,18.995941 L14.9978834,19 L9.00211656,19 C5.13612331,19 2.00211656,15.8659932 2.00211656,12 C2.00211656,8.21454828 5.00689994,5.13090132 8.76146681,5.00405902 L9.00211656,5 L14.9978834,5 Z M14.75,12.5 C14.0596441,12.5 13.5,13.0596441 13.5,13.75 C13.5,14.4403559 14.0596441,15 14.75,15 C15.4403559,15 16,14.4403559 16,13.75 C16,13.0596441 15.4403559,12.5 14.75,12.5 Z M8,9 C7.62030423,9 7.30650904,9.28215388 7.25684662,9.64822944 L7.25,9.75 L7.25,11.248 L5.75,11.2487458 C5.33578644,11.2487458 5,11.5845322 5,11.9987458 C5,12.3784415 5.28215388,12.6922367 5.64822944,12.7418991 L5.75,12.7487458 L7.25,12.748 L7.25,14.25 C7.25,14.6642136 7.58578644,15 8,15 C8.37969577,15 8.69349096,14.7178461 8.74315338,14.3517706 L8.75,14.25 L8.75,12.748 L10.25,12.7487458 C10.6642136,12.7487458 11,12.4129593 11,11.9987458 C11,11.61905 10.7178461,11.3052548 10.3517706,11.2555924 L10.25,11.2487458 L8.75,11.248 L8.75,9.75 C8.75,9.33578644 8.41421356,9 8,9 Z M16.75,9 C16.0596441,9 15.5,9.55964406 15.5,10.25 C15.5,10.9403559 16.0596441,11.5 16.75,11.5 C17.4403559,11.5 18,10.9403559 18,10.25 C18,9.55964406 17.4403559,9 16.75,9 Z"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </NavIcon>
            <span>Casual</span>
          </NavButton>
          <NavButton
            data-testid="simulation"
            onClick={() => {
              this.props.setPageState("Simulation");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "Simulation" && "white",
              }}
            >
              <svg
                fill={this.props.pageState === "Simulation" ? "black" : "white"}
                viewBox="0 0 56 56"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M 28.0000 26.6406 L 50.0783 14.1016 C 49.7264 13.75 49.3045 13.4688 48.7890 13.1875 L 32.2657 3.7657 C 30.8126 2.9453 29.4063 2.5000 28.0000 2.5000 C 26.5938 2.5000 25.1875 2.9453 23.7344 3.7657 L 7.2110 13.1875 C 6.6954 13.4688 6.2735 13.75 5.9219 14.1016 Z M 26.4063 53.5 L 26.4063 29.4532 L 4.3985 16.8906 C 4.2813 17.4063 4.2110 17.9688 4.2110 18.6719 L 4.2110 36.9297 C 4.2110 40.3281 5.4063 41.5938 7.5860 42.8360 L 25.9375 53.2891 C 26.1016 53.3828 26.2422 53.4532 26.4063 53.5 Z M 29.5938 53.5 C 29.7579 53.4532 29.8985 53.3828 30.0626 53.2891 L 48.4141 42.8360 C 50.5938 41.5938 51.7890 40.3281 51.7890 36.9297 L 51.7890 18.6719 C 51.7890 17.9688 51.7189 17.4063 51.6018 16.8906 L 29.5938 29.4532 Z"></path>
                </g>
              </svg>
            </NavIcon>
            <span>Simulation</span>
          </NavButton>
          <NavButton
            data-testid="arcade"
            onClick={() => {
              this.props.setPageState("Arcade");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Arcade" && "white",
              }}
            >
              <svg
                fill={this.props.pageState === "Arcade" ? "black" : "white"}
                viewBox="-2 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path d="M19.071,4.929a10,10,0,1,0,0,14.142L12,12ZM10,9a2,2,0,1,1,2-2A2,2,0,0,1,10,9Z" />
                </g>
              </svg>
            </NavIcon>
            <span>Arcade</span>
          </NavButton>
          <NavButton
            data-testid="platformer"
            onClick={() => {
              this.props.setPageState("Platformer");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "Platformer" && "white",
              }}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="2.5 1 28 28"
                xmlSpace="preserve"
                fill={this.props.pageState === "Platformer" ? "black" : "white"}
              >
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  <g>
                    <path d="M19,20c0-0.6,0.4-1,1-1h9.7c0.2-1,0.3-2,0.3-3s-0.1-2-0.3-3H20c-0.6,0-1-0.4-1-1V2.3C18,2.1,17,2,16,2s-2,0.1-3,0.3V12 c0,0.6-0.4,1-1,1H2.3C2.1,14,2,15,2,16s0.1,2,0.3,3H12c0.6,0,1,0.4,1,1v9.7c1,0.2,2,0.3,3,0.3s2-0.1,3-0.3V20z M24,15.3 c0-0.4,0.2-0.7,0.5-0.9c0.3-0.2,0.7-0.2,1,0l1,0.7c0.3,0.2,0.4,0.5,0.4,0.8s-0.2,0.6-0.4,0.8l-1,0.7c-0.2,0.1-0.4,0.2-0.6,0.2 c-0.2,0-0.3,0-0.5-0.1C24.2,17.4,24,17,24,16.7V15.3z M8,16.7c0,0.4-0.2,0.7-0.5,0.9c-0.1,0.1-0.3,0.1-0.5,0.1 c-0.2,0-0.4-0.1-0.6-0.2l-1-0.7C5.2,16.6,5,16.3,5,16s0.2-0.6,0.4-0.8l1-0.7c0.3-0.2,0.7-0.2,1,0C7.8,14.6,8,15,8,15.3V16.7z M14.5,6.4l0.7-1c0.4-0.6,1.3-0.6,1.7,0l0.7,1c0.2,0.3,0.2,0.7,0,1C17.4,7.8,17,8,16.7,8h-1.3c-0.4,0-0.7-0.2-0.9-0.5 C14.3,7.1,14.3,6.8,14.5,6.4z M17.5,25.6l-0.7,1C16.6,26.8,16.3,27,16,27s-0.6-0.2-0.8-0.4l-0.7-1c-0.2-0.3-0.2-0.7,0-1 c0.2-0.3,0.5-0.5,0.9-0.5h1.3c0.4,0,0.7,0.2,0.9,0.5C17.7,24.9,17.7,25.2,17.5,25.6z"></path>
                  </g>
                </g>
              </svg>
            </NavIcon>
            <span>Platformer</span>
          </NavButton>
          <NavButton
            data-testid="multiplayer"
            onClick={() => {
              this.props.setPageState("Multiplayer");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "Multiplayer" && "white",
              }}
            >
              <svg
                viewBox="15 15 45 45"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                baseProfile="full"
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g
                  id="SVGRepo_iconCarrier"
                  fill={
                    this.props.pageState === "Multiplayer" ? "black" : "white"
                  }
                >
                  <path
                    fillOpacity="1"
                    strokeWidth="0.2"
                    strokeLinejoin="round"
                    d="M 38,15.8333C 50.2423,15.8333 60.1667,25.7577 60.1667,38C 60.1667,50.2423 50.2423,60.1667 38,60.1667C 25.7577,60.1667 15.8333,50.2423 15.8333,38C 15.8333,25.7577 25.7577,15.8333 38,15.8333 Z M 19.065,36.4167L 25.3651,36.4167C 25.4708,33.796 25.8368,31.3011 26.4182,29.0106C 24.9471,28.4945 23.5896,27.8831 22.3719,27.1913C 20.5281,29.8522 19.3463,33.0068 19.065,36.4167 Z M 30.0541,20.7363C 27.8969,21.7308 25.9579,23.1177 24.3286,24.8056C 25.236,25.2756 26.2395,25.6989 27.3232,26.0677C 28.064,24.0419 28.9879,22.241 30.0541,20.7363 Z M 36.4167,36.4167L 36.4167,30.8432C 33.9463,30.7436 31.5878,30.4126 29.4069,29.8881C 28.9321,31.8962 28.6282,34.0974 28.5325,36.4167L 36.4167,36.4167 Z M 36.4167,19.2627C 33.9024,20.1063 31.7231,22.9251 30.2911,26.8939C 32.1894,27.3157 34.2515,27.5865 36.4167,27.6758L 36.4167,19.2627 Z M 56.9349,36.4167C 56.6536,33.0068 55.4719,29.8523 53.6281,27.1913C 52.4104,27.8831 51.0528,28.4946 49.5818,29.0107C 50.1631,31.3011 50.5291,33.796 50.6348,36.4167L 56.9349,36.4167 Z M 45.9459,20.7363C 47.012,22.241 47.9359,24.042 48.6767,26.0677C 49.7605,25.6989 50.7639,25.2756 51.6714,24.8056C 50.0421,23.1177 48.1031,21.7308 45.9459,20.7363 Z M 39.5833,36.4167L 47.4674,36.4167C 47.3718,34.0974 47.0678,31.8962 46.5931,29.8881C 44.4122,30.4126 42.0536,30.7436 39.5833,30.8432L 39.5833,36.4167 Z M 39.5833,19.2627L 39.5833,27.6758C 41.7484,27.5865 43.8106,27.3157 45.7088,26.8939C 44.2769,22.9251 42.0975,20.1064 39.5833,19.2627 Z M 56.9349,39.5834L 50.6348,39.5834C 50.5291,42.204 50.1631,44.6989 49.5818,46.9894C 51.0528,47.5055 52.4104,48.1169 53.6281,48.8087C 55.4719,46.1478 56.6536,42.9932 56.9349,39.5834 Z M 45.9459,55.2638C 48.1031,54.2692 50.0421,52.8823 51.6714,51.1944C 50.764,50.7244 49.7605,50.3011 48.6767,49.9323C 47.9359,51.9581 47.012,53.7591 45.9459,55.2638 Z M 39.5833,39.5834L 39.5833,45.1568C 42.0536,45.2564 44.4122,45.5874 46.5931,46.1119C 47.0678,44.1038 47.3718,41.9027 47.4675,39.5834L 39.5833,39.5834 Z M 39.5833,56.7373C 42.0975,55.8937 44.2769,53.075 45.7089,49.1061C 43.8106,48.6843 41.7484,48.4135 39.5833,48.3242L 39.5833,56.7373 Z M 19.065,39.5834C 19.3463,42.9932 20.5281,46.1478 22.3719,48.8087C 23.5896,48.1169 24.9471,47.5055 26.4182,46.9894C 25.8368,44.6989 25.4708,42.204 25.3651,39.5834L 19.065,39.5834 Z M 30.0541,55.2638C 28.988,53.7591 28.0641,51.9581 27.3232,49.9323C 26.2395,50.3011 25.236,50.7244 24.3286,51.1945C 25.9579,52.8823 27.8969,54.2693 30.0541,55.2638 Z M 36.4167,39.5834L 28.5325,39.5834C 28.6282,41.9027 28.9321,44.1039 29.4069,46.1119C 31.5878,45.5874 33.9463,45.2564 36.4167,45.1568L 36.4167,39.5834 Z M 36.4167,56.7373L 36.4167,48.3242C 34.2515,48.4135 32.1893,48.6843 30.2911,49.1061C 31.7231,53.075 33.9024,55.8937 36.4167,56.7373 Z "
                  ></path>
                </g>
              </svg>
            </NavIcon>
            <span>Multiplayer</span>
          </NavButton>
          <NavButton
            data-testid="fighting"
            onClick={() => {
              this.props.setPageState("Fighting");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Fighting" && "white",
              }}
            >
              <svg
                version="1.1"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                fill={this.props.pageState === "Fighting" ? "black" : "white"}
              >
                <g>
                  <path
                    d="M485.614,188.849c-25.472-11.892-46.128-16.635-52.926-23.064c-6.798-6.437-3.932-23.072-13.859-22.802
		c-9.927,0.262-18.51,15.029-17.822,22.646c0.655,7.371,20.771,22.146,20.771,22.146l-31.828-10.91c0,0-3.211-21.107-0.704-26.471
		c2.49-5.365,20.918-34.318-10.025-52.034c-30.927-17.707-62.493,14.923-51.223,64.294c0,0-56.677-2.458-82.476-7.552
		c-9.73-1.925-71.224-20.1-79.971-25.816c-8.764-5.717-20.394-19.313-33.171-26.914c-12.794-7.601,3.915,23.064,14.923,37.987
		c3.489,6.536-2.358,5.046-13.285,4.84c-7.387-0.139-8.174,9.656,9.076,11.18c12.17,1.064,34.514,3.03,34.514,3.03
		s36.054,19.23,55.154,24.26c26.553,6.994,54.204,7.813,54.204,7.813c-9.059,14.153-8.895,32.467-14.94,43.851
		c-10.745,20.197-37.922,5.979-37.922,5.979s-74.647-36.889-80.626-38.052c-5.995-1.163-94.844-37.356-101.38-43.081
		c-2.572-2.244,35.645-28.306,17.822-35.644c-13.76-5.66-37.234,0.844-48.684,18.371C9.802,160.429-5.137,171.42,1.744,181.167
		c6.88,9.746,19.493,10.729,24.145,11.27c7.306,0.835,77.939,48.593,105.049,59.118c20.738,8.043,91.094,57.628,91.094,57.628
		c10.893,4.636,48.192,43.72,48.192,43.72s-44.67-4.03-51.992-5.816c-7.338-1.793-30.288-30.468-35.743-36.283
		c-5.455-5.807-13.875,1.704-11.712,7.592c-2.424,8.674-6.683,28.331,5.472,37.266s36.251,24.678,36.251,24.678
		s73.828,31.632,104.165,37.52c31.451,6.102,56.678-31.934,38.331-64.597c-11.827-21.034-14.84-40.821-14.84-40.821
		s30.844-16.217,66.326-63.361c26.995-5.357,88.62-3.538,100.152-17.757C518.162,217.106,511.102,200.75,485.614,188.849z"
                  />
                </g>
              </svg>
            </NavIcon>
            <span>Fighting</span>
          </NavButton>
          <NavButton
            data-testid="family"
            onClick={() => {
              this.props.setPageState("Family");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Family" && "white",
              }}
            >
              <svg
                fill={this.props.pageState === "Family" ? "black" : "white"}
                viewBox="-1 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.181 15.129a1.81 1.81 0 0 0 .223.872H1.85a1.27 1.27 0 0 1-1.267-1.267v-1.9A3.176 3.176 0 0 1 3.75 9.667h5.478a3.177 3.177 0 0 0 .557 1.067 3.135 3.135 0 0 0-2.604 3.086zM6.6 8.717a3.236 3.236 0 1 1 3.236-3.236A3.236 3.236 0 0 1 6.6 8.717zm9.817 6.412a.875.875 0 0 1-.872.872H9.003a.875.875 0 0 1-.872-.872V13.82a2.187 2.187 0 0 1 2.18-2.18h3.925a2.187 2.187 0 0 1 2.18 2.18zm-1.915-6.372a2.228 2.228 0 1 1-2.228-2.228 2.228 2.228 0 0 1 2.228 2.228z" />
              </svg>
            </NavIcon>
            <span>Family</span>
          </NavButton>
          <NavButton
            data-testid="board-games"
            onClick={() => {
              this.props.setPageState("Board Games");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "Board Games" && "white",
              }}
            >
              <svg
                fill={
                  this.props.pageState === "Board Games" ? "black" : "white"
                }
                viewBox="25 30 450 450"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M440.88,129.37,288.16,40.62a64.14,64.14,0,0,0-64.33,0L71.12,129.37a4,4,0,0,0,0,6.9L254,243.85a4,4,0,0,0,4.06,0L440.9,136.27A4,4,0,0,0,440.88,129.37ZM256,152c-13.25,0-24-7.16-24-16s10.75-16,24-16,24,7.16,24,16S269.25,152,256,152Z" />
                <path d="M238,270.81,54,163.48a4,4,0,0,0-6,3.46V340.86a48,48,0,0,0,23.84,41.39L234,479.48a4,4,0,0,0,6-3.46V274.27A4,4,0,0,0,238,270.81ZM96,368c-8.84,0-16-10.75-16-24s7.16-24,16-24,16,10.75,16,24S104.84,368,96,368Zm96-32c-8.84,0-16-10.75-16-24s7.16-24,16-24,16,10.75,16,24S200.84,336,192,336Z" />
                <path d="M458,163.51,274,271.56a4,4,0,0,0-2,3.45V476a4,4,0,0,0,6,3.46l162.15-97.23A48,48,0,0,0,464,340.86V167A4,4,0,0,0,458,163.51ZM320,424c-8.84,0-16-10.75-16-24s7.16-24,16-24,16,10.75,16,24S328.84,424,320,424Zm0-88c-8.84,0-16-10.75-16-24s7.16-24,16-24,16,10.75,16,24S328.84,336,320,336Zm96,32c-8.84,0-16-10.75-16-24s7.16-24,16-24,16,10.75,16,24S424.84,368,416,368Zm0-88c-8.84,0-16-10.75-16-24s7.16-24,16-24,16,10.75,16,24S424.84,280,416,280Z" />
              </svg>
            </NavIcon>
            <span>Board Games</span>
          </NavButton>
          <NavButton
            data-testid="educational"
            onClick={() => {
              this.props.setPageState("Educational");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor:
                  this.props.pageState === "Educational" && "white",
              }}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                xmlSpace="preserve"
                fill={
                  this.props.pageState === "Educational" ? "black" : "white"
                }
              >
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  <g>
                    <path d="M31,26c-0.6,0-1-0.4-1-1V12c0-0.6,0.4-1,1-1s1,0.4,1,1v13C32,25.6,31.6,26,31,26z"></path>
                  </g>
                  <g>
                    <path d="M16,21c-0.2,0-0.3,0-0.5-0.1l-15-8C0.2,12.7,0,12.4,0,12s0.2-0.7,0.5-0.9l15-8c0.3-0.2,0.6-0.2,0.9,0l15,8 c0.3,0.2,0.5,0.5,0.5,0.9s-0.2,0.7-0.5,0.9l-15,8C16.3,21,16.2,21,16,21z"></path>
                  </g>
                  <path d="M17.4,22.6C17,22.9,16.5,23,16,23s-1-0.1-1.4-0.4L6,18.1V22c0,3.1,4.9,6,10,6s10-2.9,10-6v-3.9L17.4,22.6z"></path>
                </g>
              </svg>
            </NavIcon>
            <span>Educational</span>
          </NavButton>
          <NavButton
            data-testid="card"
            onClick={() => {
              this.props.setPageState("Card");
              this.state.isMobileView && this.props.closeSideBar();
            }}
          >
            <NavIcon
              style={{
                backgroundColor: this.props.pageState === "Card" && "white",
              }}
            >
              <svg
                fill={this.props.pageState === "Card" ? "black" : "white"}
                viewBox="0 2 19 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17,4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H15a2,2,0,0,0,2-2ZM5.5,7a1,1,0,1,1,1-1A1,1,0,0,1,5.5,7Zm4,7c-1,1-3,2-3-1s3-4,3-4,3,1,3,4S10.5,15,9.5,14Zm4,5a1,1,0,1,1,1-1A1,1,0,0,1,13.5,19Z" />
              </svg>
            </NavIcon>
            <span>Card</span>
          </NavButton>
        </Category>
      </StyledSidebar>
    );
  }
}

Sidebar.propTypes = {
  pageState: PropTypes.string,
  setPageState: PropTypes.func,
  closeSideBar: PropTypes.func,
  isSideBarVisible: PropTypes.bool,
};

export default Sidebar;
