import axios from 'axios';
import { toast } from 'react-toastify';
import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';

// Helpers
import { Types, CONSTANT } from '../../../../common';

// Types
import { TaskState } from '../TaskState.type';

// To Code
const currentEnvironment: Types.Environment = process.env.NODE_ENV ?? 'local';
const API_URI = CONSTANT.uri.api[currentEnvironment];

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (taskId: string, thunkAPI) => {
    try {
      const URI = `${API_URI}/tasks/${taskId}`;
      await axios.delete(URI);

      return taskId;
    } catch (error) {
      console.error(
        `Delete task ${taskId} function error:`,
        JSON.stringify(error)
      );
      return thunkAPI.rejectWithValue({ errorMessage: error?.message ?? null });
    }
  }
);

export const deleteTaskCase = (builder: ActionReducerMapBuilder<TaskState>) => {
  builder
    .addCase(deleteTask.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(deleteTask.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.errorMessage = 'delete tasks error: ' + JSON.stringify(payload);
      toast.error(state.errorMessage);
    })
    .addCase(deleteTask.fulfilled, (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
      state.status = 'success';
    });

  return builder;
};
