import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000'});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;

    }
    return req;
});
// const urlContacts = '/contacts';

export const fetchContacts = (userId) => API.get(`/contacts/${userId}`);
export const createContact = (newContact, userId) => API.post(`/contacts/${userId}`,newContact);
export const updateContact = (id, userId, updatedContact) => API.patch(`/contacts/${userId}/${id}`, updatedContact );
export const deleteContact = (id, userId) => API.delete(`/contacts/${userId}/${id}`);

// const urlAppointments =  '/appointments';
export const fetchAppointments = (userId) => API.get(`/appointments/${userId}`);
export const createAppointment = (newAppointment, userId) => API.post(`/appointments/${userId}`,newAppointment);
export const updateAppointment = (id, userId, updatedAppointment) => API.patch(`/appointments/${userId}/${id}`, updatedAppointment);
export const deleteAppointment = (id, userId) => API.delete(`/appointments/${userId}/${id}`);


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const getgoogID = () => API.get('/googleid/googleid');