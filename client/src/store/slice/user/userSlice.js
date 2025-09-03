import { createSlice } from "@reduxjs/toolkit";
import { 
  loginUserThunk, 
  registerUserThunk, 
  logoutUserThunk, 
  getUserProfileThunk, 
  getOtherUsersThunk, 
  deleteAccountThunk 
} from "./userThunk";

const initialState = {
  isAuthenticated: false,
  screenLoading: true,
  userProfile: null,
  otherUsers: null,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
  buttonLoading: false,
  error: null,
  successMessage: null,
  loading: false, // general loading state
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    },
    clearUserState: (state) => {
      state.userProfile = null;
      state.otherUsers = null;
      state.selectedUser = null;
      state.isAuthenticated = false;
      state.error = null;
      state.successMessage = null;
      localStorage.clear();
    },
    logout: (state) => {
      // general logout reducer to use anywhere
      state.userProfile = null;
      state.selectedUser = null;
      state.otherUsers = null;
      state.isAuthenticated = false;
      state.buttonLoading = false;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(loginUserThunk.pending, (state) => { state.buttonLoading = true; });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(loginUserThunk.rejected, (state) => { state.buttonLoading = false; });

    // register user
    builder.addCase(registerUserThunk.pending, (state) => { state.buttonLoading = true; });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(registerUserThunk.rejected, (state) => { state.buttonLoading = false; });

    // logout user
    builder.addCase(logoutUserThunk.pending, (state) => {});
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.userProfile = null;
      state.selectedUser = null;
      state.otherUsers = null;
      state.isAuthenticated = false;
      state.buttonLoading = false;
      localStorage.clear();
    });
    builder.addCase(logoutUserThunk.rejected, (state) => { state.buttonLoading = false; });

    // get user profile
    builder.addCase(getUserProfileThunk.pending, (state) => { state.screenLoading = true; });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData;
      state.isAuthenticated = true;
      state.screenLoading = false;
    });
    builder.addCase(getUserProfileThunk.rejected, (state) => { state.screenLoading = false; });

    // get other users
    builder.addCase(getOtherUsersThunk.pending, (state) => { state.screenLoading = true; });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.otherUsers = action.payload.responseData;
      state.screenLoading = false;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state) => { state.screenLoading = false; });

    // delete account
    builder.addCase(deleteAccountThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteAccountThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.userProfile = null; // clear user
      state.otherUsers = null;
      state.selectedUser = null;
      state.isAuthenticated = false;
      state.successMessage = action.payload.message;
      localStorage.clear();
    });
    builder.addCase(deleteAccountThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export const { setSelectedUser, clearUserState, logout } = userSlice.actions;
export default userSlice.reducer;