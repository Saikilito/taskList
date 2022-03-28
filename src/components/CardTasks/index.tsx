import React, { useState, useEffect } from 'react';

// Helpers
import { mappingObjectIcon } from './Card.config';

// My Hooks
import { useClearSelectedTask } from './CardTasks.hook';

// My Component
import { CardComponent } from './Card';
import { CardHeaderButtons } from './CardHeaderButtons';

export const CardTasks = ({ tasks, handleDeleteTask }) => {
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
      };
    });

    setEnrichedTasks(newTasks);
  };

  useEffect(() => {
    handleTasks(tasks);
  }, [tasks]);

  return (
    <div style={{ width: '100%' }}>
      <CardHeaderButtons
        taskIds={taskIds}
        handleCheckReset={setCheckReset}
        handleDeleteTask={handleDeleteTask}
        removeTaskId={removeTaskId}
      />
      {enrichedTasks.map((task, index) => (
        <CardComponent
          key={index}
          task={task}
          addTaskId={addTaskId}
          checkReset={checkReset}
          removeTaskId={removeTaskId}
        />
      ))}
    </div>
  );
};
