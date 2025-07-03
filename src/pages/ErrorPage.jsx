import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledErrorPage = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }

  a {
    color: violet;
  }
`;

const ErrorPage = () => {
  return (
    <StyledErrorPage role="alert" aria-labelledby="error-heading">
      <h1 id="error-heading">Oh no, this route doesn't exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </StyledErrorPage>
  );
};

export default ErrorPage;
