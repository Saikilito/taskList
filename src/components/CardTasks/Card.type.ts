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
};

export type CardComponentProps = {
  task: Types.Task;
  addTaskId: React.Dispatch<React.SetStateAction<{ taskId: string }>>;
  removeTaskId: React.Dispatch<React.SetStateAction<{ taskId: string }>>;
  checkReset: boolean;
};

export type SelectedTaskMethodPropsType = {
  taskId: string;
};
