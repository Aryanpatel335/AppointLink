import { createSlice } from '@reduxjs/toolkit';
import * as api from '../api';
const contactsSlice = createSlice({
    name: 'contacts',
    initialState:{
        contacts:[],
        currentId: null

    },
    reducers:{
        addContact(state,action){
            //payload is an object with the name, phone, email that is entered
            state.contacts.push(action.payload)
        },
        fetchAll(state,action){
            state.contacts = action.payload;
        },
        updateContactType(state,action){
            state.contacts[action.payload.index] = action.payload.data;
        },
        setCurrentId(state,action){
            state.currentId = action.payload;
        },
        deleteContactType(state,action){
            //do not do just state.contacts.filter((contact)=> contact._id !== action.payload);
            //that would be mutating the state, you need to set the state to the filtered array that comes out
            state.contacts = state.contacts.filter((contact)=> contact._id !== action.payload);

        },
        clearContacts(state){
            state.contacts = [];
        }



    }
})

export default contactsSlice.reducer;

export const { clearContacts,addContact, fetchAll, updateContactType,setCurrentId, deleteContactType }  = contactsSlice.actions;

export const contactsStateSelector = (state) => state.contacts.contacts;
export const currentIdSelector = (state) => state.contacts.currentId;

export const getContacts = (userId) => async (dispatch) =>{
    try{
        const { data } = await api.fetchContacts(userId);
        
        dispatch(fetchAll(data));
    }catch(error){
        console.log(error);
    }
}

export const createContact = (contact,userId) => async (dispatch)=>{
    try{
        const { data } = await api.createContact(contact,userId);
        dispatch(addContact(data));
    }catch(error){
        console.log(error);
    }
}

export const updateContact = (id,userId, contact,index) => async (dispatch) => {
    try{
       const { data } =  await api.updateContact(id,userId,contact);
       dispatch(updateContactType({ data , index}));
       dispatch(setCurrentId(null));
    }catch(error){
        console.log(error);
    }
}


export const deleteContact = ( id, userId) => async (dispatch) =>{
    try{
        await api.deleteContact(id,userId);
        
        dispatch(deleteContactType(id));

    }catch(error){
        console.log(error);
    }
}