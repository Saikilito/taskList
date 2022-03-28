import { createSlice } from '@reduxjs/toolkit';

import moment from 'moment';

// Helpers
import { Types, CONSTANT } from '../../../common';
import { reCalculateStatus } from './tasks.helper';

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
const { status: StatusTask } = CONSTANT.app.task;

const initialState: TaskState = {
  status: 'success',
  errorMessage: null,
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    orderTasksByExpiration: (state) => {
      const tasks = state.tasks as Types.Task[];

      state.tasks = tasks.sort((a, b) =>
        moment(b.expiration).isAfter(a.expiration) ? -1 : 1
      );
    },
    orderTasksByCratedAt: (state) => {
      const tasks = state.tasks as Types.Task[];

      state.tasks = tasks.sort((a, b) =>
        moment(b.createdAt).isAfter(a.createdAt) ? 1 : -1
      );
    },
    orderTasksByStatus: (state) => {
      const tasks = state.tasks as Types.Task[];

      const objectStatusMap = {
        [StatusTask.pending]: 1,
        [StatusTask.urgently]: 2,
        [StatusTask.timeOver]: 3,
        [StatusTask.finished]: 3,
      };

      const sortedTasks = tasks.sort(
        (a, b) => objectStatusMap[b.status] - objectStatusMap[a.status] ?? 1
      );

      state.tasks = sortedTasks;
    },
    taskSelected: (state, { payload }) => {
      const tasks = state.tasks as Types.Task[];

      state.tasks = tasks.map((task) => {
        if (task.id === payload) {
          return {
            ...task,
            status: StatusTask.finished,
          };
        }
        return task;
      });
    },
    taskUnselected: (state, { payload }) => {
      const tasks = state.tasks as Types.Task[];

      state.tasks = tasks.map((task) => {
        if (task.id === payload) {
          const [reTask] = reCalculateStatus([task]);
          return reTask;
        }
        return task;
      });
    },
  },

  extraReducers: (builder) => {
    getTasksCase(builder);
    createTaskCase(builder);
    updateTaskCase(builder);
    deleteTaskCase(builder);
  },
});

export const {
  orderTasksByExpiration,
  orderTasksByCratedAt,
  orderTasksByStatus,
  taskSelected,
  taskUnselected,
} = taskSlice.actions;

export { getTasks, createTask, updateTask, deleteTask };

export const selectTask = (state: RootState) => state.tasks;

export default taskSlice.reducer;
