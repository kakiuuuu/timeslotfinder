// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Paper, Button} from '@mui/material';
import React, { useState } from 'react';
import ICAL from 'ical.js';
import FileUploadIcon from '@mui/icons-material/FileUpload';



// ----------------------------------------------------------------------


export default function ComparePage() {
  const theme = useTheme();
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [result, setResult] = useState('');

  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
  };

  const compare = () => {
    if (!file1 || !file2) {
      alert('Please select two iCal files to compare.');
      return;
    }
    const reader1 = new FileReader();
    const reader2 = new FileReader();
    reader1.onload = () => {
      reader2.onload = () => {
        const cal1 = ICAL.parse(reader1.result);
        const cal2 = ICAL.parse(reader2.result);
        const diff = cal1.subtract(cal2);  //.subtract() have some error

        if (diff.isEmpty()) {  //.isempty have some error
          setResult('The two iCal files are identical.');
        } else {
          const text = diff.toString().replace(/\n/g, '<br>');
          setResult(`The following differences were found:<br>${text}`);
        }

      };
      reader2.readAsText(file2);
    };
    reader1.readAsText(file1);
  };
  return (
    <Container maxWidth="xl">
      <Box sx={{ borderColor: 'black', borderRadius: '32px' }} >
        <form>
          <Grid container spacing={6} justifyContent="center">
            <Grid item xs={12}>
              <h2>Compare ICS files </h2>
            </Grid>

            <Grid item xs={12} md={6} lg={4} >
              <Paper
                round={true}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 400,
                  textAlign: 'center',
                  borderRadius: '20px',
                  bgcolor: 'white',
                }}
                elevation={22}
              >
                {/*         <Container alignItems="flex-end"> */}
                {/*  <label htmlFor="file1" ><div style={{ fontSize: 20 }}>Upload your first ics file here:</div><br></br>
                        <input type="file" id="file1" onChange={handleFile1Change} locale="en-GB"/><br /><br /></label> */}

                <Box bgcolor="rgb(71, 119, 179)" width='100%' height='25%' >
                  <br></br><FileUploadIcon sx={{ fontSize: 50, color: 'black' }} />
                </Box>
                <Box alignItems="center" sx={{ padding: 5 }}>
                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>Please upload your first ICS file here:</div><br></br>
                </Box>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'baseline-bottom',
                }}
                >
                  <Button variant="contained" component="label" htmlFor="file1" sx={{ width: 2 / 3 }} bottom="0" size='large'>
                    Upload
                    <input accept=".ics" hidden multiple type="file" id="file1" onChange={handleFile1Change} />
                  </Button>
                </Box>
              </Paper>
            </Grid>


            <Grid item xs={12} md={6} lg={4} textAlign='center'>
              <Paper
                elevation={22}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 400,
                  borderRadius: '20px'
                }}
              >

                <Box bgcolor="rgb(47, 115, 197)" width='100%' height='25%' >
                  <br></br><FileUploadIcon sx={{ fontSize: 50, color: 'black' }} />
                </Box>
                <Box alignItems="center" sx={{ padding: 5 }}>
                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>Please upload your second ICS file here:</div>
                </Box>
                {/* <label htmlFor="file2"><div style={{ fontSize: 20 }}>Select second ics file:</div><br></br>
 <input type="file" id="file2" onChange={handleFile2Change} locale="en-GB"/><br /><br /></label>  */}
                <Box textAlign='center'>
                  <Button variant="contained" component="label" htmlFor="file2" maxWidth={false} sx={{ width: 2 / 3 }} size='large'>
                    Upload
                    <input accept=".ics" hidden multiple type="file" id="file2" onChange={handleFile2Change} />
                  </Button>
                </Box>
                <div dangerouslySetInnerHTML={{ __html: result }} />
              </Paper>
            </Grid>

            <Grid item xs={6} lg={5} >
              <Box textAlign='center'>
                <Button
                  variant="contained"
                  sx={{ mt: 3, width: 200 }}
                  onClick={compare}
                  textAlign='center'
                  size='large'
                >
                  {'Compare'}
                </Button>
              </Box>
            </Grid>

          </Grid>
        </form>
      </Box>
    </Container>
  );
}