// external
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// reducers
import {
  selectIsCurrencyMenuOpen,
  toggleCurrencyMenu,
  dismissCurrencyMenu,
  selectCurrentCurrency,
} from "../../redux/currency.reducer";
import {
  selectIsCartMenuOpen,
  toggleCartMenu,
  dismissCartMenu,
  selectCartItemsTotal,
} from "../../redux/cart.reducer";
import { selectCategoryNames } from "../../redux/shop.reducer";

// assets
import { ReactComponent as CartSVG } from "../../assets/empty-cart.svg";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import { ReactComponent as ArrowSVG } from "../../assets/down-arrow.svg";

// styles
import "./Header.styles.scss";

// components
import CurrencyMenu from "../currencyMenu/CurrencyMenu.comp";
import CustomLink from "../customLink/CustomLink.comp";

class HeaderComp extends React.Component {
  dismissAllMenusHandler = () => {
    if (this.props.isCurrencyMenuOpen) this.props.dismissCurrencyMenu();
    if (this.props.isCartMenuOpen) this.props.dismissCartMenu();
  };

  componentDidMount() {
    window.addEventListener("click", this.dismissAllMenusHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.dismissAllMenusHandler);
  }

  render() {
    const {
      dismissCartMenu,
      dismissCurrencyMenu,
      isCartMenuOpen,
      isCurrencyMenuOpen,
      toggleCartMenu,
      toggleCurrencyMenu,
      cartItemsTotal,
    } = this.props;

    const handleOnClickCurrencyIcon = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isCartMenuOpen) dismissCartMenu();
      toggleCurrencyMenu();
    };

    const handleOnClickCartIcon = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isCurrencyMenuOpen) dismissCurrencyMenu();
      toggleCartMenu();
    };

    const { categoryNames, currentCurrency } = this.props;
    return (
      <header>
        <nav>
          {categoryNames
            ? categoryNames.map(({ name }) => (
                <CustomLink to={name} key={name}>
                  {name}
                </CustomLink>
              ))
            : null}
        </nav>
        <div className="logo">
          <LogoSVG />
        </div>
        <div className="menus">
          <div
            className={`currency-icon ${isCurrencyMenuOpen ? "active" : ""}`}
            onClick={handleOnClickCurrencyIcon}
          >
            <span>{currentCurrency.symbol}</span>
            <ArrowSVG />
          </div>
          <div
            className={`cart-icon ${isCartMenuOpen ? "active" : ""}`}
            onClick={handleOnClickCartIcon}
          >
            <div className="cart-icon__inner">
              <CartSVG />
              {cartItemsTotal > 0 ? (
                <span className="cart-icon__label">
                  {cartItemsTotal > 9 ? "+9" : cartItemsTotal}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        {isCurrencyMenuOpen ? <CurrencyMenu /> : null}
        {/* TODO: add cart menu here */}
      </header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCurrencyMenuOpen: selectIsCurrencyMenuOpen,
  isCartMenuOpen: selectIsCartMenuOpen,
  categoryNames: selectCategoryNames,
  currentCurrency: selectCurrentCurrency,
  cartItemsTotal: selectCartItemsTotal,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartMenu: () => dispatch(toggleCartMenu()),
  dismissCartMenu: () => dispatch(dismissCartMenu()),
  toggleCurrencyMenu: () => dispatch(toggleCurrencyMenu()),
  dismissCurrencyMenu: () => dispatch(dismissCurrencyMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComp);
