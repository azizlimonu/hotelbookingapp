import Room from '../models/roomModel.js';
import Hotel from '../models/hotelModel.js';
import { createError } from '../utils/error.js';

// create Room
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      }, { new: true });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// update Room
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// delete Room
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

// room available
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      { $push: { 'roomNumbers.$.unavailableDates': req.body.dates } },
    );
    res.status(200).json('Room status has been Updated');
  } catch (err) {
    next(err);
  }
};

// Get Room
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// Get All Rooms
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

// get multiple rooms
export const getMultipleRooms = async (req, res, next) => {
  const idRooms = req.params.ids.split(',');

  try {
    const roomList = await Promise.all(
      idRooms.map((roomId) => {
        return Room.find({ 'roomNumbers._id': roomId })
      })
    );
    const formattedRoomList = roomList.map((room) => {
      return room[0];
    });
    const uniqueRoomIdList = Array.from(
      new Set(formattedRoomList.map((item) => item.id)),
    );

    const uniqueRoomList = await Promise.all(
      uniqueRoomIdList.map((roomId) => {
        return Room.findById(roomId);
      }),
    );

    res.status(200).json(uniqueRoomList);
  } catch (err) {
    next(err);
  }
};