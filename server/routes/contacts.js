import express from "express";
import { getContacts, createContact, updateContact, deleteContact} from "../controllers/contacts.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get('/:userId',auth, getContacts);
router.post('/:userId', auth, createContact);
router.patch('/:userId/:id', auth, updateContact);
router.delete('/:userId/:id', auth, deleteContact);
export default router;
