import { createSlice, createSelector } from "@reduxjs/toolkit";
import { isEqual, findIndex, findLastIndex, transform } from "lodash";

import { formatPrice } from "./utils";

// =====================
// === INITIAL STATE ===

const initialState = {
  items: [],
};

// ================
// === ACTIONS ====

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, { payload: { item } }) => {
      state.items.push(item);
    },
    removeItemFromCart: (state, { payload: { item } }) => {
      const idx = findCartItemIdx(state.items, item, false);
      state.items.splice(idx, 1);
    },
    clearItemFromCart: (state, { payload: { item } }) => {
      state.items = state.items.filter(
        (cartItem) => !isCartItemEqual(cartItem, item)
      );
    },
    modifyItemInCart: (state, { payload: { oldItem, newItem } }) => {
      state.items = state.items.map((cartItem) =>
        isCartItemEqual(oldItem, cartItem) ? newItem : cartItem
      );
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  modifyItemInCart,
} = cartSlice.actions;

// =================
// === SELECTORS ===

const selectCartStore = (state) => state.cart;
export const selectCartItems = createSelector([selectCartStore], (cart) => {
  const itemsForDisplay = transform(
    cart.items,
    (accumulator, item) => {
      const idx = findCartItemIdx(accumulator, item);
      idx > -1
        ? (accumulator[idx].quantity += 1)
        : accumulator.push({ ...item, quantity: 1 });
    },
    []
  );
  return itemsForDisplay;
});
export const selectCartItemsTotalCount = createSelector(
  [selectCartItems],
  (items) => items.length
);
export const selectCartItemsTotalPrice = createSelector(
  [selectCartItems],
  (items) => (currency) => {
    const total = items.reduce(
      (accumulator, item) =>
        accumulator +
        item.prices.find((p) => p.currency.label === currency.label).amount *
          item.quantity,
      0
    );
    return `${currency.symbol}${formatPrice(total, currency)}`;
  }
);

// =============
// === utils ===
const isCartItemEqual = (a, b) =>
  a.id === b.id && isEqual(a.selectedAttributes, b.selectedAttributes);

const findCartItemIdx = (list, item, fromStart = true) =>
  fromStart
    ? findIndex(list, (listItem) => isCartItemEqual(listItem, item))
    : findLastIndex(list, (listItem) => isCartItemEqual(listItem, item));

// ======================
// === DEFAULT EXPORT ===

export default cartSlice.reducer;
