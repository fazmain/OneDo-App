import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0F1014", // Set your dark mode default background color
      paper: "#0F1014", // Set your dark mode paper color
    },
    customColor: {
      main: "#CEA5FB",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#CEA5FB", // Replace with your desired focus label color
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px", // Rounded edges for the TextField
            "&.Mui-focused fieldset": {
              borderColor: "#CEA5FB", // Replace with your desired focus border color
            },
            "&:hover fieldset": {
              borderColor: "#CEA5FB", // Replace with your desired hover border color
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#aa74e8", // Your custom color
          "&:hover": {
            backgroundColor: "#854fc6", // A slightly darker color for the hover state
          },
        },
      },
    },
    // Style overrides for LinearProgress
    MuiLinearProgress: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#FFFFFF", // Use for the bar color
        },
        barColorPrimary: {
          backgroundColor: "#aa74e8", // Slightly darker for the progress indicator
        },
      },
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
