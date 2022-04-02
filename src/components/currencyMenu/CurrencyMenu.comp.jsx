import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./CurrencyMenu.styles.scss";

class CurrencyMenu extends React.Component {
  render() {
    return (
      <div className="currency-menu">
        <div className="item">
          <span>$</span>
          <span>USD</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToState = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToState)(CurrencyMenu);
