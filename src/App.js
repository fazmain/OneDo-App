import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import Navbar from "./components/navbar";
import {
  TextField,
  Button,
  Container,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Typography,
} from "@mui/material";
import { differenceInMinutes } from "date-fns";

function App() {
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = localStorage.getItem("completedTasks");
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
  });

  const resetOngoingTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  const resetCompletedTasks = () => {
    setCompletedTasks([]);
    localStorage.removeItem("completedTasks");
  };

  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("");
  const [visibleCompletedTasks, setVisibleCompletedTasks] = useState(5);

  const renderPriorityOption = (label, color, bgColor) => (
    <MenuItem value={label}>
      <Chip
        label={label}
        style={{ backgroundColor: bgColor, color: color, fontWeight: "bold" }}
      />
    </MenuItem>
  );

  const loadMoreCompletedTasks = () => {
    setVisibleCompletedTasks((prevVisible) => prevVisible + 5);
  };

  const addTask = () => {
    if (!newTask.trim() || !priority) return;

    const taskToAdd = {
      id: Date.now(),
      title: newTask,
      createdAt: new Date(),
      progress: 0,
      priority,
    };

    setTasks([...tasks, taskToAdd]);
    setNewTask("");
    setPriority("");
  };

  const incrementProgress = (taskId) => {
    setTasks(
      tasks
        .map((task) => {
          if (task.id === taskId) {
            const newProgress = Math.min(task.progress + 10, 100);
            if (newProgress === 100) {
              const minutesTaken = differenceInMinutes(
                new Date(),
                task.createdAt
              );
              const timeTaken =
                minutesTaken > 0 ? `${minutesTaken} min` : "Less than a minute";
              setCompletedTasks([
                ...completedTasks,
                { ...task, progress: newProgress, timeTaken },
              ]);
              return null;
            }
            return { ...task, progress: newProgress };
          }
          return task;
        })
        .filter((task) => task !== null)
    );
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  return (
    <>
      <Container maxWidth="sm">
        <Navbar />
        <Box
          sx={{
            background: "#1D1C23",
            padding: "1px 30px 30px 30px",
            marginBottom: "40px",
            borderRadius: "20px",
            marginTop: "10px",
            flexDirection: "column",
          }}
        >
          <Box my={2} sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <TextField
              label="New Task"
              variant="outlined"
              color="primary"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              margin="normal"
              style={{ width: "100%" }}
            />
            <FormControl
              margin="normal"
              sx={{ width: { xs: "50%", sm: "25%" } }}
            >
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                value={priority}
                label="Priority"
                onChange={(e) => setPriority(e.target.value)}
                style={{ borderRadius: "10px" }}
              >
                {renderPriorityOption(
                  "URGENT",
                  "#fa7970",
                  "rgba(250, 121, 112, 0.2)"
                )}
                {renderPriorityOption(
                  "CAN WAIT",
                  "#faa356",
                  "rgba(250, 163, 86, 0.2)"
                )}
                {renderPriorityOption(
                  "CHILL",
                  "#7ce38b",
                  "rgba(125, 227, 139, 0.2)"
                )}
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={addTask}
            fullWidth
            style={{
              borderRadius: "10px",
              fontWeight: "bold",
              color: "white",
              height: "50px",
            }}
          >
            Add Task
          </Button>
        </Box>

        {tasks.length === 0 && completedTasks.length === 0 && (
          <>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ textAlign: "center" }}
            >
              No tasks yet! Add a task to get started.
            </Typography>
          </>
        )}

        {tasks.length > 0 && (
          <>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ marginTop: 4, textAlign: "center" }}
            >
              Ongoing Tasks
            </Typography>
            <TaskList
              tasks={tasks}
              onIncrementProgress={incrementProgress}
              showProgressBar={true}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={resetOngoingTasks}
              sx={{ marginBottom: 1 }}
              style={{
                fontWeight: "bold",
                color: "white",
                borderRadius: "10px",
                fontSize: "11px",
              }}
            >
              Clear Tasks
            </Button>
          </>
        )}

        {completedTasks.length > 0 && (
          <>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ marginTop: 4, textAlign: "center" }}
            >
              Completed Tasks
            </Typography>
            <TaskList
              tasks={completedTasks.slice(0, visibleCompletedTasks)}
              showProgressBar={false}
            />
            <Button
              variant="contained"
              onClick={resetCompletedTasks}
              sx={{ marginBottom: 4 }}
              style={{
                fontWeight: "bold",
                color: "white",
                borderRadius: "10px",
                fontSize: "11px",
              }}
            >
              Clear Tasks
            </Button>
            {visibleCompletedTasks < completedTasks.length && (
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
              >
                <Button
                  onClick={loadMoreCompletedTasks}
                  variant="contained"
                  color="primary"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  Load More
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default App;
