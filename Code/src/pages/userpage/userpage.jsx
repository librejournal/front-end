import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { UserInfo } from "../../components";

const useStyles = () => ({
  accountpageContainer: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const UserPage = ({ classes, location }) => (
  <Grid container className={classes.accountpageContainer}>
    <UserInfo userInfo={location.state.user} />
  </Grid>
);

export default withStyles(useStyles)(UserPage);
