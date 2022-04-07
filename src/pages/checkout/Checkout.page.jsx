import React from "react";
import { Link } from "react-router-dom";

import "./Checkout.styles.scss";
import CartItemsContainer from "../../components/cartItem/CartItems.container";

class CheckoutPage extends React.Component {
  render() {
    return (
      <div id="checkout-page">
        <h1 className="checkout-page__title">cart</h1>
        <CartItemsContainer
          className="checkout-page__cart-items-container"
          displayThumbnailArrows
        >
          <div className="checkout-page__no-items">
            <span>There are no Items in your bag</span>
            <Link to="/">explore our products</Link>
          </div>
        </CartItemsContainer>
      </div>
    );
  }
}

export default CheckoutPage;
