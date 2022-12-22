import express from 'express';
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability
} from '../controllers/roomController.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

// create Room
router.post('/:hotelid', verifyAdmin, createRoom)

// update room status
router.post('/:id', verifyAdmin, updateRoom);

// update Room availability
router.post('/availability/:id', updateRoomAvailability)

// delete Room
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);

// get Room by id
router.get('/:id', getRoom)

// get Room
router.get('/', getRooms)

export default router;
