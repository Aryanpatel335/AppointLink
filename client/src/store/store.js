import { combineReducers, configureStore} from '@reduxjs/toolkit';
import appointmentsReducer from './appointmentsSlice';
import contactsReducer from './contactsSlice';
import authReducer from './authSlice';
export const store = configureStore({
    reducer: combineReducers({
        contacts : contactsReducer,
        appointments: appointmentsReducer,
        auth: authReducer

    })
})