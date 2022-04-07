import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentCurrency } from "../../redux/currency.reducer";
import {
  selectCartItems,
  selectCartItemsTotalCount,
  selectCartItemsTotalPrice,
} from "../../redux/cart.reducer";

import CartItem from "./CartItem.comp";

class CartItemsContainer extends React.Component {
  render() {
    const {
      cartItems,
      cartItemsTotalCount,
      cartItemsTotalPrice,
      currentCurrency,
      children,
      className,
      displayThumbnailArrows,
    } = this.props;

    const totalPrice = cartItemsTotalPrice(currentCurrency);
    return (
      <div className={className}>
        {cartItemsTotalCount ? (
          <div className="cart-items-container__items">
            {cartItems.map((item, idx) => (
              <CartItem
                item={item}
                key={idx}
                id={idx}
                currentCurrency={currentCurrency}
                displayThumbnailArrows={displayThumbnailArrows}
              />
            ))}
          </div>
        ) : (
          { ...children }
        )}

        {!cartItemsTotalCount && displayThumbnailArrows ? null : (
          <div className="cart-items__total">
            <span>Total</span>
            <span>{totalPrice}</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentCurrency: selectCurrentCurrency,
  cartItems: selectCartItems,
  cartItemsTotalCount: selectCartItemsTotalCount,
  cartItemsTotalPrice: (currency) => selectCartItemsTotalPrice(currency),
});

export default connect(mapStateToProps)(CartItemsContainer);
