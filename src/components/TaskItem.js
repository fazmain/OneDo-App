import React from "react";
import {
  ListItem,
  ListItemText,
  Button,
  LinearProgress,
  Grid,
  Chip,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const priorityColors = {
  URGENT: "#FA7970",
  "CAN WAIT": "rgba(250, 163, 86)",
  CHILL: "#7DE38B",
};

const priorityBackgroundColors = {
  URGENT: "rgba(250, 121, 112, 0.2)", // Red background with opacity
  "CAN WAIT": "rgba(250, 163, 86, 0.2)", // Yellow background with opacity
  CHILL: "rgba(125, 227, 139, 0.2)", // Green background with opacity
};

const TaskItem = ({ task, onIncrement, showIncrement, showProgressBar }) => {
  const backgroundColor =
    priorityBackgroundColors[task.priority] || "transparent";
  const isCompleted = task.progress === 100;

  const outlinedStyle = {
    border: "1px solid",
    borderColor: "currentColor",
    borderRadius: "10px",
    color: "black",
    "&:hover": {
      borderColor: "#aa74e8",
      backgroundColor: "#aa74e8",
    },
  };

  return (
    <ListItem
      sx={{
        background: "#1D1C23",
        borderRadius: "20px",
        marginTop: "10px",
        marginBottom: "10px",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <ListItemText
              primary={
                <span
                  style={{
                    textDecoration: isCompleted ? "line-through" : "none",
                    fontWeight: "bold",
                    fontSize: "25px" // added fontSize property
                  }}
                >
                  {task.title}
                </span>
              }
              secondary={`Created: ${task.createdAt.toLocaleString()}`}
            />
            <Chip
              label={task.priority}
              style={{
                backgroundColor: backgroundColor,
                color: priorityColors[task.priority],
                fontWeight: "bold",
                padding: "15px 8px",
                margin: "15px 0px",
              }}
              size="small"
            />
          </Grid>
          {showIncrement ? (
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => onIncrement(task.id)}
                sx={{ ...outlinedStyle, padding: "10px", borderRadius: "50px" }}
                size="large"
              >
                <AddIcon style={{ color: "white" }} />
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Chip label={`Time taken: ${task.timeTaken}`} />
            </Grid>
          )}
        </Grid>
      </Box>
      {showProgressBar && (<LinearProgress
        variant="determinate"
        value={task.progress}
        sx={{
          width: "100%",
          marginTop: "8px",
          height: "7px",
          borderRadius: "50px",
          marginBottom: "15px"
        }}
      />)}
    </ListItem>
  );
};

export default TaskItem;
