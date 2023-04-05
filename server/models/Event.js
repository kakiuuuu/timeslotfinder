import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventId: { type: String, required: true, unique: true },
  venueId: { type: Number, required: true},
  title:{type: String, required: true },
  date:{type: String },
  description:{type: String},
  presenter:{type: String },
  price:{type: String},
});

const Event = mongoose.model('Events', EventSchema)
export default Event;