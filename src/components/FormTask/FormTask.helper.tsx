import React from 'react';

import { AddCircle, Edit } from '@mui/icons-material';

// Helpers
import { CONSTANT } from '../../common';

// My types
import { FormStatusValuesType } from './FormTask.type';

// To Code
const { status: TaskStatus } = CONSTANT.app.task;

const CreateNewTaskComponent = () => (
  <>
    Create new task <AddCircle style={{ color: 'white', margin: '0 10px' }} />
  </>
);

const EditTaskComponent = () => (
  <>
    Edit task now <Edit style={{ color: 'white', margin: '0 10px' }} />
  </>
);

export const formValues = {
  add: {
    formTitle: 'Add new task',
    buttonText: CreateNewTaskComponent(),
  },
  edit: {
    formTitle: 'Edit task',
    buttonText: EditTaskComponent(),
  },
} as FormStatusValuesType;

export const selectStatusValues = [
  {
    value: TaskStatus.finished,
    name: TaskStatus.finished,
  },
  {
    value: TaskStatus.pending,
    name: TaskStatus.pending,
  },
  {
    value: TaskStatus.timeOver,
    name: TaskStatus.timeOver,
  },
  {
    value: TaskStatus.urgently,
    name: TaskStatus.urgently,
  },
];
