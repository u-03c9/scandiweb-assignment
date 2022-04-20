import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
  modifyItemInCart,
} from "../../redux/cart.reducer";
import { selectProductPrice } from "../../redux/currency.reducer";

import { ReactComponent as AddSVG } from "../../assets/images/add-sign.svg";
import { ReactComponent as SubSVG } from "../../assets/images/sub-sign.svg";
import { ReactComponent as LeftArrowSVG } from "../../assets/images/arrow-left.svg";
import { ReactComponent as RightArrowSVG } from "../../assets/images/arrow-right.svg";
import { ReactComponent as DeleteSVG } from "../../assets/images/delete-sign.svg";

import "./CartItem.styles.scss";
import ProductModal from "../productModal/ProductModal.comp";
import CartItemAttribute from "./CartItemAttribute.comp";

class CartItem extends React.Component {
  state = {
    selectedImageIdx: 0,
    showModal: false,
  };

  arrowOnClickHandler = (toLeft = true) => {
    const { selectedImageIdx } = this.state;
    const { gallery } = this.props.item;

    if (toLeft) {
      if (selectedImageIdx === 0)
        this.setState({ selectedImageIdx: gallery.length - 1 });
      else this.setState({ selectedImageIdx: selectedImageIdx - 1 });
    } else {
      if (selectedImageIdx + 1 === gallery.length)
        this.setState({ selectedImageIdx: 0 });
      else this.setState({ selectedImageIdx: selectedImageIdx + 1 });
    }
  };

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    const { item, modifyItemInCart } = this.props;
    modifyItemInCart(item, name, value);
  };

  render() {
    const {
      item,
      increase,
      decrease,
      getProductPrice,
      displayThumbnailArrows,
    } = this.props;

    const { selectedImageIdx } = this.state;
    const price = getProductPrice(item.prices);

    return (
      <form className="cart-item">
        <div className="cart-item__left">
          <div className="cart-item__left__top">
            <div className="cart-item__info">
              <h2 className="cart-item__info__brand">{item.brand}</h2>
              <h1 className="cart-item__info__name">{item.name}</h1>
              <span className="cart-item__info__price">{price}</span>
            </div>
            <div className="cart-item__extra-buttons">
              <DeleteSVG onClick={() => this.props.clearItem(item)} />
            </div>
          </div>
          <div className="cart-item__attributes">
            {item.attributes.map((attribute) => (
              <CartItemAttribute
                key={attribute.id}
                attribute={attribute}
                productId={item.id}
                selectedAttributes={item.selectedAttributes}
                onChange={this.onChangeHandler}
              />
            ))}
          </div>
        </div>

        <div className="cart-item__quantity">
          <div
            className="cart-item__quantity__button"
            onClick={() => increase(item)}
          >
            <AddSVG />
          </div>
          <span className="cart-item__quantity__value">{item.quantity}</span>
          <div
            className="cart-item__quantity__button"
            onClick={() => decrease(item)}
          >
            <SubSVG />
          </div>
        </div>

        <div
          className="cart-item__thumbnail"
          style={{
            backgroundImage: `url('${item.gallery[selectedImageIdx]}')`,
          }}
        >
          {displayThumbnailArrows && item.gallery.length > 1 ? (
            <>
              <div
                className="cart-item__thumbnail__button-container"
                onClick={() => this.arrowOnClickHandler()}
              >
                <LeftArrowSVG className="cart-item__thumbnail__left-arrow" />
              </div>
              <div
                className="cart-item__thumbnail__button-container"
                onClick={() => this.arrowOnClickHandler(false)}
              >
                <RightArrowSVG className="cart-item__thumbnail__right-arrow" />
              </div>
            </>
          ) : null}
        </div>

        {this.state.showModal ? (
          <ProductModal
            product={item}
            dismissModal={() => this.setState({ showModal: false })}
            isEditing
          />
        ) : null}
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  getProductPrice: (prices) => selectProductPrice(prices),
});

const mapDispatchToProps = (dispatch) => ({
  increase: (item) => dispatch(addItemToCart({ item })),
  decrease: (item) => dispatch(removeItemFromCart({ item })),
  clearItem: (item) => dispatch(clearItemFromCart({ item })),
  modifyItemInCart: (oldItem, name, value) =>
    dispatch(modifyItemInCart({ oldItem, attribute: { name, value } })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
