import { ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

// My Types
import { Types } from '../../common';

export type SelectComponentType = {
  name: string;
  externalValue: Types.TaskStatusType;
  selectTitle: string;
  options: any[];
  externalHandleChange: (
    event: SelectChangeEvent<Types.TaskStatusType>,
    child: ReactNode
  ) => void;
};
