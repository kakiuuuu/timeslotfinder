import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------
const data = [
  {
    Id: 1,
    Subject: 'Meeting',
    StartTime: new Date(2023, 1, 15, 10, 0),
    EndTime: new Date(2023, 1, 15, 12, 30),
  },
];

export default function HomePage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> TimeSlotFinder </title>
      </Helmet>

      <Container maxWidth="xl">
        <ScheduleComponent
          selectedDate={new Date(2023, 1, 15)}
          eventSettings={{
            dataSource: data,
          }}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </Container>
    </>
  );
}
