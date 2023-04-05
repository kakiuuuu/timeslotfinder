import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VenueSchema = new Schema({
  venueId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: {type: Number, required: true },
  events: {type: Number, default: 0},
  // events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
});

const Venue = mongoose.model("Venue", VenueSchema);
export default Venue;
