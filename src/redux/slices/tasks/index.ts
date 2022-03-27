import { createSlice } from '@reduxjs/toolkit';

// Redux
import { RootState } from '../../store';

import {
  getTasks,
  getTasksCase,
  createTask,
  createTaskCase,
  deleteTask,
  deleteTaskCase,
  updateTask,
  updateTaskCase,
} from './asyncThunkCases';

// Types
import { TaskState } from './TaskState.type';

// To code
const initialState: TaskState = {
  status: 'success',
  errorMessage: null,
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    getTasksCase(builder);
    createTaskCase(builder);
    updateTaskCase(builder);
    deleteTaskCase(builder);
  },
});

// export const {  } = taskSlice.actions;

export { getTasks, createTask, updateTask, deleteTask };

export const selectTask = (state: RootState) => state.tasks;

export default taskSlice.reducer;
