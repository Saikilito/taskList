import moment from 'moment';

import { CONSTANT } from '../constants';
import { v4 as uuidv4 } from 'uuid';

const { dateFormatComplete } = CONSTANT.general.dates;
const { status: StatusTask } = CONSTANT.app.task;

export const createGenericTaskInstance = ({
  id = uuidv4(),
  taskDescription = '',
  expiration = moment().add(10, 'minutes').format(dateFormatComplete),
  status = StatusTask.pending,
  createdAt = moment().format(dateFormatComplete),
}) => {
  return {
    id,
    status,
    taskDescription,
    expiration,
    createdAt,
  };
};
