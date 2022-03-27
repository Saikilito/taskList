import { TaskStatusType, StatusFormType } from '../types';

const CONSTANT = {
  app: {
    task: {
      status: {
        pending: TaskStatusType.Pending,
        urgently: TaskStatusType.Urgently,
        timeOver: TaskStatusType.TimeOver,
        finished: TaskStatusType.Finished,
      },
      formStatus: {
        add: StatusFormType.add,
        edit: StatusFormType.edit,
      },
    },
  },
  general: {
    dates: {
      dateFormat: 'DD/MMM/YYYY',
      dateFormatComplete: 'DD/MMM/YYYY hh:mm',
    },
  },
  uri: {
    api: {
      test: 'http://localhost:3003',
      local: 'http://localhost:3003',
      production: 'http://localhost:3003',
      development: 'http://localhost:3003',
    },
  },
};

export { CONSTANT };
