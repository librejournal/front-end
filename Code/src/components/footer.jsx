import React from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = () => ({
  footerGrid: {
    height: "8vh",
    backgroundColor: "#1687a7",
    position: "static",
    left: 0,
    bottom: 0,
    width: "100%",
  },
});

const Footer = ({ classes }) => {
  return <Grid containter className={classes.footerGrid} />;
};

export default withStyles(useStyles)(Footer);
