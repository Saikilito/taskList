import React, { FC } from 'react';

import {
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material/';

import { makeStyles } from '@mui/styles';

// Helpers
import { CONSTANT } from '../../common';

// My Types
import { CardHeaderButtonsPropsType } from './Card.type';

// To Code
const { sortOptions } = CONSTANT.app.task;

const SELECT_OPTIONS = [
  {
    value: sortOptions.createdAt,
    description: 'Según fecha de creación',
  },
  {
    value: sortOptions.expiration,
    description: 'Según fecha de vencimiento',
  },
  {
    value: sortOptions.status,
    description: 'Según estado de la tarjeta',
  },
];

const useStyles = makeStyles(() => ({
  formControl: {
    width: 280,
  },
}));

export const CardHeaderButtons: FC<CardHeaderButtonsPropsType> = ({
  taskIds,
  removeTaskId,
  handleDeleteTask,
  handleCheckReset,
  orderTasksByExpiration,
  orderTasksByCratedAt,
  orderTasksByStatus,
}) => {
  const classes = useStyles();
  const handleRemoveTask = async () => {
    handleCheckReset((current) => !current);
    await Promise.allSettled(
      taskIds.map((id) => {
        removeTaskId({ taskId: id });
        return handleDeleteTask(id);
      })
    );
    handleCheckReset((current) => !current);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    if (value === sortOptions.expiration) {
      orderTasksByExpiration();
    } else if (value === sortOptions.createdAt) {
      orderTasksByCratedAt();
    } else if (value === sortOptions.status) {
      orderTasksByStatus();
    }
  };
  return (
    <Grid container justifyContent="space-between" margin="20px 0" width="100%">
      <Button onClick={handleRemoveTask}>Liberar seleccionadas</Button>

      <Grid item alignContent="center">
        <FormControl className={classes.formControl}>
          <InputLabel>Ordenar</InputLabel>

          <Select value={''} onChange={handleChange}>
            {SELECT_OPTIONS.map(({ description, value }, index: number) => (
              <MenuItem key={index} value={value}>
                {description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
