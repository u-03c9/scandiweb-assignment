import React from "react";
import { connect } from "react-redux";

import { addItemToCart, modifyItemInCart } from "../../redux/cart.reducer";

import CustomModal from "../../base/customModal/CustomModal.comp";
import ProductAttribute from "../productAttribute/ProductAttribute.comp";

import "./ProductModal.styles.scss";

class ProductModal extends React.Component {
  handleSubmit = (e) => {
    const {
      product,
      addItemToCart,
      dismissModal,
      modifyItemInCart,
      isEditing,
    } = this.props;
    e.preventDefault();

    const formData = new FormData(e.target);
    const selectedAttributes = Object.fromEntries(formData.entries());

    if (isEditing) {
      const { selectedAttributes: oldAttributes, ...otherInfo } = product;
      modifyItemInCart(product, { selectedAttributes, ...otherInfo });
    } else {
      addItemToCart({ ...product, selectedAttributes });
    }

    dismissModal();
  };

  render() {
    const { isEditing } = this.props;
    const { id, brand, name, attributes, selectedAttributes } =
      this.props.product;

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
              <ProductAttribute
                attribute={item}
                productId={id}
                key={item.id}
                selectedAttributes={selectedAttributes}
              />
            ))}
            <button className="product-modal__submit-btn">
              {isEditing ? "change cart item" : "add to cart"}
            </button>
          </form>
        </div>
      </CustomModal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart({ item })),
  modifyItemInCart: (oldItem, newItem) =>
    dispatch(modifyItemInCart({ oldItem, newItem })),
});

export default connect(null, mapDispatchToProps)(ProductModal);
