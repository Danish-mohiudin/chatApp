import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, registerUserThunk , logoutUserThunk, getUserProfileThunk} from "./userThunk";

const initialState = {
    isAuthenticated:false,
    screenLoading: true,
    userProfile: null,
    buttonLoading: false,
}

export const userSlice = createSlice({
    name: 'user',

    initialState,

    reducers: {
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
            state.isAuthenticated = false;
            state.buttonLoading = false;
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
        });
        builder.addCase(getUserProfileThunk.rejected, (state, action)=>{
            state.screenLoading = false
        });
    }
})

export const {} = userSlice.actions

export default userSlice.reducer // exports comleate 
// slice which will be used in store 