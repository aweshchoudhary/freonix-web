import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";
import authReducer from "./auth/authSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
