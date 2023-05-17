import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Button } from '@mui/material';
// components
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import Iconify from '../components/iconify';
import { useRealmApp } from 'src/components/RealmApp';
import { useEffect, useState } from 'react';
import useGapiCalendar from 'src/hooks/useGapi';

// ----------------------------------------------------------------------

export default function HomePage() {
  const realmApp = useRealmApp();
  const user = realmApp.currentUser;
  const { loadedGapi } = realmApp
  const useGapi = useGapiCalendar({calendar: "syncfusion"});

  const { gapiCalendarEvents } = useGapi;
  console.log('useGapi>>>>', useGapi)
  console.log('gapiCalendarEvents<<<<>', gapiCalendarEvents)
  // useEffect(() => {
  //   if (loadedGapi && user && user.providerType === 'oauth2-google') {
  //     getCalendar().then((events) => {
  //       setEvents(events);
  //     })
  //   }
  // }, [loadedGapi, user])

  return (
    <>
      <Helmet>
        <title> TimeSlotFinder </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Calendar
          </Typography>
          <Button variant="contained" component="label">
            Upload
            <input accept=".ics" hidden multiple type="file" id="file1" />
          </Button>
        </Stack>
        <ScheduleComponent
          selectedDate={new Date()}
          eventSettings={{ dataSource: gapiCalendarEvents }}
          currentView="Month"
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </Container>
    </>
  );
}
