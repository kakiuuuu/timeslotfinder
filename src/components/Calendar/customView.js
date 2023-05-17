import { dateFnsLocalizer } from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { useCallback, useMemo, useReducer, useState } from 'react'
import { StyledCalendar } from './styles';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRealmApp } from '../RealmApp'
import useGapiCalendar from 'src/hooks/useGapi'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

function MyWeek({
  date,
  localizer,
  max,
  min,
  scrollToTime = localizer.startOf(new Date(), 'day'),
  ...props
}) {
  const currRange = useMemo(
    () => MyWeek.range(date, max, { localizer }),
    [date, localizer, max]
  )

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  )
}


MyWeek.range = (date, max, { localizer }) => {
  const start = date
  const end = max

  let current = start
  const range = []

  while (localizer.lte(current, end, 'day')) {
    range.push(current)
    current = localizer.add(current, 1, 'day')
  }
  return range
}

MyWeek.navigate = (date, action) => { }

MyWeek.title = (date) => { }

const CustomView = ({ event, eventActions }) => {
  const [timeSlots, setTimeSlots] = useState(JSON.parse(event.slots).reduce((map, [key, value]) => {
    map.set(key, value);
    return map;
  }, new Map()))
  const navigate = useNavigate();
  const realmApp = useRealmApp();
  const { currentUser } = realmApp;
  const { gapiCalendarLoaded, gapiCalendarEvents } = useGapiCalendar({ calendar: "bigCalendar" });

  console.log('gapiCalendarLoaded>>>', gapiCalendarLoaded)
  console.log('gapiCalendarEvents>>>>', gapiCalendarEvents)
  const [selectedSlots, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_SELECTED_SLOTS':
        let set1 = new Set(state.map(date => date.getTime()));
        let set2 = new Set(action.payload.map(date => date.getTime()));
        let unionArr = Array.from(new Set([...set1, ...set2]));
        let newArr = unionArr.filter(timestamp => !set1.has(timestamp) || !set2.has(timestamp));
        // action.payload.forEach((slot) => {
        //   let date = new Date(slot).toISOString()
        //   if (timeSlots.has(date)) {
        //     timeSlots.get(date).value += 1
        //   }
        // })
        return newArr.map(timestamp => new Date(timestamp));;
      default:
        return state;
    }
  }, []);
  // console.log('event>>>>>', event)
  // console.log('timeSlots<<<<', timeSlots)
  // console.log('selectedSlots>>>>>', selectedSlots)

  const handleSelectSlot = useCallback(
    (slotInfo) => {
      let { slots } = slotInfo
      slots.pop()
      console.log('slots>>>', slots)
      dispatch({ type: 'SET_SELECTED_SLOTS', payload: slots });
    },
    []
  )

  const { defaultDate, views, min, max } = useMemo(() => {
    let min = new Date(event.startDate)
    let max = new Date(event.endDate)
    max.setHours(event.noLaterThan, 0, 0, 0)
    min.setHours(event.noEarlierThan, 0, 0, 0)
    return {
      defaultDate: event.startDate,
      views: {
        week: MyWeek,
      },
      min,
      max,
    }
  }, [])

  const slotPropGetter = useCallback(
    (date) => {
      const isSelected = selectedSlots.some(slot => +slot === +date);
      return {
        className: isSelected ? 'selected-slot' : '',
        // style: {
        //   width: '6=0%',
        // },
        'data-count': 0,
      }
    }, [selectedSlots])


  return (
    <>
      <div>
        <StyledCalendar
          backgroundEvents={gapiCalendarEvents}
          toolbar={false}
          selectable
          timeslots={4}
          step={15}
          defaultView={"week"}
          localizer={localizer}
          getDrilldownView={() => (null)}
          // components={components}
          defaultDate={defaultDate}
          // date={defaultDate}
          min={min}
          max={max}
          onSelectSlot={handleSelectSlot}
          style={{ height: 600, padding: '2rem' }}
          views={views}
          slotPropGetter={slotPropGetter} />
      </div>
      <Button variant="contained" sx={{ m: '1rem' }} onClick={async () => {
        let _timeSlots = timeSlots
        selectedSlots.forEach((slot) => {
          let date = new Date(slot).toISOString()
          // console.log('new Date(slot).toISOString()>>>>>', date)
          if (_timeSlots.has(date)) {
            _timeSlots.get(date).value += 1
          }
        })
        let slots = JSON.stringify([..._timeSlots])
        // console.log('slots>>>>>>', { ...event, slots })
        await eventActions.updateEvent({ ...event, slots, participants: [...event.participants, currentUser.id] })
        navigate(`/event/${event._id}/result`)
      }}>
        Submit
      </Button>
    </>
  )

}

export default CustomView