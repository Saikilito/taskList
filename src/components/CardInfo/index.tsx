import React from 'react';
import { DataGrid, GridCellParams, MuiEvent } from '@mui/x-data-grid';
import { FilterAlt } from '@mui/icons-material';
import { Container, Grid, Button } from '@mui/material';

import './CardInfo.css';

// Helpers
import { CONSTANT } from '../../common';
import { dataGridProps } from './CardInfo.config';

// Types
import { CardInfoPropsType } from './CardInfo.type';

// To Code
const { formStatus } = CONSTANT.app.task;

function CardInfo({
  rows,
  handleDeleteRow,
  handleStatusForm,
  handleFormModal,
  handleRetrieveTaskData,
}: CardInfoPropsType) {
  const handleOnCellClick = (
    params: GridCellParams,
    event: MuiEvent<React.MouseEvent>
  ) => {
    event.defaultMuiPrevented = true;

    if (params.field === 'delete') {
      const taskId = params?.id as string;
      handleDeleteRow(taskId);
    }

    if (params.field === formStatus.edit) {
      const { id, taskDescription, status, expiration, createdAt } = params.row;

      handleStatusForm(formStatus.edit);
      handleRetrieveTaskData({
        id,
        taskDescription,
        status,
        expiration,
        createdAt,
      });
      handleFormModal(true);
    }
  };
  return (
    <Container maxWidth="xl" style={{ height: '100%', margin: '3rem 0' }}>
      <Grid
        container
        justifyContent="space-between"
        margin="20px 0"
        width="100%"
      >
        <Button>Clear finish task</Button>
        <FilterAlt style={{ cursor: 'pointer' }} />
      </Grid>
      <DataGrid
        rows={rows}
        onCellClick={handleOnCellClick}
        {...dataGridProps}
      />
    </Container>
  );
}

export { CardInfo };
