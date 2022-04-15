import React from "react";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import { createStructuredSelector } from "reselect";
import sanitizeHtml from "sanitize-html";
import parseHtml from "html-react-parser";

import { withNavigation, withParams } from "../../HOC";
import { fetchProductInfo } from "../../api";
import { selectProductPrice } from "../../redux/currency.reducer";
import { addItemToCart } from "../../redux/cart.reducer";

import SpinnerComp from "../../base/spinner/Spinner.comp";
import ProductAttribute from "../../components/productAttribute/ProductAttribute.comp";
import "./Product.styles.scss";

class ProductPage extends React.Component {
  state = {
    isLoading: false,
    product: null,
    selectedImage: 0,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const productId = this.props.params.productId;
    const navigate = this.props.navigate;

    this.setState({ isLoading: true });
    fetchProductInfo(productId)
      .then(({ data: { product }, error }) => {
        if (error) {
          navigate("/500");
          return;
        } else if (!product) {
          navigate("/404");
          return;
        }
        this.setState({ product });
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        navigate("/500");
      });
  }

  render() {
    const { isLoading, product } = this.state;

    if (isLoading) return <SpinnerComp />;
    else if (product) {
      const { addItemToCart, getProductPrice } = this.props;
      const { selectedImage } = this.state;

      const price = getProductPrice(product.prices);
      const safeDescription = sanitizeHtml(product.description);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!product.inStock) return;

        const { inStock, description, ...otherInfo } = product;
        const formData = new FormData(e.target);
        const selectedAttributes = Object.fromEntries(formData.entries());
        addItemToCart({ ...otherInfo, selectedAttributes });
      };

      return (
        <div id="product-page">
          <div className="product-page__images">
            <div className="product-page__thumbnails-container">
              {product.gallery.map((image, idx) => (
                <img
                  className="product-page__thumbnail"
                  key={idx}
                  onClick={() => this.setState({ selectedImage: idx })}
                  src={image}
                  alt=""
                />
              ))}
            </div>
            <img
              src={product.gallery[selectedImage]}
              alt=""
              className="product-page__full-image"
            />
          </div>

          <div className="product-page__info">
            <form onSubmit={handleSubmit}>
              <h2 className="product-page__info__brand">{product.brand}</h2>
              <h1 className="product-page__info__name">{product.name}</h1>
              <div className="product-page__info__attributes">
                {product.attributes.map((item) => (
                  <ProductAttribute
                    attribute={item}
                    productId={product.id}
                    key={item.id}
                  />
                ))}
              </div>
              <div className="product-page__info__price">
                <span className="product-page__info__price__title">price:</span>
                <span className="product-page__info__price__value">
                  {price}
                </span>
              </div>

              <button
                className="product-page__info__add-to-cart"
                type="submit"
                disabled={!product.inStock}
              >
                {product.inStock ? "add to cart" : "out of stock"}
              </button>
            </form>
            <div className="product-page__info__description">
              {parseHtml(safeDescription)}
            </div>
          </div>
        </div>
      );
    } else return null;
  }
}

const mapStateToProps = createStructuredSelector({
  getProductPrice: (prices) => selectProductPrice(prices),
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart({ item })),
});

export default compose(
  withNavigation,
  withParams,
  connect(mapStateToProps, mapDispatchToProps)
)(ProductPage);
