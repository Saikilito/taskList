import { toast } from "react-toastify";
import axios from 'axios';
import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';

// Helpers
import { Types, CONSTANT } from '../../../../common';

// Types
import { TaskState } from '../TaskState.type';
import { ThermostatAutoSharp } from "@mui/icons-material";

// To Code
const currentEnvironment: Types.Environment = process.env.NODE_ENV ?? 'local';
const API_URI = CONSTANT.uri.api[currentEnvironment];

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (task: Types.Task, thunkAPI) => {
    try {
      const { id } = task;
      const URI = `${API_URI}/tasks/${id}`;

      await axios.put(URI, task);
      return task;
    } catch (error) {
      console.error(`update task ${task.id} function error:`, error);
      return thunkAPI.rejectWithValue({ errorMessage: error?.message ?? null });
    }
  }
);

export const updateTaskCase = (builder: ActionReducerMapBuilder<TaskState>) => {
  builder
    .addCase(updateTask.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateTask.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.errorMessage = 'update tasks error: ' + JSON.stringify(payload);
      toast.error(state.errorMessage)
    })
    .addCase(updateTask.fulfilled, (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload.id);
      state.tasks.push(payload);
      state.status = 'success';
    });

  return builder;
};
