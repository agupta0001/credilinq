import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-active": {
            color: "rgb(236, 0, 85)",
          },
          "&.Mui-completed": {
            color: "rgb(46, 125, 50)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
  },
});

export default theme;
