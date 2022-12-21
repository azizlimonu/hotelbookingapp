import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/userController.js';
const router = express.Router();
import { verifyAdmin, verifyUser, verifyToken } from '../utils/verifyToken.js';

// get account
router.get('/:id',verifyUser,getUser);

// get all user account
router.get('/',verifyAdmin,getUsers);

// update account
router.put('/:id',verifyUser,updateUser);

// delete account
router.delete('/:id',verifyUser,deleteUser);

export default router;