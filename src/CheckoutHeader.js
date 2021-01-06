import { Link } from "react-router-dom";
import React from "react";
import { useStateValue } from "./StateProvider";
import { red } from "@material-ui/core/colors";
import HttpsIcon from "@material-ui/icons/Https";

import "./checkoutHeader.css";
import { Container } from "@material-ui/core";

const aIconLogo = {
  backgroundImage:
    "url(https://m.media-amazon.com/images/G/01/AUIClients/AmazonUIIcon-beacon_light_1x-addec3f…._V2_.png)",
  webkitBackgroundSize: "512px 256px",
  backgroundSize: "512px 256px",
  backgroundRepeat: "no-repeat",
};

function CheckoutHeader() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="bannerBorder">
      <Container>
        <div className="containElements">
          <div>
            <Link to="/">
              <img
                className="header__logo"
                src="https://pngimg.com/uploads/amazon/amazon_PNG24.png"
                alt="Amazon Logo"
              />
            </Link>
          </div>
          <div>
            <span>
              Checkout (<Link to="/checkout">{basket?.length} items </Link>)
            </span>
          </div>
          <HttpsIcon />
        </div>
      </Container>
    </div>
  );
}

export default CheckoutHeader;
