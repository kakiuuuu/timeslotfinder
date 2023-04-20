import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './EventPage.css';
import { useForm } from "react-hook-form";
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components

import EventAPI from '../api/apiController'
import { useNavigate } from 'react-router-dom';
import { TimePicker } from '@mui/lab';
import { createTimeSlots } from 'src/utils';



// ----------------------------------------------------------------------

export default function EventPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dateRange, onChange] = useState([new Date(), new Date()]);
  const { register, handleSubmit, formState: { errors } } = useForm({
    values: {
      eventName: '',
      eventLocation: '',
      eventDescription: '',
    },
  });
  
  const onFormSumbit = async (_formData, e) => {
    console.log('formData>>>>>', _formData)
    e.preventDefault();
    
    const formData = {
      ..._formData,
      startDate: dateRange[0],
      endDate: dateRange[1],
      slots: JSON.stringify([...createTimeSlots(dateRange[0], dateRange[1], 15, _formData.noEarlierThan, _formData.noLaterThan)])
    }
    // return console.log('formData>>>', formData)
    let createEvent = await EventAPI.createEvent(formData)
    if (createEvent) {
      console.log('createEvent>>>>', createEvent)
      navigate(`/event/${createEvent.data.insertedId}`);
    }
  };
  return (
    <>
      <Container maxWidth="xl">
        <h2 className="header">Create New Event Page</h2>
        <form onSubmit={handleSubmit(onFormSumbit)}>
          New Event Name:
          <input type="text" {...register("eventName", { required: true })} />
          {errors.eventName && <span> This field is required!</span>}
          Event Location (Optional):
          <input type="text" {...register("eventLocation")} />

          Event Description (Optional):
          <input type="text" {...register("eventDescription")} />
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div>
              <h2>Calendar</h2>
              <Calendar
                selectRange
                locale="en-GB"
                onChange={onChange} value={dateRange}
              />
            </div>

            <div>
              <h2>What times work the best?</h2>
              <h4>No earlier than:
                <select {...register("noEarlierThan")} >
                  <option value="0">12:00  AM</option>  <option value="1">1:00  AM</option>  <option value="2">2:00  AM</option>  <option value="3">3:00  AM</option>  <option value="4">4:00  AM</option>  <option value="5">5:00  AM</option>  <option value="6">6:00  AM</option>  <option value="7">7:00  AM</option>  <option value="8">8:00  AM</option>  <option value="9">9:00  AM</option>  <option value="10">10:00  AM</option>  <option value="11">11:00  AM</option>  <option value="12">12:00  PM</option>  <option value="13">1:00  PM</option>  <option value="14">2:00  PM</option>  <option value="15">3:00  PM</option>  <option value="16">4:00  PM</option>  <option value="17">5:00  PM</option>  <option value="18">6:00  PM</option>  <option value="19">7:00  PM</option>  <option value="20">8:00  PM</option>  <option value="21">9:00  PM</option>  <option value="22">10:00  PM</option>  <option value="23">11:00  PM</option>  <option value="0">12:00  AM</option>
                </select>
              </h4>
              <h4>No later than:
                <TimePicker />
                <select {...register("noLaterThan")} >
                  <option value="0">12:00  AM</option>  <option value="1">1:00  AM</option>  <option value="2">2:00  AM</option>  <option value="3">3:00  AM</option>  <option value="4">4:00  AM</option>  <option value="5">5:00  AM</option>  <option value="6">6:00  AM</option>  <option value="7">7:00  AM</option>  <option value="8">8:00  AM</option>  <option value="9">9:00  AM</option>  <option value="10">10:00  AM</option>  <option value="11">11:00  AM</option>  <option value="12">12:00  PM</option>  <option value="13">1:00  PM</option>  <option value="14">2:00  PM</option>  <option value="15">3:00  PM</option>  <option value="16">4:00  PM</option>  <option value="17">5:00  PM</option>  <option value="18">6:00  PM</option>  <option value="19">7:00  PM</option>  <option value="20">8:00  PM</option>  <option value="21">9:00  PM</option>  <option value="22">10:00  PM</option>  <option value="23">11:00  PM</option>  <option value="0">12:00  AM</option>
                </select>
              </h4>
              <h4>Time Zone:
                <select name="TimeZone" id="TimeZone">
                  <option value="Asia">Asia/Hong_Kong</option>
                  <option value="GMT+8">GMT+8</option>
                </select>
              </h4>
              <div className="go">
                <input type="submit" value="Create Event!" />
              </div>
            </div>
          </div>

        </form>
      </Container>
    </>
  );
}

