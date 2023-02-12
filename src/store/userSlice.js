import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const initialState = {
  loading: false,
  error: null,
  success: false,
  data: null,
};

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userid, thunkApi) => {
    try {
      const usersRef = doc(db, "users", userid);
      const user = await getDoc(usersRef);
      if (user.exists()) {
        const userInfo = { userid: user.id, ...user.data() };
        return userInfo;
      } else {
        return thunkApi.rejectWithValue("User Not Found!");
      }
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (data, thunkApi) => {
    try {
      await updateDoc(data.userRef, data.updateData);
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data = action.payload;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
