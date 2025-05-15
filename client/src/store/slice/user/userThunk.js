// the thunk is just a normal fuction used to handel api call etc or used to handle async operations 
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUserThunk = createAsyncThunk("users/fetchId", async()=>{
    console.log('hello');
    
});