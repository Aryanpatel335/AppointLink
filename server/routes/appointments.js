import express from "express";
import { createAppointment, deleteAppointment, getAppointments, updateAppointment } from "../controllers/appointments.js";
//import { getContacts, createContact} from "../controllers/contacts.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get('/:userId', auth, getAppointments);
router.post('/:userId', auth, createAppointment);
router.patch('/:userId/:id', auth, updateAppointment);
router.delete('/:userId/:id', auth, deleteAppointment);
export default router;
