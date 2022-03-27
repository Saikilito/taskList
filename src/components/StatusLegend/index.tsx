import React from 'react';

import { Grid } from '@mui/material';

import {
  HourglassBottom,
  CheckCircle,
  Dangerous,
  Warning,
} from '@mui/icons-material';

import { Typography } from '@mui/material';

function StatusLegend() {
  return (
    <Grid
      container
      direction="column"
      wrap="wrap"
      alignItems="center"
      margin="2rem 0"
    >
      <Grid item md={12}>
        <Typography variant="h3" align="center">
          Status Legend
        </Typography>
      </Grid>

      <br />

      <Grid container justifyContent="center" margin="1rem 0" wrap="wrap">
        <Grid item md={3} style={{ textAlign: 'center' }}>
          <CheckCircle color="success" />
          <Typography>Finished Task</Typography>
        </Grid>
        <Grid item md={3} style={{ textAlign: 'center' }}>
          <HourglassBottom color="primary" />
          <Typography>Pending Task</Typography>
        </Grid>
        <Grid item md={3} style={{ textAlign: 'center' }}>
          <Warning color="warning" />
          <Typography>Little time</Typography>
        </Grid>
        <Grid item md={3} style={{ textAlign: 'center' }}>
          <Dangerous color="error" />
          <Typography>Time over</Typography>
        </Grid>
      </Grid>

      <br />
    </Grid>
  );
}

export { StatusLegend };
