import User from "../models/User.js";
import Venue from "../models/Venue.js";
import bcrypt from "bcrypt";
import _ from 'lodash'

/* READ */
export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.find({username});
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const patchUser = async (req, res) => {
  try {
    const { username } = req.params;
    console.log('patch user req.body>>>>', req.body)
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body['password'], salt);
    const updatedUser = await User.updateOne(
      { username },
      { $set: {
        username: req.body['username'],
        password: passwordHash,
      }},
    )

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const patchUserLike = async (req, res) => {
  try {
    const { username, isLiked, _id } = req.body
    const [ user ] = await User.find({username});
    let { favouriteLocation } = user

    if ( isLiked ) 
       _.remove(favouriteLocation, (LocationId, index) => {
        return  LocationId.equals(_id)
      })
    else 
      favouriteLocation.push(_id)
    favouriteLocation = _.compact(favouriteLocation)
    console.log('favouriteLocation>?>>>>>>', favouriteLocation)
    const update = await User.updateOne(
      { username },
      { favouriteLocation },
    )
    let [ updatedUser ] = await User.find({username});
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const removedUser = await User.deleteOne({ username })
    if(!removedUser.deletedCount) {
      throw new Error('No matched user found')
    }
    res.status(204)
    .send()
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
