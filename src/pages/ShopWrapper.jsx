import { useLocation, useNavigate } from "react-router-dom";
import Shop from "./Shop";

const ShopWrapper = (props) => {
  const location = useLocation();
  let navigate = useNavigate();

  return <Shop {...props} location={location} navigate={navigate} />;
};

export default ShopWrapper;
