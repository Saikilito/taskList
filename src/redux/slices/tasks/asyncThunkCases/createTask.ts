import axios from 'axios';
import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';

// Helpers
import { Types, CONSTANT } from '../../../../common';

// Types
import { TaskState } from '../TaskState.type';

// To Code
const currentEnvironment: Types.Environment = process.env.NODE_ENV ?? 'local';
const API_URI = CONSTANT.uri.api[currentEnvironment];

export const createTask = createAsyncThunk(
  'task/createTask',
  async (task: Types.Task, thunkAPI) => {
    try {
      const URI = `${API_URI}/tasks`;
      const { data = [] } = await axios.post(URI, task);

      return data;
    } catch (error) {
      console.error('Get tasks function error:', error);
      return thunkAPI.rejectWithValue({ errorMessage: error?.message ?? null });
    }
  }
);

export const createTaskCase = (builder: ActionReducerMapBuilder<TaskState>) => {
  builder
    // Create Task
    .addCase(createTask.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(createTask.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.errorMessage = 'create tasks error: ' + JSON.stringify(payload);
    })
    .addCase(createTask.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.tasks.push(payload);

      if (payload && payload.errorMessage) {
        state.status = 'failed';
        state.errorMessage = 'crete tasks error: ' + JSON.stringify(payload);
      }
    });

  return builder;
};
