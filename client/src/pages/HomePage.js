import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Button } from '@mui/material';
// components
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------
const data = [
  {
    Id: 1,
    Subject: 'Meeting',
    StartTime: new Date(2023, 3, 22, 3, 0),
    EndTime: new Date(2023, 3, 22, 5, 30),
  },
  {
    Id: 2,
    Subject: 'Test1',
    StartTime: new Date(2023, 3, 20, 3, 0),
    EndTime: new Date(2023, 3, 20, 5, 30),
  },
  {
    Id: 3,
    Subject: 'Test2',
    StartTime: new Date(2023, 3, 18, 4, 0),
    EndTime: new Date(2023, 3, 18, 7, 30),
  },
  {
    Id: 4,
    Subject: 'Meeting2',
    StartTime: new Date(2023, 3, 16, 0, 0),
    EndTime: new Date(2023, 3, 16, 1, 30),
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
