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

// Helpers
import { CONSTANT } from '../../common';

// My types
import { CardComponentProps } from './Card.type';

// To Code
const { formStatus, status: StatusTask } = CONSTANT.app.task;

const label = { inputProps: { 'aria-label': 'Checkbox task' } };

export const CardComponent: React.FC<CardComponentProps> = ({
  task: { id: taskId, taskDescription, expiration, status, createdAt },
  addTaskId,
  checkReset,
  color,
  removeTaskId,
  taskSelected,
  taskUnselected,
  handleFormModal,
  handleStatusForm,
  handleRetrieveTaskData,
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
      taskSelected(taskId);
      return addTaskId({ taskId });
    }

    taskUnselected(taskId);
    return removeTaskId({ taskId });
  };
  const handlerClickCalendarEdit = () => {
    handleStatusForm(formStatus.edit);
    handleRetrieveTaskData({
      id: taskId,
      taskDescription,
      status: StatusTask.pending,
      expiration,
      createdAt,
    });
    handleFormModal(true);
  };
  return (
    <Card
      sx={{
        backgroundColor: color,
        display: 'flex',
        width: '100%',
        margin: '1rem 0',
      }}
    >
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
              <CalendarMonth
                style={{
                  margin: '0 5px',
                  cursor: 'pointer',
                  // background: '#ce93d8',
                  color: '#880e4f',
                }}
                onClick={handlerClickCalendarEdit}
              />
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
