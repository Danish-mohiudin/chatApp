import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./userThunk";

const initialState = {
    isAuthenticated:false,
    screenLoading: false,
}

export const userSlice = createSlice({
    name: 'user',

    initialState,

    reducers: {
    },
    extraReducers:(builder) =>{
        builder.addCase(loginUserThunk.pending, (state, action)=>{
            console.log("pending");
        });
        builder.addCase(loginUserThunk.fulfilled, (state, action)=>{
            console.log("fullfilled");
        });
        builder.addCase(loginUserThunk.rejected, (state, action)=>{
            console.log("rejected");
        });
    }
})

export const {} = userSlice.actions

export default userSlice.reducer // exports comleate 
// slice which will be used in store 