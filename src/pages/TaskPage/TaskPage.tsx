import React from 'react';
import { useDispatch } from 'react-redux';

import {
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';
import moment from 'moment';

// Helpers
import { TaskPageType } from './TaskPage.type';
import { CONSTANT } from '../../common';

// My Components
import {
  CardInfo,
  StatusLegend,
  FormTaskContainer as FormTask,
  FormModal,
} from '../../components';

// To Code
const { dateFormat } = CONSTANT.general.dates;

const now = moment().format(dateFormat);

export const TaskPage = ({
  tasks,
  deleteTask,
  statusForm,
  formInitValue,
  handleStatusForm,
  openFormModal,
  handleFormModal,
  handleRetrieveTaskData,
}: TaskPageType) => {
  const dispatch = useDispatch();
  return (
    <Container maxWidth="lg">
      <AppBar>
        <Toolbar>
          <Typography> Today: {now}</Typography>
        </Toolbar>
      </AppBar>
      <br />

      {/** Body */}
      <Grid container direction="column" alignItems="center">
        {/* Header */}
        <Grid item margin="3rem 0">
          <Typography align="center" variant="h1">
            List Task
          </Typography>
          <Typography variant="h3">Today: {now} </Typography>
        </Grid>

        {/** Task Table*/}
        <CardInfo
          rows={tasks}
          handleStatusForm={handleStatusForm}
          handleFormModal={handleFormModal}
          handleRetrieveTaskData={handleRetrieveTaskData}
          handleDeleteRow={(taskId: string) => dispatch(deleteTask(taskId))}
        />
        <br />

        {/** Form Modal Button */}
        <Button
          onClick={() => handleFormModal(true)}
          fullWidth
          variant="contained"
        >
          {' '}
          Create new task{'  '}
        </Button>
        {/** Form Modal */}
        <FormModal
          openFormModal={openFormModal}
          handleFormModal={handleFormModal}
        >
          {/** Task Form */}
          <FormTask
            statusForm={statusForm}
            initialValues={formInitValue}
            handleFormModal={handleFormModal}
            handleStatusForm={handleStatusForm}
          />
        </FormModal>

        <br />

        {/** Legend */}
        <StatusLegend />
      </Grid>
    </Container>
  );
};
