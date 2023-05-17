import { Calendar } from 'react-big-calendar'
import SimpleBar from 'simplebar-react';
// @mui
import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledCalendar = styled(Calendar)(({ theme }) => ({
  '.rbc-day-slot':{
    width: '50%', 
    backgroundColor: theme.palette.background.paper,
  },
  '.rbc-day-slot .selected-slot': {
    backgroundColor: theme.palette.success.main,
  },
}));
