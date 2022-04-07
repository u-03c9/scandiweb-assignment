import { createSlice, createSelector } from "@reduxjs/toolkit";

// =====================
// === INITIAL STATE ===

const initialState = {
  isCartMenuOpen: false,
  isCurrencyMenuOpen: false,
  showMotion: true,
};

// ================
// === ACTIONS ====

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCartMenu: (state) => {
      if (state.isCurrencyMenuOpen) state.isCurrencyMenuOpen = false;
      state.isCartMenuOpen = !state.isCartMenuOpen;
    },
    toggleCurrencyMenu: (state) => {
      if (state.isCartMenuOpen) state.isCartMenuOpen = false;
      state.isCurrencyMenuOpen = !state.isCurrencyMenuOpen;
    },
    dismissCurrencyMenu: (state) => {
      state.isCurrencyMenuOpen = false;
    },
    dismissCartMenu: (state) => {
      state.isCartMenuOpen = false;
    },
    setShowMotion: (state, payload) => {
      state.showMotion = payload;
    },
  },
});

export const {
  dismissCartMenu,
  dismissCurrencyMenu,
  toggleCartMenu,
  toggleCurrencyMenu,
  setShowMotion,
} = uiSlice.actions;

// =================
// === SELECTORS ===

const selectUIStore = (state) => state.ui;
export const selectIsCurrencyMenuOpen = createSelector(
  [selectUIStore],
  (ui) => ui.isCurrencyMenuOpen
);
export const selectIsCartMenuOpen = createSelector(
  [selectUIStore],
  (ui) => ui.isCartMenuOpen
);
export const selectShowMotion = createSelector(
  [selectUIStore],
  (ui) => ui.showMotion
);

// ======================
// === DEFAULT EXPORT ===

export default uiSlice.reducer;
