// the thunk is just a normal fuction used to handle api call etc or used to handle async operations 
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../../../../components/axiosInstance';

export const sendMessageThunk = createAsyncThunk(
    "message/send", 
    async({recieverId, message},{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/message/send/${recieverId}`, {
            message,
        });

        return response.data
    } catch (error) {   
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return  rejectWithValue(errorOutput);
    }
    
});

export const getMessageThunk = createAsyncThunk(
    "message/get", 
    async({recieverId},{rejectWithValue} )=>{
    try {
        const response = await axiosInstance.get(`/message/get-messages/${recieverId}`);
        return response.data
    } catch (error) {   
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return  rejectWithValue(errorOutput);
        }
    }
);