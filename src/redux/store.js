import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import loaderSlice from "./loaderSlice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    loaders: loaderSlice.reducer,
  },
});

export default store;
