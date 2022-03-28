import React, { FC } from 'react';

import { Grid, Button, IconButton } from '@mui/material/';
import { FilterAlt } from '@mui/icons-material';

// My Types
import { CardHeaderButtonsPropsType } from './Card.type';

export const CardHeaderButtons: FC<CardHeaderButtonsPropsType> = ({
  taskIds,
  removeTaskId,
  handleDeleteTask,
  handleCheckReset,
}) => {
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
  return (
    <Grid container justifyContent="space-between" margin="20px 0" width="100%">
      <Button onClick={handleRemoveTask}>Liberar seleccionadas</Button>
      <IconButton>
        <FilterAlt style={{ cursor: 'pointer' }} />
      </IconButton>
    </Grid>
  );
};
