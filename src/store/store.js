import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";
import userReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});

export default store;
