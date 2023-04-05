import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true, minLength: 4, maxLength: 20 },
  password: { type: String, unique: true, required: true},
  isAdmin: Boolean,
  favouriteLocation: [{ type: Schema.Types.ObjectId, ref: 'Venue'}],
});

const User = mongoose.model("User", UserSchema);
export default User;
