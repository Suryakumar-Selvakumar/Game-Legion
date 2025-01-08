import { useLocation } from "react-router-dom";
import Shop from "./Shop";

const ShopWrapper = (props) => {
  const location = useLocation();
  return <Shop {...props} location={location} />;
};

export default ShopWrapper;
