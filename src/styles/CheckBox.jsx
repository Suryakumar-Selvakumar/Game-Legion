import styled from "styled-components";
import { StyledSidebar } from "../components/Sidebar";

const CheckBox = styled.input.attrs({
  type: "checkbox",
})`
  display: none;
`;

export default CheckBox;
