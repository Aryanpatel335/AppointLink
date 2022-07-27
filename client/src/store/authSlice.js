import { createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        currentUserId: '',
        errorMessage: ''
    },
    reducers:{
        setAuthData(state,action){
            
            localStorage.setItem('profile',JSON.stringify(action.payload))
           
            
        },
        logOut(state){
            
            
            state.currentUserId = '';
            localStorage.clear();
            

        },
        setOurOwnAuthData(state,action){
            
            localStorage.setItem('profile', JSON.stringify(action.payload))
           
        },
        setCurrentUserId(state,action){
            state.currentUserId = action.payload;
        },
        setErrorMessage(state,action){
            state.errorMessage =action.payload;
        }

    }
})

export default authSlice.reducer;

export const { setAuthData, logOut, setOurOwnAuthData, setCurrentUserId, setErrorMessage } = authSlice.actions;

export const errorSelector = (state) => state.auth.errorMessage;
export const currentId = (state) => state.auth.currentUserId;
export const googleSignIn = (formData,navigate) => async(dispatch) =>{
    try{
        const userId = formData.data.sub;
        const username = formData.data.name;
        dispatch(setAuthData({...formData, userId, username}));
        //dispatch(setCurrentUserId(formData.data.sub));
        navigate('/contacts');
    }catch(error){
        
        console.log(error);
    }
}
export const signIn = (formData, navigate) => async (dispatch)=>{
    try{
        
        const { data }= await api.signIn(formData);
        const userId = data.result._id;
        const username = data.result.name;
        dispatch(setOurOwnAuthData({...data, userId, username} ));
        //dispatch(setCurrentUserId(data.result._id));
        navigate('/contacts');
        
    }catch(error){
        //change state and error here
        //error is in the following format:
        dispatch(setErrorMessage(error.response.data.message));
        //console.log(error.response.data.message);
    }


}
export const signUp= (formData, navigate) =>async (dispatch) =>{
    try{
        const { data } = await api.signUp(formData);
        
        const userId = data.result._id;
        const username  = data.result.name;
        dispatch(setOurOwnAuthData({...data, userId,username} ));
        //dispatch(setCurrentUserId(data.result._id));
        navigate('/contacts');
        
    } catch(error){
        dispatch(setErrorMessage(error.response.data.message));
        //console.log(error);
    }
}
