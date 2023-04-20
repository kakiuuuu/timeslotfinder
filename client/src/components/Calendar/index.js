import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { useCallback, useState } from 'react'

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

const events = [
  {
    title: 'My Event',
    start: new Date('2015-04-12T13:45:00-05:00'),
    end: new Date('2015-04-12T14:00:00-05:00')
  }
]

const BigCalendar = (props) => {
  const [myEvents, setEvents] = useState(events)

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setEvents]
  )

  return (
    <div>
      <Calendar
        selectable
        timeslots={4}
        step={15}
        defaultView={"week"}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="asd"
        style={{ height: 500 }}
      />
    </div>
  )

}

export default BigCalendar