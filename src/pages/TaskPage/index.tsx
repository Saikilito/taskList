import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Helpers
import { Types, CONSTANT } from '../../common';
import { tasksSlices } from '../../redux/slices';

// My Components
import { TaskPage } from './TaskPage';

//To Code
const { formStatus, status: TaskStatus } = CONSTANT.app.task;
const { dateFormatComplete } = CONSTANT.general.dates;
const initStatusFormState = formStatus.add;

const TEN = 10;
const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const nowDate = new Date().getTime();
// We add ten minutes to the default date
const nowPlusTenDate = new Date(nowDate + TEN * ONE_MINUTE);

const initialValues = {
  id: '',
  taskDescription: '',
  expiration: nowPlusTenDate,
  status: TaskStatus.pending,
  createdAt: moment().format(dateFormatComplete),
} as Types.Task;

export const TasksPage = () => {
  // Local State
  const [statusForm, setStatusForm] = useState(initStatusFormState);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [retrieveTask, setRetrieveTask] = useState(initialValues);

  // Redux Reducers
  const { selectTask, getTasks, deleteTask } = tasksSlices;
  // Redux State
  const tasksState = useSelector(selectTask);
  const dispatch = useDispatch();
  // Tasks
  const { tasks } = tasksState;

  //Handlers
  const handleRetrieveTaskData = (task: Types.Task) => {
    setRetrieveTask(task);
  };

  // Use for render task to init page
  useEffect(() => {
    dispatch(getTasks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TaskPage
      tasks={tasks}
      deleteTask={deleteTask}
      statusForm={statusForm}
      formInitValue={retrieveTask}
      handleStatusForm={setStatusForm}
      openFormModal={openFormModal}
      handleFormModal={setOpenFormModal}
      handleRetrieveTaskData={handleRetrieveTaskData}
    />
  );
};
