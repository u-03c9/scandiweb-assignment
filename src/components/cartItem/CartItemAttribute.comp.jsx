import React from "react";
import { nanoid } from "@reduxjs/toolkit";

import RadioButton from "../../base/radioButton/RadioButton.base";

class CartItemAttribute extends React.Component {
  id = nanoid();

  render() {
    const { attribute, selectedAttributes } = this.props;
    return (
      <div className="cart-item-attribute">
        <span className="cart-item-attribute__title">{attribute.name}:</span>
        <div className="cart-item-attribute__options">
          {attribute.items.map(({ value, displayValue, id }, idx) => (
            <RadioButton
              type="radio"
              name={attribute.id}
              value={value}
              id={this.id + id}
              key={this.id + id}
              label={displayValue}
              isSwatch={attribute.type === "swatch"}
              onChange={this.props.onChange}
              checked={selectedAttributes[attribute.name] === value}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CartItemAttribute;
