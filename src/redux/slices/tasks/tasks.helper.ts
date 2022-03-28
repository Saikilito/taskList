import moment from 'moment';

// Helpers
import { Types, CONSTANT } from '../../../common';

// To code
const { dateFormatComplete } = CONSTANT.general.dates;
const { status: StatusTask } = CONSTANT.app.task;

export const reCalculateStatus = (tasks: Types.Task[]) => {
  return tasks.map((task) => {
    const { createdAt, expiration } = task;

    const cCreateAt = moment(createdAt, dateFormatComplete);
    const cExpiration = moment(expiration, dateFormatComplete);

    const now = moment();
    const diffIntoMinutes = cCreateAt.diff(cExpiration, 'minutes');
    const partialTime = diffIntoMinutes / 4;
    const actualTime = now.diff(cExpiration);

    /**
     * 1 and 2 partial in time, how pending
     * 3 partial in time, how little time
     * 4 partial in time over
     */

    const THREE = 3;
    const FOUR = 4;

    let cStatus;
    if (actualTime >= partialTime * FOUR) {
      cStatus = StatusTask.timeOver;
    } else if (actualTime >= partialTime * THREE) {
      cStatus = StatusTask.urgently;
    } else {
      cStatus = StatusTask.pending;
    }

    return {
      ...task,
      status: cStatus,
    };
  });
};
