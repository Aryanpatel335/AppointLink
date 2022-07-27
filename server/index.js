import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import contactsRoutes from './routes/contacts.js';
import appointmentsRoutes from './routes/appointments.js';
import userRoutes from './routes/users.js';


const app = express();

app.use(bodyParser.json({ limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended:true}));
app.use(cors());
app.use('/contacts', contactsRoutes);
app.use('/appointments', appointmentsRoutes );
app.use('/user', userRoutes);

//This will eventually need to be hidden before deployment
dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((error)=>console.log(error.message));


//mongoose.set('useFindAndModify', false);
