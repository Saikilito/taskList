import { Dispatch, SetStateAction } from 'react';
import { Types } from '../../common';

export type StatusObjectIconType = {
  [x: string]: JSX.Element;
};

export type CardInfoPropsType = {
  rows: Types.Task[];
  handleDeleteRow: (taskId: string) => void;
  handleStatusForm: Dispatch<SetStateAction<Types.StatusFormType>>;
  handleFormModal: Dispatch<SetStateAction<boolean>>;
  handleRetrieveTaskData: (task: Types.Task) => void;
};

export type CardHeaderButtonsPropsType = {
  taskIds: string[];
  removeTaskId: ({ taskId }: { taskId: string }) => void;
  handleDeleteTask: Dispatch<SetStateAction<string>>;
  handleCheckReset: Dispatch<SetStateAction<boolean>>;
  orderTasksByExpiration: () => void;
  orderTasksByCratedAt: () => void;
  orderTasksByStatus: () => void;
};

export type CardComponentProps = {
  task: Types.Task;
  addTaskId: React.Dispatch<React.SetStateAction<{ taskId: string }>>;
  removeTaskId: React.Dispatch<React.SetStateAction<{ taskId: string }>>;
  checkReset: boolean;
  handleRetrieveTaskData: (task: Types.Task) => void;
  taskSelected: (taskId: string) => void;
  taskUnselected: (taskId: string) => void;
  color: string;
  handleFormModal: Dispatch<SetStateAction<boolean>>;
  handleStatusForm: Dispatch<SetStateAction<Types.StatusFormType>>;
};

export type SelectedTaskMethodPropsType = {
  taskId: string;
};
