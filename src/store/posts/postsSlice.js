import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const initialState = {
  posts: [],
  loading: false,
  success: false,
  error: null,
};

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    try {
      const postsRef = collection(db, "posts");
      const posts = await getDocs(postsRef);
      return posts;
    } catch (error) {
      return error.message;
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    }),
      builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        action.payload.forEach((item) => {
          state.posts.push({ id: item.id, ...item.data() });
        });
      });
    builder.addCase(fetchAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "Something went wrong please try again!";
      state.success = false;
    });
  },
});

export default postSlice.reducer;
