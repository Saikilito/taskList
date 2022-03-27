import { Dispatch, SetStateAction } from 'react';

// Helpers
import { Types } from '../../common';

export type TaskPageType = {
  tasks: Types.Task[];
  deleteTask: (id: string) => void;
  statusForm: Types.StatusFormType;
  formInitValue: Types.Task;
  handleStatusForm: Dispatch<SetStateAction<Types.StatusFormType>>;
  openFormModal: boolean;
  handleFormModal: Dispatch<SetStateAction<boolean>>;
  handleRetrieveTaskData: Dispatch<SetStateAction<Types.Task>>;
};
