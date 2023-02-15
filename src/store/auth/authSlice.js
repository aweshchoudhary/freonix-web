import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../config/firebase";
import { doc, getDoc, query, setDoc, where } from "firebase/firestore";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const exdays = 7;
let exdate = new Date();
exdate.setDate(exdate.getDate() + exdays);

const initialState = {
  loading: false,
  error: null,
  success: false,
  userid: cookies.get("userid") || null,
  accessToken: cookies.get("accessToken") || null,
  refreshToken: cookies.get("refreshToken") || null,
  userData: null,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkApi) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const loggedUser = credentials.user;
      const newUser = {
        displayName: user.displayName,
        email: loggedUser.email,
      };
      await setDoc(doc(db, "users", loggedUser.uid), newUser);
      return { ...credentials.user, userData: newUser };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  "auth/registerGoolgle",
  async (user, thunkApi) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        displayName: result.user.displayName,
        email: result.user.email,
      };
      if (result.user) {
        await setDoc(doc(db, "users", result.user.uid), userData);
      }
      return { ...result.user, userData };
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkApi) => {
    try {
      const credentails = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      return { ...credentails.user };
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.userid = null;
      state.refreshToken = null;

      cookies.remove("userid");
      cookies.remove("accessToken");
      cookies.remove("refreshToken");
    },
  },
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;

      state.userid = action.payload.uid;
      state.accessToken = action.payload.stsTokenManager.accessToken;
      state.refreshToken = action.payload.stsTokenManager.refreshToken;
      state.userData = action.payload.userData;

      cookies.set("userid", action.payload.uid, {
        expires: exdate,
      });
      cookies.set("accessToken", action.payload.stsTokenManager.accessToken, {
        expires: exdate,
      });
      cookies.set("refreshToken", action.payload.stsTokenManager.refreshToken, {
        expires: exdate,
      });
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(signInWithGoogle.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;

      state.userid = action.payload.uid;
      state.accessToken = action.payload.stsTokenManager.accessToken;
      state.refreshToken = action.payload.stsTokenManager.refreshToken;
      state.userData = action.payload.userData;

      cookies.set("userid", action.payload.uid, {
        expires: exdate,
      });
      cookies.set("accessToken", action.payload.stsTokenManager.accessToken, {
        expires: exdate,
      });
      cookies.set("refreshToken", action.payload.stsTokenManager.refreshToken, {
        expires: exdate,
      });
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.userid = action.payload.uid;
      state.accessToken = action.payload.stsTokenManager.accessToken;
      state.refreshToken = action.payload.stsTokenManager.refreshToken;

      cookies.set("userid", action.payload.uid, {
        expires: exdate,
      });
      cookies.set("accessToken", action.payload.stsTokenManager.accessToken, {
        expires: exdate,
      });
      cookies.set("refreshToken", action.payload.stsTokenManager.refreshToken, {
        expires: exdate,
      });
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
