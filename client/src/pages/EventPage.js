import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EventPage.css';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import Iconify from '../components/iconify';
// sections


// ----------------------------------------------------------------------
const data = [
  {
    Id: 1,
    Subject: 'Meeting',
    StartTime: new Date(2023, 1, 15, 10, 0),
    EndTime: new Date(2023, 1, 15, 12, 30),
  },
];

export default function EventPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> TimeSlotFinder </title>
      </Helmet>

      <Container maxWidth="xl">
      <h2 className = "header">Create New Event Page</h2>
    <form action="SaveNewEvent.php" method="POST" onSubmit="return PreSubmitCheck();">
    <table className="t1" style={{align:'center', width:'100%'}}><tr><td style= {{align: 'center', columnSpan:'2'}}>
<div className = "wrapper">
    <div id="NewEventNameDiv" >New Event Name:&nbsp;
<input type="text" style= {{textAlign: 'left'}} id="NewEventName" name="NewEventName" required/>
</div>
<div id="NewEventNameDiv" >Event Location (Optional):{"\n"}
<input type="text" style= {{textAlign: 'left'}} id="NewEventLocation" name="NewEventLocation" />
</div>
<div id="NewEventNameDiv" >Event Description (Optional):{"\n"}
<input type="text" style= {{textAlign: 'left'}} id="NewEventDescription" name="NewEventDescription" />
</div>

</div>
</td>
</tr>
<tr><td style= {{verticalAlign:'top', textAlign: 'left', rowSpan:'2', width: '50%', margin:'20px auto 20px auto'}}>

<div className='app'>
      <h2 className='text-center'>Calendar</h2>
      <div className='calendar-container'>
      <Calendar selectRange
  locale="en-GB"/>
      </div>
    </div>

</td>
<td>
<div className = "times" style= {{textAlign: 'left' ,verticalAlign:'top' }}>
<h2>What times work the best?</h2>
<h4>No earlier than: <select name="NoEarlierThan">
  <option value="0">12:00  AM</option>  <option value="1">1:00  AM</option>  <option value="2">2:00  AM</option>  <option value="3">3:00  AM</option>  <option value="4">4:00  AM</option>  <option value="5">5:00  AM</option>  <option value="6">6:00  AM</option>  <option value="7">7:00  AM</option>  <option value="8">8:00  AM</option>  <option selected value="9">9:00  AM</option>  <option value="10">10:00  AM</option>  <option value="11">11:00  AM</option>  <option value="12">12:00  PM</option>  <option value="13">1:00  PM</option>  <option value="14">2:00  PM</option>  <option value="15">3:00  PM</option>  <option value="16">4:00  PM</option>  <option value="17">5:00  PM</option>  <option value="18">6:00  PM</option>  <option value="19">7:00  PM</option>  <option value="20">8:00  PM</option>  <option value="21">9:00  PM</option>  <option value="22">10:00  PM</option>  <option value="23">11:00  PM</option>  <option value="0">12:00  AM</option>
  </select></h4>
  <h4>No later than: &nbsp;&nbsp;<select name="NoLaterThan">
  <option value="0">12:00  AM</option>  <option value="1">1:00  AM</option>  <option value="2">2:00  AM</option>  <option value="3">3:00  AM</option>  <option value="4">4:00  AM</option>  <option value="5">5:00  AM</option>  <option value="6">6:00  AM</option>  <option value="7">7:00  AM</option>  <option value="8">8:00  AM</option>  <option selected value="9">9:00  AM</option>  <option value="10">10:00  AM</option>  <option value="11">11:00  AM</option>  <option value="12">12:00  PM</option>  <option value="13">1:00  PM</option>  <option value="14">2:00  PM</option>  <option value="15">3:00  PM</option>  <option value="16">4:00  PM</option>  <option value="17">5:00  PM</option>  <option value="18">6:00  PM</option>  <option value="19">7:00  PM</option>  <option value="20">8:00  PM</option>  <option value="21">9:00  PM</option>  <option value="22">10:00  PM</option>  <option value="23">11:00  PM</option>  <option value="0">12:00  AM</option>
  </select></h4>
  <h4>Time Zone:  <select name="TimeZone" id="TimeZone">
  <option value="Asia">Asia/Hong_Kong</option>
<option value="GMT+8">GMT+8</option>
  </select></h4>
<div className="go">&nbsp;&nbsp;<input type="submit" value="Create Event!"/>
</div>
</div>
</td>
</tr>
</table>
</form>


      </Container>
    </>
  );
}
