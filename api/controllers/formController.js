import Form from '../models/formModel.js';
import Room from '../models/roomModel.js';

// create form
export const createForm = async (req, res, next) => {
  const newForm = new Form(req.body);

  try {
    const savedForm = await newForm.save();
    res.status(200).json(savedForm);
  } catch (error) {
    next(error);
  }
};

// update form
export const updateForm = async (req, res, next) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, { new: true });
    res.status(200).json(updatedForm);
  } catch (error) {
    next(error)
  }
};

// delete form
export const deleteForm = async (req, res, next) => {
  try {
    await Form.findByIdAndDelete(req.params.id);
    res.status(200).json('Form has been deleted!');
  } catch (err) {
    next(err);
  }
};

// get single form
export const getForm = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);
    res.status(200).json(form);
  } catch (err) {
    next(err);
  }
};

// get all forms
export const getAllForms = async (req, res, next) => {
  try {
    const allForms = await Form.find()
      .limit(req.query.limit)
      .skip(req.query.offset);
    res.status(200).json(allForms);
  } catch (err) {
    next(err);
  }
};

// get form by city
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const listHotels = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      }),
    );
    res.status(200).json(listHotels);
  } catch (err) {
    next(err);
  }
};

// get form by type
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// get hotel rooms
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    const roomList = await Promise.all(
      hotel.rooms.map((roomId) => {
        return Room.findById(roomId);
      }),
    );

    res.status(200).json(roomList);
  } catch (err) {
    next(err);
  }
};