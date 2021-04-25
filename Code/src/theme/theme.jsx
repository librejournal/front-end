import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  typography: {
    body1: {
      fontFamily: "inherit",
      fontWeight: 400,
      fontSize: 24,
      color: "white",
    },
  },
});

export default Theme;
