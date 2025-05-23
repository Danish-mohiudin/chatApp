// the thunk is just a normal fuction used to handle api call etc or used to handle async operations 
import { createAsyncThunk } from '@reduxjs/toolkit';
import {toast} from 'react-hot-toast';
import axiosInstance from '../../../../components/axiosInstance';

export const loginUserThunk = createAsyncThunk("users/fetchId", async({username, password},
    {rejectWithValue}
)=>{
    try {
        const response = await axiosInstance.post('/api/v1/user/login', {
            username,
            password
        });
        return response.data
    } catch (error) {   
        //const errorOutput = error
        //toast.error(errorOutput);
        //return  rejectWithValue(errorOutput);
    }
    
});