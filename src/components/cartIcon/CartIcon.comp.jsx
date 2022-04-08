import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItemsTotalCount } from "../../redux/cart.reducer";
import { selectIsCartMenuOpen, toggleCartMenu } from "../../redux/ui.reducer";

import { ReactComponent as CartSVG } from "../../assets/images/empty-cart.svg";

import CartMenu from "../cartMenu/CartMenu.comp";
import "./CartIcon.styles.scss";

class CartIcon extends React.Component {
  render() {
    const { isMenuOpen, toggleMenu, itemsCount } = this.props;

    const handleOnClick = (e) => {
      e.stopPropagation();
      toggleMenu();
    };

    return (
      <>
        <div
          className={`cart-icon ${isMenuOpen ? "cart-icon__active" : ""}`}
          onClick={handleOnClick}
        >
          <div className="cart-icon__inner">
            <CartSVG />
            {itemsCount > 0 ? (
              <span className="cart-icon__label">
                {itemsCount > 9 ? "+9" : itemsCount}
              </span>
            ) : null}
          </div>
        </div>
        {isMenuOpen ? <CartMenu /> : null}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  itemsCount: selectCartItemsTotalCount,
  isMenuOpen: selectIsCartMenuOpen,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMenu: () => dispatch(toggleCartMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
