import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../reducers/categoryReducer";


const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});

export default store;
