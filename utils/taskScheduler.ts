import cron from 'node-cron';

export const scheduleTask = (task: { schedule: string }, callback: () => void) => {
  return cron.schedule(task.schedule, callback);
};

export const cancelTask = (scheduledTask: { stop: () => void }) => {
  scheduledTask.stop();
};
