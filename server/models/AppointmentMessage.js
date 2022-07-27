import mongoose from "mongoose";


const appointmentSchema = mongoose.Schema({
    title: String,
    contact: String,
    date: String,
    time: String,
    username: String,
    creator: String
    // createdAt:{
    //     type: Date,
    //     default: new Date()
    // }
})

const AppointmentMessage = mongoose.model('AppointmentMessage', appointmentSchema);
export default AppointmentMessage;
