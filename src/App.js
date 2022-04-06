// external
import React, { Suspense } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// internal
import "./App.scss";
import SpinnerComp from "./components/spinner/Spinner.comp";
import {
  getCategoryNamesAsync,
  selectCategoryNames,
  selectErrorMsg,
  selectIsLoading,
} from "./redux/shop.reducer";

// components
import HeaderComp from "./components/header/Header.comp";
import AppRoutes from "./routes";

class ReduceMotionNotice extends React.Component {
  state = {
    showMessage: false,
  };

  componentDidMount() {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery || mediaQuery.matches) {
      this.setState({ showReduceMotionMessage: true });
    }
  }

  render() {
    const { showMessage, handleDismiss } = this.props;

    if (showMessage)
      return (
        <div id="reduce-motion-message">
          <div className="container" onClick={() => handleDismiss()}>
            <p>
              We respect that you prefer reduced motion and animations,
              therefore we have disabled it in our website. You can enable it in
              your operating system / browser to see our small animation
              <em>click here to dismiss</em>
            </p>
          </div>
        </div>
      );
    return null;
  }
}

class App extends React.Component {
  componentDidMount() {
    this.props.fetchCategoryNames();

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery || mediaQuery.matches) {
      this.setState({ showReduceMotionMessage: true });
    }
  }

  render() {
    const { categoryNames, isLoading, errorMsg } = this.props;

    return (
      <>
        <HeaderComp />
        {/* TODO: create error boundary */}
        <main id="page-container">
          {!isLoading && !errorMsg && categoryNames ? (
            <Suspense fallback={<SpinnerComp />}>
              <AppRoutes categoryNames={categoryNames} />
            </Suspense>
          ) : null}
        </main>
        <ReduceMotionNotice />
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categoryNames: selectCategoryNames,
  isLoading: selectIsLoading,
  errorMsg: selectErrorMsg,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoryNames: () => dispatch(getCategoryNamesAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
