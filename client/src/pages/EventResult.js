import { Box, Button, Card, Container, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useEvents } from 'src/hooks/useEvents'
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { formatData } from 'src/utils'
import { useRealmApp } from 'src/components/RealmApp'
import { Configuration, OpenAIApi } from 'openai'

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  })
)

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EventDetail = () => {
  const realmApp = useRealmApp();
  let { eventId } = useParams()
  const navigate = useNavigate();
  const { loading, event, ...eventActions } = useEvents(eventId);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [AIResponse, setAIResponse] = useState({
    serieId:'',
    data: {x: ''}
  })
  console.log('AIResponse>>>>', AIResponse)
  const [selectedSlot, setSelectedSlot] = useState({ date: '', time: '' });
  const handleSelectSlot = (slot) => {
    console.log('slot>>>>', slot)

    if (event.owner_id === realmApp.currentUser.id) {
      let [time, date] = slot.id.split('.')
      setSelectedSlot({ date, time })
      setOpen(true)
    }
  };

  const handleConfirmEvent = async () => {
    await eventActions.comfirmEvent({ ...event, confirmedDate: selectedSlot.date, confirmedTime: selectedSlot.time })
    navigate(`/eventlist`);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!event && !loading) {
      navigate(`/404`);
    }
  }, [event, eventId, loading, navigate]);

  useEffect(() => {
    if (event) {
      let data = formatData(event?.startDate, event?.endDate, event?.noEarlierThan, event?.noLaterThan, event?.slots)
      setData(data)
      console.log('event>>>', event)
      const content = `
      You are a program that can select only one time slot for an upcoming event based on the information about an event. You do not need to explain the reason and you can only output in the following format: 
        {"serieId":"19:00","data":{"x":"1-23-2023"}}

        where the serieId is the time slot and data.x is the date
        The selected time slot must select from the attendee's reply
        Event Information:
        event duration: ${event.druation} hours
        attendee's reply: "${JSON.stringify(data)}"
        
        The value of y represents the attendees available in the date "x" in time "id"
        The selected time slot should have the highest value of y.
        Remeber you cannot explain and should only output the result in the format above.
      `
      console.log('content>>>', content)
      const response = openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content }],
      }).then(response => {
        let reply = response.data.choices[0].message.content
        console.log('reply', reply)
        setAIResponse(JSON.parse(reply))
      })

    }
  }, [event])

  return (
    <>
      <Helmet>
        <title> Event </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Event Result Page
          </Typography>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Comfirmation
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {`You have selected the time slot: ${selectedSlot.time} on ${selectedSlot.date}`}
            </Typography>
            <Stack direction="row" alignItems="center" padding={'1rem 0'} gap={1} mb={5}>
              <Button variant="contained" onClick={handleConfirmEvent}>Confirm</Button>
              <Button variant="outlined" onClick={handleClose}>Close</Button>
            </Stack>
          </Box>
        </Modal>
        {event?._id &&
          <>
            <Typography variant="subtitle1">
              {`Here is the result of your event! There is ${event?.response} response now`}
            </Typography>
            {(event.owner_id === realmApp.currentUser.id) && (
              <Typography variant="subtitle1">
                You can select the time slot that works best for you!
              </Typography>
            )
            }
            <Box sx={{ height: 700 }}>
              <ResponsiveHeatMap
                data={data}
                onClick={handleSelectSlot}
                margin={{ top: 60, right: 500, bottom: 60, left: 80 }}
                colors={{
                  type: 'quantize',
                  scheme: 'greens',
                  minValue: 0,
                  maxValue: 4,
                  step: 3
                }}
                enableLabels={false}
                emptyColor="#555555"
                theme={{
                  fontSize: 12,
                }}
                legends={[
                  {
                    anchor: 'bottom',
                    translateX: -50,
                    translateY: 30,
                    length: 200,
                    thickness: 8,
                    direction: 'row',
                    tickPosition: 'after',
                    tickSize: 3,
                    tickSpacing: 4,
                    tickOverlap: false,
                    tickFormat: 'd',
                    title: 'Value →',
                    titleAlign: 'start',
                    titleOffset: 4
                  }
                ]}
                hoverTarget="cell"
                annotations={[
                  {
                    type: 'rect',
                    match: AIResponse,
                    size: -1,
                    note: `The best time to hold this event is ${AIResponse.serieId} on ${AIResponse.data.x}`,
                    noteX: 200,
                    noteY: -130,
                    offset: 5,
                    noteTextOffset: 10,
                    borderRadius: 2
                  }
                ]}
              />

            </Box>
          </>
        }
      </Container>
    </>
  )
}

export default EventDetail