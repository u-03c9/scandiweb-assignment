import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  getCurrencyOptionsAsync,
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
    const { getCurrencyOptions } = this.props;
    getCurrencyOptions();
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.dismissMenuHandler);
  }

  render() {
    const handleClick = (e, currency) => {
      e.preventDefault();
      this.props.setCurrentCurrency(currency);
    };

    // item 7af
    const { currencyOptions, currentCurrency } = this.props;
    return (
      <div className="currency-menu">
        {currencyOptions
          ? currencyOptions.map(({ label, symbol }) => (
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
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currencyOptions: selectCurrencyOptions,
  currentCurrency: selectCurrentCurrency,
});

const mapDispatchToState = (dispatch) => ({
  dismissMenu: () => dispatch(dismissCurrencyMenu()),
  getCurrencyOptions: () => dispatch(getCurrencyOptionsAsync()),
  setCurrentCurrency: (currency) => dispatch(setCurrentCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToState)(CurrencyMenu);
