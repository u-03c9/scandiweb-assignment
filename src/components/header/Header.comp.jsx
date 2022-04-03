// external
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

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
} from "../../redux/cart.reducer";
import {
  getCategoryNamesAsync,
  selectCategoryNames,
} from "../../redux/shop.reducer";

// assets
import { ReactComponent as CartSVG } from "../../assets/empty-cart.svg";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import { ReactComponent as ArrowSVG } from "../../assets/down-arrow.svg";

// styles
import "./Header.styles.scss";

// components
import CurrencyMenu from "../currencyMenu/CurrencyMenu.comp";

class HeaderComp extends React.Component {
  dismissAllMenusHandler = () => {
    if (this.props.isCurrencyMenuOpen) this.props.dismissCurrencyMenu();
    if (this.props.isCartMenuOpen) this.props.dismissCartMenu();
  };

  componentDidMount() {
    window.addEventListener("click", this.dismissAllMenusHandler);
    this.props.getCategoryNames();
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
                <Link to={name} key={name}>
                  {name}
                </Link>
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
            <CartSVG />
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
});

const mapDispatchToState = (dispatch) => ({
  toggleCartMenu: () => dispatch(toggleCartMenu()),
  dismissCartMenu: () => dispatch(dismissCartMenu()),
  toggleCurrencyMenu: () => dispatch(toggleCurrencyMenu()),
  dismissCurrencyMenu: () => dispatch(dismissCurrencyMenu()),
  getCategoryNames: () => dispatch(getCategoryNamesAsync()),
});

export default connect(mapStateToProps, mapDispatchToState)(HeaderComp);
