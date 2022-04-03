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

class App extends React.Component {
  componentDidMount() {
    this.props.fetchCategoryNames();
  }

  render() {
    const { categoryNames, isLoading, errorMsg } = this.props;

    return (
      <div id="App">
        <HeaderComp />
        {/* TODO: create error boundary */}
        {!isLoading && !errorMsg && categoryNames ? (
          <Suspense fallback={<SpinnerComp />}>
            <AppRoutes categoryNames={categoryNames} />
          </Suspense>
        ) : null}
      </div>
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
