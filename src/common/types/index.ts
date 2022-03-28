export enum TaskStatusType {
  Pending = 'Pending',
  Urgently = 'Urgently',
  TimeOver = 'TimeOver',
  Finished = 'Finished',
}

export type Task = {
  id: string;
  expiration: string | Object | Date;
  status: TaskStatusType;
  taskDescription: string;
  createdAt: string;
};

export type Environment = 'local' | 'test' | 'development' | 'production';

export enum StatusFormType {
  add = 'add',
  edit = 'edit',
}
