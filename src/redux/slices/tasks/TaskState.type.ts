import { Types } from '../../../common';

export type TaskState = {
  status: 'success' | 'loading' | 'failed';
  errorMessage: string | null;
  tasks: Types.Task[];
};
