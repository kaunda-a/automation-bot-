// ScheduledTasks.tsx
import React, { useState, useEffect } from 'react';
import { scheduleTask, cancelTask } from '../utils/taskScheduler';

const ScheduledTasks = () => {
  const [taskName, setTaskName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [tasks, setTasks] = useState<
    { scheduledTask: any; name: string; schedule: string; id: number }[]
  >([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Schedule new task
    const newTask = { name: taskName, schedule, id: Date.now() };
    const scheduledTask = scheduleTask(newTask, () => {
      console.log(`Running task: ${newTask.name}`);
      // Call web automation function here
    });
    setTasks([...tasks, { ...newTask, scheduledTask }]);
    setTaskName("");
    setSchedule("");
  };

  const handleCancel = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        cancelTask(task.scheduledTask);
        return { ...task, scheduledTask: null };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter schedule (e.g., '0 0 * * *' for daily)"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.schedule}{" "}
            {task.scheduledTask ? (
              <button onClick={() => handleCancel(task.id)}>Cancel</button>
            ) : (
              "Canceled"
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduledTasks;
