import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCurrencyOptions,
  selectCurrentCurrency,
  setCurrentCurrency,
} from "../../redux/currency.reducer";
import { dismissCurrencyMenu } from "../../redux/ui.reducer";

import "./CurrencyMenu.styles.scss";

class CurrencyMenu extends React.Component {
  dismissMenuHandler = () => {
    this.props.dismissMenu();
  };

  componentDidMount() {
    window.addEventListener("click", this.dismissMenuHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.dismissMenuHandler);
  }

  render() {
    const handleClick = (e, currency) => {
      e.preventDefault();
      this.props.setCurrentCurrency(currency);
    };

    const { currencyOptions, currentCurrency } = this.props;
    if (currencyOptions)
      return (
        <div className="currency-menu">
          {currencyOptions.map(({ label, symbol }) => (
            <div
              className={`currency-menu__item ${
                label === currentCurrency.label
                  ? "currency-menu__item__active"
                  : ""
              }`}
              key={label}
              onClick={(e) => handleClick(e, { label, symbol })}
            >
              <span>{symbol}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      );
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  currencyOptions: selectCurrencyOptions,
  currentCurrency: selectCurrentCurrency,
});

const mapDispatchToState = (dispatch) => ({
  dismissMenu: () => dispatch(dismissCurrencyMenu()),
  setCurrentCurrency: (currency) => dispatch(setCurrentCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToState)(CurrencyMenu);
