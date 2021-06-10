import React from "react";

import { Typography, Breadcrumbs } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { compose } from "recompose";
import LoginButton from "./loginbutton";

const useStyles = () => ({
  headerMenuTextElements: {
    cursor: "pointer",
  },
  breadcrums: {
    "& li": {
      "&:hover": {
        background: "black",
        padding: "0.5vh 0.5vw",
        borderRadius: "20px",
      },
      transition: "all 0.8s ease-out",
    },
  },
});

const MyBreadcrumbs = ({ classes, loggedUser }) => (
  <Breadcrumbs
    separator=""
    aria-label="breadcrumb"
    className={classes.breadcrums}
  >
    <Link to="/" style={{ textDecoration: "none" }}>
      <Typography className={classes.headerMenuTextElements}>Home</Typography>
    </Link>
    <Link to="about" style={{ textDecoration: "none" }}>
      <Typography className={classes.headerMenuTextElements}>About</Typography>
    </Link>
    {loggedUser.token ? (
      <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
        <Typography className={classes.headerMenuTextElements}>
          Dashboard
        </Typography>
      </Link>
    ) : null}
    <LoginButton />
  </Breadcrumbs>
);

export default compose(withStyles(useStyles))(MyBreadcrumbs);
