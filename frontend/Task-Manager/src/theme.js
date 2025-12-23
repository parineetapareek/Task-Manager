import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0F4C3A",  // bottle green
    },
    secondary: {
      main: "#EAF7F1",  // soft mint
    },
    background: {
      default: "#FFFFFF",
      paper: "#F4FBF7", // soft card background
    },
    text: {
      primary: "#13322B",
      secondary: "#6E8F84",
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0F4C3A",
          color: "white",
        },
      },
    },
  },
});

export default theme;
