import axios from 'axios';
import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';

// Helpers
import { Types, CONSTANT } from '../../../../common';

// Types
import { TaskState } from '../TaskState.type';

// To Code
const currentEnvironment: Types.Environment = process.env.NODE_ENV ?? 'local';
const API_URI = CONSTANT.uri.api[currentEnvironment];

export const getTasks = createAsyncThunk(
  'task/getTask',
  async (_, thunkAPI) => {
    try {
      const URI = `${API_URI}/tasks`;
      const { data = [] } = await axios.get(URI);
      return data;
    } catch (error) {
      console.error('Get tasks function error:', JSON.stringify(error));
      return thunkAPI.rejectWithValue({ errorMessage: error?.message ?? null });
    }
  }
);

export const getTasksCase = (builder: ActionReducerMapBuilder<TaskState>) => {
  builder
    .addCase(getTasks.pending, (state) => {
      state.status = 'loading';
    })

    .addCase(getTasks.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.errorMessage = 'get tasks error: ' + JSON.stringify(payload);
    })

    .addCase(getTasks.fulfilled, (state, { payload }) => {
      state.status = 'success';

      if (payload && !payload.errorMessage && payload.length) {
        state.tasks = [];
        state.tasks.push(...payload);
      }

      if (payload && payload.errorMessage) {
        state.status = 'failed';
        state.errorMessage = 'get tasks error: ' + JSON.stringify(payload);
      }
    });

  return builder;
};
