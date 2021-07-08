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
    "-webkit-box-shadow": "inset 0px 0.1vh 2px 0px rgba(0,0,0,0.8)",
    "-moz-box-shadow": "inset 0px 0.1vh 2px 0px rgba(0,0,0,0.8)",
    "box-shadow": "inset 0px 0.1vh 2px 0px rgba(0,0,0,0.8)",
  },
});

const Footer = ({ classes }) => {
  return <Grid className={classes.footerGrid} />;
};

export default withStyles(useStyles)(Footer);
