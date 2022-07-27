import mongoose from "mongoose";
import AppointmentMessage from "../models/AppointmentMessage.js";

export const getAppointments = async (req,res) =>{
    try{
        const appointmentMessages = await AppointmentMessage.find({ creator: req.params.userId});
        
        res.status(200).json(appointmentMessages);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}
export const createAppointment = async (req,res)=>{
    const body = req.body;
    const newAppointment = new AppointmentMessage({...body, creator: req.userId, createdAt: new Date().toISOString()});

    try{
        await newAppointment.save();
        res.status(201).json(newAppointment);

    }catch(error){
        res.status(409).json({ message: error.message } )
        
    }

}

export const updateAppointment = async(req,res) =>{
    const {id: _id} = req.params;
    const appointment = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Contact with that id');
    const updatedAppointment = await AppointmentMessage.findByIdAndUpdate(_id,appointment, { new: true });
    res.json(updatedAppointment);
}

export const deleteAppointment= async (req,res)=>{
    const {id}= req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Contact with that id');
    await AppointmentMessage.findByIdAndRemove(id);
    res.json({message: 'Appointment Deleted Successfully'});

}