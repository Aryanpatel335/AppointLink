import mongoose from "mongoose";
import ContactMessage from "../models/ContactMessage.js";

export const getContacts = async (req,res) =>{
    try{
        
        // const body = req.body;
        
        // const passedKey = Object.keys(body);
        const contactMessages = await ContactMessage.find({ creator: req.params.userId });
 
        res.status(200).json(contactMessages);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createContact = async (req,res)=>{
    const body = req.body;
    
    const newContact = new ContactMessage({...body, creator: req.userId, createdAt: new Date().toISOString()});

    try{
        await newContact.save();
        res.status(201).json(newContact);

    }catch(error){
        res.status(409).json({ message: error.message } )
        
    }

}
//request and response
export const updateContact = async (req,res) =>{
    const { id: _id } = req.params;
    const contact = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Contact with that id');
    const updatedContact = await ContactMessage.findByIdAndUpdate(_id,contact, { new: true });
    res.json(updatedContact);
}   

export const deleteContact = async (req,res)=>{
    const { id }  = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Contact with that id');
    await ContactMessage.findByIdAndRemove(id);
    res.json({message: 'Contact Deleted Successfully'});
}