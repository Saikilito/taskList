import React, { useState, useEffect } from 'react';

// Helpers
import { mappingObjectIcon } from './Card.config';
import { CONSTANT } from '../../common';

// My Hooks
import { useClearSelectedTask } from './CardTasks.hook';

// My Component
import { CardComponent } from './Card';
import { CardHeaderButtons } from './CardHeaderButtons';

// To Code
const { status: StatusTask } = CONSTANT.app.task;

export const CardTasks = ({
  tasks,
  taskSelected,
  taskUnselected,
  handleFormModal,
  handleDeleteTask,
  handleRetrieveTaskData,
  orderTasksByExpiration,
  orderTasksByCratedAt,
  orderTasksByStatus,
  handleStatusForm,
}) => {
  // Local State
  const [enrichedTasks, setEnrichedTasks] = useState([]);
  const [checkReset, setCheckReset] = useState(false);

  // My Hooks
  const { taskIds, addTaskId, removeTaskId } = useClearSelectedTask();

  // Handles
  const handleTasks = (tasks) => {
    const newTasks = tasks.map((task) => {
      const newStatus = mappingObjectIcon[task.status];

      return {
        ...task,
        status: newStatus,
        oldStatus: task.status,
      };
    });

    setEnrichedTasks(newTasks);
  };

  useEffect(() => {
    handleTasks(tasks);
  }, [tasks]);

  const mappingCardColorByStatus = {
    [StatusTask.pending]: '#81d4fa',
    [StatusTask.urgently]: '#ffcc80',
    [StatusTask.timeOver]: '#ef9a9a',
    [StatusTask.finished]: '#80cbc4',
  };

  return (
    <div style={{ width: '100%' }}>
      <CardHeaderButtons
        taskIds={taskIds}
        handleCheckReset={setCheckReset}
        handleDeleteTask={handleDeleteTask}
        removeTaskId={removeTaskId}
        orderTasksByExpiration={orderTasksByExpiration}
        orderTasksByCratedAt={orderTasksByCratedAt}
        orderTasksByStatus={orderTasksByStatus}
      />
      {enrichedTasks.map((task, index) => (
        <CardComponent
          key={index}
          task={task}
          handleFormModal={handleFormModal}
          handleStatusForm={handleStatusForm}
          color={mappingCardColorByStatus[task.oldStatus]}
          handleRetrieveTaskData={handleRetrieveTaskData}
          addTaskId={addTaskId}
          checkReset={checkReset}
          removeTaskId={removeTaskId}
          taskSelected={taskSelected}
          taskUnselected={taskUnselected}
        />
      ))}
    </div>
  );
};
