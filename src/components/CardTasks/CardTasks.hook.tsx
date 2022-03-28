import React, { useState } from 'react';
import { SelectedTaskMethodPropsType } from './Card.type';

export const useClearSelectedTask = () => {
  const [taskIds, setTaskId] = useState([]);

  const addTaskId = ({ taskId }: SelectedTaskMethodPropsType) => {
    const noRepeatTaskId = new Set(taskIds);

    if (!noRepeatTaskId.has(taskId)) {
      noRepeatTaskId.add(taskId);
      setTaskId((currentTaskId) => {
        return currentTaskId.concat(taskId);
      });
    }
  };

  const removeTaskId = ({ taskId }: SelectedTaskMethodPropsType) => {
    setTaskId((taskIds) => {
      return taskIds.filter((currentTaskId) => currentTaskId !== taskId);
    });
  };

  return { taskIds, addTaskId, removeTaskId };
};
