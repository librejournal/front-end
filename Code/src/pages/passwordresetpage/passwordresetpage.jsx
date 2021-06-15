import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { PasswordReset } from "../../components";

const useStyles = () => ({
  accountpageContainer: {
    minHeight: "80vh",
    padding: "1vh 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const PasswordResetPage = ({ classes }) => (
  <Grid container className={classes.accountpageContainer}>
    <PasswordReset />
  </Grid>
);

export default withStyles(useStyles)(PasswordResetPage);
