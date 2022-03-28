import * as React from 'react';
import {
  Grid,
  Card,
  Checkbox,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material/';
import { CalendarMonth } from '@mui/icons-material';

// My types
import { CardComponentProps } from './Card.type';

// To Code
const label = { inputProps: { 'aria-label': 'Checkbox task' } };

export const CardComponent: React.FC<CardComponentProps> = ({
  task: { id: taskId, taskDescription, expiration, status },
  addTaskId,
  checkReset,
  removeTaskId,
}) => {
  // Local State
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    checkReset && setChecked(false);
  }, [checkReset]);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    const { checked } = e.target;

    setChecked((current) => !current);

    if (checked) {
      return addTaskId({ taskId });
    }
    return removeTaskId({ taskId });
  };

  return (
    <Card sx={{ display: 'flex', width: '100%', margin: '1rem 0' }}>
      <Grid container>
        <Grid item>
          <CardContent>
            <Checkbox
              {...label}
              checked={checked}
              onChange={(e) => handleCheckboxChange(e, taskId)}
              color="success"
            />
          </CardContent>
        </Grid>
        <Grid item flexGrow="3">
          <CardContent>
            <Typography align="center">{taskDescription}</Typography>
          </CardContent>
        </Grid>
        <Grid item>
          <CardContent>
            <Grid container>
              <Typography>{expiration}</Typography>
              <CalendarMonth style={{ margin: '0 5px' }} />
            </Grid>
          </CardContent>
        </Grid>
        <Grid item>
          <CardContent>
            <IconButton aria-label="status-icon">{status}</IconButton>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
