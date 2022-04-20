import React from "react";
import { connect } from "react-redux";

import { addItemToCart } from "../../redux/cart.reducer";

import CustomModal from "../../base/customModal/CustomModal.comp";
import ProductAttribute from "../productAttribute/ProductAttribute.comp";

import "./ProductModal.styles.scss";

class ProductModal extends React.Component {
  handleSubmit = (e) => {
    const { product, addItemToCart, dismissModal } = this.props;
    e.preventDefault();

    const formData = new FormData(e.target);
    const selectedAttributes = Object.fromEntries(formData.entries());
    addItemToCart({ ...product, selectedAttributes });
    dismissModal();
  };

  render() {
    const { id, brand, name, attributes } = this.props.product;

    return (
      <CustomModal>
        <div className="product-modal" onClick={(e) => e.stopPropagation()}>
          <div
            className="product-modal__overlay"
            onClick={() => this.props.dismissModal()}
          />
          <form onSubmit={this.handleSubmit} className="product-modal__content">
            <h1 className="product-modal__content__brand">{brand}</h1>
            <h2 className="product-modal__content__name">{name}</h2>
            {attributes.map((item) => (
              <ProductAttribute attribute={item} productId={id} key={item.id} />
            ))}
            <button className="product-modal__submit-btn">add to cart</button>
          </form>
        </div>
      </CustomModal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart({ item })),
});

export default connect(null, mapDispatchToProps)(ProductModal);
