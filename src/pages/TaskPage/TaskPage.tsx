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
import { Types, CONSTANT, Helpers } from '../../common';

// My Components
import {
  StatusLegend,
  FormTaskContainer as FormTask,
  FormModal,
  CardTasks,
} from '../../components';

// To Code
const { dateFormat } = CONSTANT.general.dates;
const { formStatus } = CONSTANT.app.task;

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
  taskSelected,
  taskUnselected,
  orderTasksByStatus,
  orderTasksByCratedAt,
  orderTasksByExpiration,
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
          handleFormModal={handleFormModal}
          handleStatusForm={handleStatusForm}
          taskSelected={(taskId) => dispatch(taskSelected(taskId))}
          taskUnselected={(taskId) => dispatch(taskUnselected(taskId))}
          handleDeleteTask={(taskId: string) => dispatch(deleteTask(taskId))}
          orderTasksByExpiration={() => dispatch(orderTasksByExpiration())}
          orderTasksByCratedAt={() => dispatch(orderTasksByCratedAt())}
          orderTasksByStatus={() => dispatch(orderTasksByStatus)}
          handleRetrieveTaskData={handleRetrieveTaskData}
        />

        <br />

        {/** Form Modal Button */}
        <Button
          onClick={() => {
            handleFormModal(true);
            handleStatusForm(formStatus.add);
            const genericTask: Types.Task = Helpers.createGenericTaskInstance(
              {}
            );
            handleRetrieveTaskData(genericTask);
          }}
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
