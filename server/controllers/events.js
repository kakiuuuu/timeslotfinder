import Event from "../models/Event.js";
import User from "../models/User.js";

/* CREATE */
export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event({
      eventId: req.body['eventId'],
      title: req.body['title'],
      date: req.body['date'],
      description: req.body['description'],
      presenter: req.body['presenter'],
      price: req.body['price'],
    });
    await newEvent.save();

    const event = await Event.find();
    res.status(201).json(event);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getAllEvent = async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllEventByVenue = async (req, res) => {
  try {
    const { venueId } = req.params;
    const event = await Event.find({ venueId });
    res.status(200).json(event);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const patchEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    console.log('patch method req.body>>>>', req.body)
    const updatedEvent = await Event.updateOne(
      { eventId },
      { $set: {
        title: req.body['title'],
        date: req.body['date'],
        description: req.body['description'],
        presenter: req.body['presenter'],
        price: req.body['price'],
      }},
    )

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const removedEvent = await Event.deleteOne({ eventId })
    if(!removedEvent.deletedCount) {
      throw new Error('No matched event found')
    }
    res.status(204)
    .send()
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
