import { createSlice } from '@reduxjs/toolkit';
import * as api from '../api';
const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState:{
        appointments:[],
        currentIdAppointments: null

    },
    reducers:{
        addAppointment(state,action){
            //payload is an object with the title, contact (chosen by user), date, time
            state.appointments.push(action.payload);
        },
        fetchAllAppointments(state,action){
            state.appointments = action.payload;
        },
        updateAppointmentType(state,action){
            state.appointments[action.payload.index] = action.payload.data;
        },
        setCurrentAppointmentId(state,action){
            state.currentIdAppointments = action.payload;
        },
        deleteAppointmentType(state,action){
            state.appointments = state.appointments.filter((appointment) => appointment._id !== action.payload);
        },
        clearAppointments(state){
            state.appointments = [];
        }
    }
})

export default appointmentsSlice.reducer;

export const { clearAppointments ,addAppointment, fetchAllAppointments, updateAppointmentType, setCurrentAppointmentId, deleteAppointmentType }  = appointmentsSlice.actions;
export const appointmentsStateSelector = (state) => state.appointments.appointments;
export const currentAppointmentIdSelector = (state) => state.appointments.currentIdAppointments;

export const getAppointments = (userId) => async (dispatch) =>{
    try{
        const { data } = await api.fetchAppointments(userId);
        dispatch(fetchAllAppointments(data));
    }catch(error){
        console.log(error);
    }
}

export const createAppointment = (appointment, userId) => async (dispatch) =>{
    try{
        const { data }  = await api.createAppointment(appointment, userId);
        dispatch(addAppointment(data));
    }catch(error){
        console.log(error);
    }
}

export const updateAppointment = (id, userId,appointment, index) => async (dispatch) =>{
    try{
        
        const { data } = await api.updateAppointment(id,userId,appointment);
        dispatch(updateAppointmentType({ data, index }));
        dispatch(setCurrentAppointmentId(null));

    }catch(error){
        console.log(error);
    }
}

export const deleteAppointment = (id, userId) => async (dispatch) =>{
    try{
        await api.deleteAppointment(id, userId);
        dispatch(deleteAppointmentType(id));
    }catch(error){
        console.log(error);
    }

}