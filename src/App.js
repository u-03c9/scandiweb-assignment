import React, { Suspense } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.scss";
import SpinnerComp from "./components/spinner/Spinner.comp";
import {
  getCategoryNamesAsync,
  selectCategoryNames,
  selectHasNetworkError,
  selectIsLoading,
} from "./redux/shop.reducer";

import HeaderComp from "./components/header/Header.comp";
import AppRoutes from "./routes";
import ServerErrorPage from "./pages/serverError/ServerError.page";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchCategoryNames();
  }

  render() {
    const { categoryNames, isLoading, hasNetworkError } = this.props;

    return (
      <>
        {isLoading ? (
          <SpinnerComp />
        ) : hasNetworkError ? (
          <ServerErrorPage />
        ) : (
          <>
            <HeaderComp />
            <main id="page-container">
              <Suspense fallback={<SpinnerComp />}>
                <AppRoutes categoryNames={categoryNames} />
              </Suspense>
            </main>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categoryNames: selectCategoryNames,
  isLoading: selectIsLoading,
  hasNetworkError: selectHasNetworkError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoryNames: () => dispatch(getCategoryNamesAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
