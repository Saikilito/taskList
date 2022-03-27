import React from 'react';

import {
  FormHelperText,
  FormControl,
  Typography,
  InputLabel,
  FormGroup,
  Container,
  Button,
  Input,
  Grid,
} from '@mui/material';

// My Types
import { FormTaskType } from './FormTask.type';

// My Components
import { SelectComponent, DateAndTimePicker } from '../';

// To Code
export const FormTask = ({
  initialValues: { task, expiration, status },
  formValues: { formTitle, buttonText },
  selectStatusValues,
  formikSubmitHandle,
  formikHandleChange,
  formikSetFieldValue,
  formikHandleBlur,
  handleFormModal,
}: FormTaskType) => (
  <Container
    maxWidth="xl"
    style={{
      maxWidth: 1102,
      margin: '3rem 0',
      border: '1px solid rgb(224, 224, 224)',
      borderRadius: 4,
      padding: '5rem',
    }}
  >
    <Grid container justifyContent="center">
      {/** Form Title */}
      <Grid item md={12}>
        <Typography
          align="center"
          fontStyle="italic"
          fontWeight="bold"
          variant="h4"
          margin="20px 0"
        >
          {formTitle}
        </Typography>
      </Grid>

      {/** Form */}
      <form onSubmit={formikSubmitHandle} style={{ width: '100%' }}>
        <Grid item md={12}>
          <FormControl fullWidth>
            <FormGroup>
              <InputLabel htmlFor="task">Task Description</InputLabel>
              {''}
              <Input
                id="task"
                aria-describedby="task-description-helper-text"
                onChange={formikHandleChange}
                onBlur={formikHandleBlur}
                value={task}
                required
                autoFocus
              />
              {''}
              <FormHelperText id="task-description-helper-text">
                Describe your new task
              </FormHelperText>
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item md={12} margin="2rem 0">
          <SelectComponent
            name="status"
            externalValue={status}
            externalHandleChange={formikHandleChange}
            options={selectStatusValues}
            selectTitle={'Status'}
          />
        </Grid>
        <Grid item md={12} margin="2rem 0">
          <FormControl fullWidth>
            <FormGroup>
              {''}
              <DateAndTimePicker
                label="Expiration Date"
                initValue={expiration}
                onChangeFunction={formikSetFieldValue}
              />
              {''}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item md={12} margin="20px 0">
          <Button
            type="submit"
            onClick={() => handleFormModal(false)}
            fullWidth
            variant="contained"
          >
            {buttonText}
          </Button>
        </Grid>
      </form>
    </Grid>
  </Container>
);
