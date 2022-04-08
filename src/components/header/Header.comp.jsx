import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsCartMenuOpen } from "../../redux/ui.reducer";

import { ReactComponent as LogoSVG } from "../../assets/images/logo.svg";

import "./Header.styles.scss";

import CurrencyIcon from "../currencyIcon/CurrencyIcon.comp";
import CartIcon from "../cartIcon/CartIcon.comp";
import NavMenu from "../navMenu/NavMenu.comp";

class HeaderComp extends React.Component {
  render() {
    const { isCartMenuOpen } = this.props;

    return (
      <>
        {isCartMenuOpen ? <div className="header__overlay" /> : null}
        <header>
          <div className="header__navbar">
            <NavMenu />
            <div className="header__logo">
              <LogoSVG className="header__logo__svg" />
            </div>
            <div className="header__right-side">
              <CurrencyIcon />
              <CartIcon />
            </div>
          </div>
        </header>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCartMenuOpen: selectIsCartMenuOpen,
});

export default connect(mapStateToProps)(HeaderComp);
