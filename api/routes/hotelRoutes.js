import express from 'express';
import { countByCity, countByType, createHotel, deleteHotel, getHotelRooms, getHotels, updateHotel } from '../controllers/hotelController.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

// create hotel
router.post('/', verifyAdmin, createHotel);

// update hotel
router.put('/:id', verifyAdmin, updateHotel);

// delete hotel
router.delete('/:id', verifyAdmin, deleteHotel);

// get all hotel
router.get('/', getHotels);

// count by city hotel
router.get('/countByCity', countByCity);

// count by type hotel
router.get('/countByType', countByType);

// get hotel rooms
router.get('/room/:id', getHotelRooms);

export default router;