import { Button, Card, Container, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useEvents } from 'src/hooks/useEvents'
import CustomView from 'src/components/Calendar/customView'

const EventDetail = () => {
  let { eventId } = useParams()
  const navigate = useNavigate();
  const { loading, event, ...eventActions } = useEvents(eventId);
  useEffect(() => {
    if (!event && !loading) {
      navigate(`/404`);
    }
  }, [event, eventId, loading, navigate]);


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
        {event?._id &&
          <>
            <Typography variant="subtitle1">
              Here is the result of your event!
            </Typography>
            <Card>
              <CustomView event={event} action={eventActions} />
            </Card>
          </>
        }
      </Container>
    </>
  )
}

export default EventDetail