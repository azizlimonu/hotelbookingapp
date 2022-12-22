import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from '../controllers/userController.js';
const router = express.Router();
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

router.get("/checkauthentication", verifyToken, (req,res,next)=>{
  res.send("hello user, you are logged in")
})

router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
  res.send("hello user, you are logged in and you can delete your account")
})

router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
  res.send("hello admin, you are logged in and you can delete all accounts")
})

// get account
router.get('/:id', verifyUser, getUser);

// get all user account
router.get('/', verifyAdmin, getUsers);

// update account
router.put('/:id', verifyUser, updateUser);

// delete account
router.delete('/:id', verifyUser, deleteUser);

export default router;