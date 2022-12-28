import express from 'express';
const router = express.Router();
import {
  createForm,
  deleteForm,
  getForm,
  getAllForms,
  updateForm,
} from '../controllers/formController.js';
import { verifyAdmin, verifyToken } from '../utils/verifyToken.js';

// create form
router.post('/', verifyToken, createForm);

// update form
router.put('/:id', verifyToken, updateForm);

// delete form
router.delete('/:id', verifyToken, deleteForm);

// get forms
router.get('/:id', verifyToken, getForm);

// get all forms
router.get('/', verifyToken, verifyAdmin, getAllForms);

export default router;