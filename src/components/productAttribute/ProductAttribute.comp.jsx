import React from "react";

import RadioButton from "../../base/radioButton/RadioButton.base";

class ProductAttribute extends React.Component {
  isDefaultChecked = (value, idx) => {
    const { attribute, selectedAttributes } = this.props;
    if (!selectedAttributes) return idx === 0;
    return selectedAttributes[attribute.name] === value;
  };

  render() {
    const { attribute, productId } = this.props;
    return (
      <div className="product-attribute">
        <span className="product-attribute__title">{attribute.name}:</span>
        <div className="product-attribute__options">
          {attribute.items.map(({ value, displayValue, id }, idx) => (
            <RadioButton
              type="radio"
              name={attribute.id}
              value={value}
              id={productId + attribute.id + id}
              key={productId + attribute.id + id}
              label={displayValue}
              isSwatch={attribute.type === "swatch"}
              defaultChecked={this.isDefaultChecked(value, idx)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductAttribute;
