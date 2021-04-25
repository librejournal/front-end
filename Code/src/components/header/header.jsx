import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { ReactComponent as Logo } from "../../assets/logo/default-monochrome-white.svg";

import { headerText } from "../../constants";

const useStyles = () => ({
  headerGrid: {
    height: "8vh",
    backgroundColor: "#1687a7",
    display: "flex",
    justifyContent: "space-between",
    padding: "2vh 5vw",
    alignItems: "center",
  },
  headerMenuTexts: {
    display: "flex",
    justifyContent: "space-between",
    color: "white",
  },
  headerMenuTextElements: {
    cursor: "pointer",
  },
});

const Header = ({ classes }) => {
  return (
    <Grid containter className={classes.headerGrid}>
      <Grid item xs={2}>
        <Logo />
      </Grid>
      <Grid item xs={6} className={classes.headerMenuTexts}>
        {headerText.menuItems.map((el) => (
          <Typography className={classes.headerMenuTextElements}>
            {el}
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Header);
