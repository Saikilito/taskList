import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Helpers
import { Types, CONSTANT } from '../../common';
import { tasksSlices } from '../../redux/slices';

// My Components
import { TaskPage } from './TaskPage';

//To Code
const { formStatus, status: TaskStatus } = CONSTANT.app.task;
const initStatusFormState = formStatus.add;

const initialValues = {
  id: '',
  task: '',
  expiration: new Date(),
  status: TaskStatus.pending,
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
