import mongoose from "mongoose";
import _ from 'lodash'
import bcrypt from "bcrypt";
import { XMLParser } from 'fast-xml-parser';

const salt = await bcrypt.genSalt();
const passwordHash1 = await bcrypt.hash("admin", salt);
const passwordHash2 = await bcrypt.hash("donald", salt);

const venueIds = [
  "87410030",
  "87616551",
  "3110267",
  "76810048",
  "87110024",
  "87311966",
  "50110014",
  "36310035",
  "87810042",
  "3210299",
];

export const users = [
  {
    username: "admin",
    password: passwordHash1,
    isAdmin: true,
    __v: 0
  },
  {
    username: "donald",
    password: passwordHash2,
    isAdmin: false,
    __v: 0
  },
];


const options = {
  ignoreAttributes: false,
  attributeNamePrefix : "_"
};
const parser = new XMLParser(options);

export const getVenues = async () => {
  const response = await fetch(`https://www.lcsd.gov.hk/datagovhk/event/venues.xml`);
  const str = await response.text();
  const json = parser.parse(str);

  const rawVenues = json.venues.venue
  let venues = _.filter(rawVenues, (venue) => {
    return _.includes(venueIds, venue[`_id`])
  })

  venues = _.map(venues, (venue) => {
    const { _id, venuec, latitude, longitude} = venue
    return {
      venueId: _id,
      name: venuec,
      events: 0,
      latitude,
      longitude
    }
  })
  // console.log('selected venues>>>', venues)
  return venues
}

export const getEvents = async () => {
  const response = await fetch(`https://www.lcsd.gov.hk/datagovhk/event/events.xml`);
  const str = await response.text();
  const json = parser.parse(str);

  const rawEvents = json.events.event
  let events = _.filter(rawEvents, (event) => {
    return _.includes(venueIds, String(event.venueid))
  })

  events = _.map(events, (event) => {
    return {
      eventId: event._id,
      venueId: event.venueid,
      title: event.titlec,
      date: event.predateC,
      description: event.descc,
      presenter: event.presenterorgc,
      price: event.pricec,
    }
  })

  return events
}
