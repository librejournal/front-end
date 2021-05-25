import React from "react";

import { Grid, Typography, Button } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

const useStyles = () => ({
  accountContainer: {
    width: "max(25vw,250px)",
    padding: "2vh 2vw",
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center",
    border: "2px solid #1687a7",
    alignItems: "center",
    maxWidth: "500px",
    margin: "2vh",
  },
});

const AccountDetails = ({ classes }) => (
  <Grid item md={6} xs={12} className={classes.accountContainer}>
    <Typography color="primary" variant="h4">
      Account Info
    </Typography>
    <Grid item xs={12}>
      <Typography color="primary" variant="h6">
        Followers:
      </Typography>
      <Typography variant="subtitle1">To be filled</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography color="primary" variant="h6">
        Following:
      </Typography>
      <Typography variant="subtitle1">To be filled</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography color="primary" variant="h6">
        Following Tags:
      </Typography>
      <Typography variant="subtitle1">To be filled</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography color="primary" variant="h6">
        Following Locations:
      </Typography>
      <Typography variant="subtitle1">To be filled</Typography>
    </Grid>
  </Grid>
);

export default compose(withStyles(useStyles))(AccountDetails);
