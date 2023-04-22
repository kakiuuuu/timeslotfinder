import { Box, Button, Card, Container, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useEvents } from 'src/hooks/useEvents'
import { ResponsiveHeatMap } from '@nivo/heatmap';
import CustomView from 'src/components/Calendar/customView'

const data = [{
  id: '0:00',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 1 }]
},
{
  id: '0:15',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 1 }]
},
{
  id: '0:30',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 1 }]
},
{
  id: '0:45',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 2 }]
},
{
  id: '1:00',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 2 }]
},
{
  id: '1:15',
  data: [{ x: '4-28-2023', y: 2 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '1:30',
  data: [{ x: '4-28-2023', y: 2 }, { x: '4-29-2023', y: 1 }]
},
{
  id: '1:45',
  data: [{ x: '4-28-2023', y: 2 }, { x: '4-29-2023', y: 1 }]
},
{
  id: '2:00',
  data: [{ x: '4-28-2023', y: 3 }, { x: '4-29-2023', y: 1 }]
},
{
  id: '2:15',
  data: [{ x: '4-28-2023', y: 3 }, { x: '4-29-2023', y: 2 }]
},
{
  id: '2:30',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 2 }]
},
{
  id: '2:45',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 2 }]
},
{
  id: '3:00',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '3:15',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '3:30',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '3:45',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '4:00',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '4:15',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '4:30',
  data: [{ x: '4-28-2023', y: 3 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '4:45',
  data: [{ x: '4-28-2023', y: 3 }, { x: '4-29-2023', y: 1 }]
},
{
  id: '5:00',
  data: [{ x: '4-28-2023', y: 2 }, { x: '4-29-2023', y: 1 }]
},
{
  id: '5:15',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 1 }]
},
{
  id: '5:30',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 2 }]
},
{
  id: '5:45',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 2 }]
},
{
  id: '6:00',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '6:15',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '6:30',
  data: [{ x: '4-28-2023', y: 2 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '6:45',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '7:00',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '7:15',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '7:30',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '7:45',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '8:00',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '8:15',
  data: [{ x: '4-28-2023', y: 1 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '8:30',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '8:45',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '9:00',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '9:15',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '9:30',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 0 }]
},
{
  id: '9:45',
  data: [{ x: '4-28-2023', y: 0 }, { x: '4-29-2023', y: 0 }]
}]

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
  let { eventId } = useParams()
  const navigate = useNavigate();
  const { loading, event, ...eventActions } = useEvents(eventId);
  useEffect(() => {
    if (!event && !loading) {
      navigate(`/404`);
    }
  }, [event, eventId, loading, navigate]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              You have selected the time slot: 4: 30 on 4/28/2023
            </Typography>
            <Stack direction="row" alignItems="center" padding={'1rem 0'} gap={1} mb={5}>
              <Button variant="contained" onClick={handleClose}>Confirm</Button>
              <Button variant="outlined" onClick={handleClose}>Close</Button>
            </Stack>
          </Box>
        </Modal>
        {event?._id &&
          <>
            <Typography variant="subtitle1">
              Here is the result of your event!
            </Typography>
            <Box sx={{ height: 700 }}>
              <ResponsiveHeatMap
                data={data}
                onClick={handleOpen}
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
                    match: {
                      // formattedValue: '3',
                      // x: 2,
                      // serieId: '4-29-2023',
                      // value: 0,
                      // data: '4:30',
                      id: '4:30.4-28-2023',
                      height: 14.5,
                      // y: 3,

                    },
                    note: 'The best time to hold this event is 4:30 on 4-28-2023',
                    noteX: 300,
                    noteY: -130,
                    offset: 5,
                    noteTextOffset: 5,
                    borderRadius: 2
                  }
                ]}
              />

            </Box>

            {/* <Card>
              <CustomView event={event} action={eventActions} />
            </Card> */}
          </>
        }
      </Container>
    </>
  )
}

export default EventDetail