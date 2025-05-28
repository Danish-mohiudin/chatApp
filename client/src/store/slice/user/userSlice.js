import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, registerUserThunk , logoutUserThunk, getUserProfileThunk, getOtherUsersThunk} from "./userThunk";

const initialState = {
    isAuthenticated:false,
    screenLoading: true,
    userProfile: null,
    otherUsers: null,
    setSelectedUser: JSON.parse(localStorage.getItem("selectedUser")),
    buttonLoading: false,
    selectedUser: null,
}

export const userSlice = createSlice({
    name: 'user',

    initialState,

    reducers: {
        setSelectedUser: (state, action) => {
            localStorage.setItem("selectedUser", JSON.stringify(action.payload))
            state.selectedUser = action.payload;
        }
    },
    extraReducers:(builder) =>{
        // login user
        builder.addCase(loginUserThunk.pending, (state, action)=>{
            state.buttonLoading = true
        });
        builder.addCase(loginUserThunk.fulfilled, (state, action)=>{
            state.userProfile = action.payload?.responseData?.user;
            state.isAuthenticated = true;
            state.buttonLoading = false
        });
        builder.addCase(loginUserThunk.rejected, (state, action)=>{
            state.buttonLoading = false
        });
        // register user 
        builder.addCase(registerUserThunk.pending, (state, action)=>{
            state.buttonLoading = true
        });
        builder.addCase(registerUserThunk.fulfilled, (state, action)=>{
            state.userProfile = action.payload?.responseData?.user;
            state.isAuthenticated = true;
            state.buttonLoading = false
        });
        builder.addCase(registerUserThunk.rejected, (state, action)=>{
            state.buttonLoading = false
        });
        // logout user 
        builder.addCase(logoutUserThunk.pending, (state, action)=>{
        });
        builder.addCase(logoutUserThunk.fulfilled, (state, action)=>{
            state.userProfile = null;
            state.selectedUser = null;
            state.otherUsers = null;
            state.isAuthenticated = false;
            state.buttonLoading = false;
            localStorage.clear();
        });
        builder.addCase(logoutUserThunk.rejected, (state, action)=>{
            state.buttonLoading = false
        });

        // get user  profile
        builder.addCase(getUserProfileThunk.pending, (state, action)=>{
            state.screenLoading = true
        });
        builder.addCase(getUserProfileThunk.fulfilled, (state, action)=>{
            state.isAuthenticated = true;
            state.screenLoading = false;
            state.userProfile = action.payload?.responseData
        });
        builder.addCase(getUserProfileThunk.rejected, (state, action)=>{
            state.screenLoading = false
        });
        // get other users 
        builder.addCase(getOtherUsersThunk.pending, (state, action)=>{
            state.screenLoading = true
        });
        builder.addCase(getOtherUsersThunk.fulfilled, (state, action)=>{
            state.screenLoading = false;
            state.otherUsers = action.payload.responseData;
        });
        builder.addCase(getOtherUsersThunk.rejected, (state, action)=>{
            state.screenLoading = false
        });
    }
})

export const { setSelectedUser } = userSlice.actions

export default userSlice.reducer // exports comleate 
// slice which will be used in store 