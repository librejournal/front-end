import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  palette: {
    primary: { main: "#1687a7" },
    secondary: { main: "#fff" },
    error: { main: "#000" },
    third: { main: "#000" },
  },

  typography: {
    body1: {
      fontFamily: "inherit",
      fontWeight: 400,
      fontSize: "1.25rem",
      color: "white",
    },
    h1: {
      fontFamily: "inherit",
      fontWeight: 400,
      fontSize: "4.5rem",
    },
    h2: {
      fontFamily: "inherit",
      fontWeight: 400,
      fontSize: "3.5rem",
    },
    h3: {
      fontFamily: "inherit",
      fontWeight: 400,
      fontSize: "2.5rem",
    },
    h4: {
      fontFamily: "inherit",
      fontWeight: 400,
      fontSize: "2rem",
    },
    h5: {
      fontFamily: "inherit",
      fontWeight: 400,
      fontSize: "1.5rem",
    },
    h6: {
      fontFamily: "inherit",
      fontWeight: 400,
      fontSize: "1.25rem",
    },
    subtitle1: {
      fontFamily: "inherit",
      fontWeight: 400,
      fontSize: "1rem",
    },
    subtitle2: {
      fontFamily: "inherit",
      fontWeight: 400,
      fontSize: "0.75rem",
    },
  },
});

export default Theme;
