import React from 'react';
import TaskItem from './TaskItem';
import { List, Typography } from '@mui/material';

const TaskList = ({ tasks, onIncrementProgress, title, showProgressBar }) => {
  return (
    <>
      <Typography variant="h6" style={{ marginTop: 20 }}>{title}</Typography>
      <List>
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onIncrement={onIncrementProgress} 
            showIncrement={task.progress < 100} 
            showProgressBar={showProgressBar}
          />
        ))}
      </List>
    </>
  );
};

export default TaskList;
