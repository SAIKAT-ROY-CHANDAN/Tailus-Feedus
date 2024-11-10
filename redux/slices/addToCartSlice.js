import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addRecipeToCart: (state, action) => {
      const recipe = action.payload;
      const existingRecipe = state.items.find((item) => item.id === recipe.id);

      if (existingRecipe) {
        existingRecipe.quantity += 1;
      } else {
        state.items.push({ ...recipe, quantity: 1 });
      }

      state.totalItems += 1;
    },

    removeRecipeFromCart: (state, action) => {
      const recipeId = action.payload;
      const recipeIndex = state.items.findIndex((item) => item.id === recipeId);

      if (recipeIndex !== -1) {
        state.totalItems -= state.items[recipeIndex].quantity;
        state.items.splice(recipeIndex, 1);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
});

export const { addRecipeToCart, removeRecipeFromCart, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) => state.cart.totalItems;

export default cartSlice.reducer;
