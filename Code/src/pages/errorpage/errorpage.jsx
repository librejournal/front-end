import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = () => ({
  errorpageContainer: {
    height: "80vh",
  },
});

const ErrorPage = ({ classes }) => (
  <Grid
    container
    alignContent="center"
    justify="center"
    className={classes.errorpageContainer}
  >
    Error, page does not exists
  </Grid>
);

export default withStyles(useStyles)(ErrorPage);
