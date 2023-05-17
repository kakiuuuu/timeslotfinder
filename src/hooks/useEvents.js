import React from "react";
import { useWatch } from "./useWatch";
import { useCollection } from "./useCollection";
import { useRealmApp } from "../components/RealmApp";
import {
  addValueAtIndex,
  replaceValueAtIndex,
  updateValueAtIndex,
  removeValueAtIndex,
  getEventIndex,
} from "../utils";
import useGapiCalendar from "./useGapi";

const dataSourceName = process.env.REACT_APP_REALM_DATA_SOURCE_NAME

export function useEvents(eventId) {
  // Set up a list of events in state
  const realmApp = useRealmApp();
  const useGapi = useGapiCalendar({});
  const { addGapiCalendarEvent } = useGapi;
  const [event, setEvent] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Get a client object for the event Event collection
  const EventCollection = useCollection({
    cluster: dataSourceName,
    db: "TimeSlotFinder",
    collection: "Event",
  });

  // Fetch all events on load and whenever our collection changes (e.g. if the current user changes)
  React.useEffect(() => {
    let shouldUpdate = true;
    const fetchEvents = EventCollection.find({})
    if (shouldUpdate) {
      fetchEvents.then((fetchedEvents) => {
        setEvents(fetchedEvents);
        if (eventId) {
          setEvent(fetchedEvents.find((event) => event._id.toString() === eventId));
        }
        setLoading(false);
      });
    }
    return () => {
      shouldUpdate = false;
    }
  }, [EventCollection, eventId]);

  // Use a MongoDB change stream to reactively update state when operations succeed
  useWatch(EventCollection, {
    onInsert: (change) => {
      setEvents((oldEvents) => {
        if (loading) {
          return oldEvents;
        }
        const idx =
          getEventIndex(oldEvents, change.fullDocument) ?? oldEvents.length;
        if (idx === oldEvents.length) {
          return addValueAtIndex(oldEvents, idx, change.fullDocument);
        } else {
          return oldEvents;
        }
      });
    },
    onUpdate: (change) => {
      setEvents((oldEvents) => {
        if (loading) {
          return oldEvents;
        }
        const idx = getEventIndex(oldEvents, change.fullDocument);
        return updateValueAtIndex(oldEvents, idx, () => {
          return change.fullDocument;
        });
      });
    },
    onReplace: (change) => {
      setEvents((oldEvents) => {
        if (loading) {
          return oldEvents;
        }
        const idx = getEventIndex(oldEvents, change.fullDocument);
        return replaceValueAtIndex(oldEvents, idx, change.fullDocument);
      });
    },
    onDelete: (change) => {
      setEvents((oldEvents) => {
        if (loading) {
          return oldEvents;
        }
        const idx = getEventIndex(oldEvents, { _id: change.documentKey._id });
        if (idx >= 0) {
          return removeValueAtIndex(oldEvents, idx);
        } else {
          return oldEvents;
        }
      });
    },
  });

  // Given a draft event, format it and then insert it
  const saveEvent = async (event) => {
    if (event) {
      event.owner_id = realmApp.currentUser.id;
      event.participants = [realmApp.currentUser.id];
      event.response = 0;
      event.status = "Arranging";
      try {
        return await EventCollection.insertOne(event);
      } catch (err) {
        if (err.error.match(/^Duplicate key error/)) {
          console.warn(
            `The following error means that we tried to insert a event multiple times (i.e. an existing event has the same _id). In this app we just catch the error and move on. In your app, you might want to debounce the save input or implement an additional loading state to avoid sending the request in the first place.`
          );
        }
        console.error(err);
      }
    }
  };

  // Toggle whether or not a given event is complete

  const updateEvent = async (event) => {
    await EventCollection.updateOne(
      { _id: event._id },
      { $set: { slots: event.slots, participants: event.participants, response: event.response+1 || 1  } }
    );
  };

  const comfirmEvent = async (event) => {
    await EventCollection.updateOne(
      { _id: event._id },
      { $set: { status: "Confirmed", confirmedDate: event.confirmedDate, confirmedTime: event.confirmedTime } }
    );
    const [fetchEvents] = await EventCollection.find({ _id: event._id })
    console.log('fetchEvents>>>>', fetchEvents)
    await addGapiCalendarEvent(fetchEvents)
  };

  // Delete a given event
  const deleteEvent = async (event) => {
    await EventCollection.deleteOne({ _id: event._id });
  };

  return {
    loading,
    event,
    events,
    setEvent,
    saveEvent,
    updateEvent,
    comfirmEvent,
    deleteEvent,
  };
}
