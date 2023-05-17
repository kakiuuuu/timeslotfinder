import { gapi } from 'gapi-script';
import { useEffect, useState, useCallback } from 'react';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const scopes = 'https://www.googleapis.com/auth/calendar';
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

const useGapiCalendar = ({ calendar = "bigCalendar" }) => {
  const [gapiCalendarLoaded, setGapiCalendarLoaded] = useState(false);
  const [gapiCalendarEvents, setGapiCalendarEvents] = useState([]);

  useEffect(() => {
    if (!gapiCalendarLoaded) {

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        gapi.load('client:auth2', () => {
          gapi.client.init({
            clientId,
            apiKey,
            scope: scopes,
            discoveryDocs
          }).then(() => {
            gapi.client.load('calendar', 'v3', () => {
              console.log('loaded calendar')
              setGapiCalendarLoaded(true)
            });
          }, (e) => {
            console.log('gapi failed to initialize', e);
          });
        });
      };
      document.body.appendChild(script);
    }
  }, [gapiCalendarLoaded]);

  const getRawGapiCalendarEvents = useCallback(async (maxResults = 10) => {
    if (!gapiCalendarLoaded || !window?.gapi) {
      console.log('gapi not loaded yet');
      return [];
    }

    try {
      const events = await window?.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults,
        orderBy: 'startTime',
      });
      return events.result.items
    } catch (error) {
      console.error('Error loading events:', error);
      return [];
    }
  }, [gapiCalendarLoaded]);

  const hoursFromNow = (date, n) => new Date(date.getTime() + n * 1000 * 60 * 60).toISOString();

  const addGapiCalendarEvent = async (event) => {
    if (!gapiCalendarLoaded) {
      console.log('gapi not loaded yet');
      return;
    }
    const { confirmedDate, confirmedTime } = event;
    let dateParts = confirmedDate.split('-');
    let timeParts = confirmedTime.split(':');

    let month = parseInt(dateParts[0]);
    let day = parseInt(dateParts[1]);
    let year = parseInt(dateParts[2]);

    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);

    let dateString = `${month}-${day}-${year} ${hours}:${minutes}:00`;
    try {
      const calendar = window?.gapi.client.calendar;
      const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: {
          summary: event.eventName,
          start: {
            dateTime: hoursFromNow(new Date(dateString), 0),
            timeZone: "Asia/Hong_Kong"
          },
          end: {
            dateTime: hoursFromNow(new Date(dateString), 1),
            timeZone: "Asia/Hong_Kong"
          },
        },
      });
      console.log('Event added:', response.result);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  useEffect(() => {
    if (!gapiCalendarLoaded) {
      return;
    }
    let events = getRawGapiCalendarEvents();
    Promise.resolve(events).then((events) => {
      console.log('events>>>>>>>>>>>', events)
      if (calendar !== "bigCalendar")
        return setGapiCalendarEvents(events.map((event) => ({
          id: event.id,
          Subject: event.summary,
          StartTime: event.start.dateTime || event.start.date,
          EndTime: event.end.dateTime || event.end.date,
        })))
      else
        return setGapiCalendarEvents(events.map((event) => ({
          id: event.id,
          title: event.summary,
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
        })))
    })
  }, [calendar, gapiCalendarLoaded, getRawGapiCalendarEvents]);

  return {
    gapi: gapi,
    gapiCalendarLoaded,
    gapiCalendarEvents,
    getRawGapiCalendarEvents,
    addGapiCalendarEvent,
  }
};

export default useGapiCalendar;