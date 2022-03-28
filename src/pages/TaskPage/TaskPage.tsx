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
import { AddCircle } from '@mui/icons-material';
import moment from 'moment';

// Helpers
import { TaskPageType } from './TaskPage.type';
import { CONSTANT } from '../../common';

// My Components
import {
  StatusLegend,
  FormTaskContainer as FormTask,
  FormModal,
  CardTasks,
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
}: TaskPageType) => {
  const dispatch = useDispatch();
  return (
    <Container maxWidth="lg">
      <AppBar>
        <Toolbar>
          <Typography fontWeight="bold"> Bienvenido a tu lista </Typography>
        </Toolbar>
      </AppBar>
      <br />

      {/** Body */}
      <Grid container direction="column" alignItems="center">
        {/* Header */}
        <Grid item margin="3rem 0" width="100%">
          <Grid container justifyContent="space-between">
            <Typography align="center" variant="h2">
              Cosas por hacer
            </Typography>
            <Typography variant="h6">Hoy: {now} </Typography>
          </Grid>
        </Grid>

        {/** Card Task */}
        <CardTasks
          tasks={tasks}
          handleDeleteTask={(taskId: string) => dispatch(deleteTask(taskId))}
        />
        <br />

        {/** Form Modal Button */}
        <Button
          onClick={() => handleFormModal(true)}
          fullWidth
          variant="contained"
        >
          {' '}
          Create new task{' '}
          <AddCircle style={{ color: 'white', margin: '0 10px' }} />
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
