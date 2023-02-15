import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { db, storage } from "../../config/firebase";

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

export const uploadPost = createAsyncThunk(
  "posts/upload",
  async (postData, thunkApi) => {
    try {
      if (postData.file.size > 1048576) {
        return thunkApi.rejectWithValue("File size limit is 1MB");
      }
      let post = {
        img: null,
        description: postData.description,
        userid: postData.userid,
        createdAt: moment().fromNow(),
      };
      const storageRef = ref(storage, Date.now() + "-" + postData.file.name);
      const uploadImage = await uploadBytes(storageRef, postData.file);
      post.img =
        "https://firebasestorage.googleapis.com/v0/b/twitter-clone-362d5.appspot.com/o/" +
        uploadImage.metadata.fullPath;

      const postId = String(Math.round(Date.now() * Math.random() * 100));
      const postsRef = doc(db, "posts", postId);

      await setDoc(postsRef, post);
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
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
    });
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
    builder.addCase(uploadPost.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(uploadPost.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(uploadPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong please try again!";
      state.success = false;
    });
  },
});

export default postSlice.reducer;
