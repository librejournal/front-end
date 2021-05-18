import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { ReactComponent as Logo } from "../assets/logo/default-monochrome-white.svg";
import { Link } from "react-router-dom";
import { compose } from "recompose";

import { connect } from "react-redux";
import { mapStateToPropsHeader } from "../redux/mapFunctions";

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
    justifyContent: "space-around",
    color: "white",
  },
  headerMenuTextElements: {
    cursor: "pointer",
  },
  headerLogo: {
    width: "max(15vw,150px)",
    padding: "1vh 0",
    "& svg": {
      maxHeight: "85px",
    },
  },
});

const Header = ({ classes, loggedUser }) => {
  return (
    <Grid containter className={classes.headerGrid}>
      <Grid item xs={2} className={classes.headerLogo}>
        <Logo />
      </Grid>
      <Grid item xs={6} className={classes.headerMenuTexts}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography className={classes.headerMenuTextElements}>
            Home
          </Typography>
        </Link>
        <Link to="/menu2" style={{ textDecoration: "none" }}>
          <Typography className={classes.headerMenuTextElements}>
            Menu#2
          </Typography>
        </Link>
        <Link
          to={loggedUser.token === "" ? "/menu3" : "/createstory"}
          style={{ textDecoration: "none" }}
        >
          <Typography className={classes.headerMenuTextElements}>
            {loggedUser.token === "" ? "Menu#3" : "Create a story"}
          </Typography>
        </Link>
        <Link
          to={loggedUser.token === "" ? "/login" : "/account"}
          style={{ textDecoration: "none" }}
        >
          <Typography className={classes.headerMenuTextElements}>
            {loggedUser.token === "" ? "Login/Register" : "Account"}
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default compose(
  connect(mapStateToPropsHeader),
  withStyles(useStyles)
)(Header);
