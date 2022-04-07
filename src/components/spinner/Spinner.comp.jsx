import React from "react";

import "./Spinner.styles.scss";

class SpinnerComp extends React.Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="lds-dual-ring" />
      </div>
    );
  }
}

export default SpinnerComp;
