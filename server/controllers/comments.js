import Comment from "../models/Comment.js";
import User from "../models/User.js";

/* CREATE */
export const createComment = async (req, res) => {
  try {
    const newComment = new Comment({
      username : req.body['username'],
      venueId: req.body['venueId'],
      content: req.body['content']
    });
    await newComment.save();

    const comment = await Comment.find();
    res.status(201).json(comment);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getAllComment = async (req, res) => {
  try {
    const comment = await Comment.find();
    res.status(200).json(comment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllCommentByVenue = async (req, res) => {
  try {
    const { venueId } = req.params;
    const comment = await Comment.find({ venueId });
    res.status(200).json(comment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
