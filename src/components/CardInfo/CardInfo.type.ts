import { Dispatch, SetStateAction } from 'react';
import { Types } from '../../common/';

export type StatusObjectIconType = {
  [x: string]: Function;
};

export type CardInfoPropsType = {
  rows: Types.Task[];
  handleDeleteRow: (taskId: string) => void;
  handleStatusForm: Dispatch<SetStateAction<Types.StatusFormType>>;
  handleFormModal: Dispatch<SetStateAction<boolean>>;
  handleRetrieveTaskData: (task: Types.Task) => void;
};
