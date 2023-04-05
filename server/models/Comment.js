import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username : { type: String, required: true },
  venueId: { type: Number, required: true },
  content: { type: String, required: true }
});

const Comment = mongoose.model('Comment', CommentSchema)
export default Comment;
