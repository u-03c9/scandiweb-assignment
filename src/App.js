// external
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// internal
import "./App.scss";
import SpinnerComp from "./components/spinner/Spinner.comp";

// lazy imports
const HeaderComp = lazy(() => import("./components/header/Header.comp"));
const HomePage = lazy(() => import("./pages/home/Home.page"));
const CheckoutPage = lazy(() => import("./pages/checkout/Checkout.page"));
const NotFoundPage = lazy(() => import("./pages/notFound/NotFound.page"));

class App extends React.Component {
  render() {
    return (
      <div id="App">
        <Suspense fallback={<SpinnerComp />}>
          <HeaderComp />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route exact path="/checkout" element={<CheckoutPage />} />
            <Route exact path="/not-found" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    );
  }
}

export default App;
