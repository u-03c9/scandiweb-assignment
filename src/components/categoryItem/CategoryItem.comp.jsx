import React from "react";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import { createStructuredSelector } from "reselect";

import { selectProductPrice } from "../../redux/currency.reducer";
import { withNavigation } from "../../HOC.js";

import { ReactComponent as CartSVG } from "../../assets/images/circle-cart.svg";

import "./CategoryItem.styles.scss";

class CategoryItem extends React.Component {
  render() {
    const { product, navigate, getProductPrice } = this.props;
    const { id, brand, name, gallery, inStock, prices } = product;

    const price = getProductPrice(prices);

    return (
      <div className="category-item" onClick={() => navigate(`/product/${id}`)}>
        <div className="image-container">
          <div
            className="image"
            style={{ backgroundImage: `url('${gallery[0]}')` }}
          />
          {inStock ? (
            <CartSVG className="cart-icon" />
          ) : (
            <div className="out-of-stock-label">
              <span>out of stock</span>
            </div>
          )}
        </div>
        <div className="footer">
          <h3 className="name">{`${brand} ${name}`}</h3>
          <span className="price">{price}</span>
        </div>
        {inStock ? null : <div className="out-of-stock-overlay" />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  getProductPrice: (prices) => selectProductPrice(prices),
});

export default compose(connect(mapStateToProps), withNavigation)(CategoryItem);
