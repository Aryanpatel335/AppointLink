import mongoose from "mongoose";


const contactSchema = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    username: String,
    creator: String
    // createdAt:{
    //     type: Date,
    //     default: new Date()
    // }
})

const ContactMessage = mongoose.model('ContactMessage', contactSchema);
export default ContactMessage;
