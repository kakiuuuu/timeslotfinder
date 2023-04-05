import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import _ from 'lodash'

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import venueRoutes from "./routes/venues.js"
import eventRoutes from "./routes/events.js"
import commentRoutes from "./routes/comments.js"

// import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

import User from "./models/User.js";
import Event from "./models/Event.js";
import Venue from "./models/Venue.js";
import { users, getEvents, getVenues } from "./data/index.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/venues', venueRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/comments', commentRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb+srv://stu040:p618385W@cluster0.wenbhsm.mongodb.net/stu040', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`>>>>Server start in Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    let venues = await getVenues()
    let events = await getEvents()
    _.forEach(users, async (user) => {
      await User.updateOne({username: user.username}, user, {upsert:true})
    })
    await Promise.all(
      _.forEach(venues, async (venue) => {
        await Venue.updateOne({venueId: venue.venueId}, venue, {upsert:true})
      })
    );
    await Promise.all(
      _.forEach(events, async (event) => {
        await Event.updateOne({eventId: event.eventId}, event, {upsert:true})
        await Venue.updateOne({venueId: event.venueId}, {"$inc" : {"events" : 1}})
      })
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
