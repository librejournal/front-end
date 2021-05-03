import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Account } from "../../components";

const useStyles = () => ({});

const AccountPage = ({ classes }) => (
  <Grid container>
    <Account />
  </Grid>
);

export default withStyles(useStyles)(AccountPage);
