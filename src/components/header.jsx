import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { ReactComponent as Logo } from "../assets/logo/default-monochrome-white.svg";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { withWindowConsumer } from "../contexts/window/consumer";
import { connect } from "react-redux";
import { mapStateToPropsHeader } from "../redux/mapFunctions";
import MenuIcon from "@material-ui/icons/Menu";
import MyBreadcrumbs from "./header/breadcrumbs";
import MobileMenu from "./header/mobileMenu";
import _ from "underscore";

const useStyles = () => ({
  headerGrid: {
    height: "8vh",
    backgroundColor: "#1687a7",
    display: "flex",
    justifyContent: "space-around",
    padding: "2vh 0",
    alignItems: "center",
    "-webkit-box-shadow": "inset 0px -0.1vh 2px 0px rgba(0,0,0,0.8)",
    "-moz-box-shadow": "inset 0px -0.1vh 2px 0px rgba(0,0,0,0.8)",
    "box-shadow": "inset 0px -0.1vh 2px 0px rgba(0,0,0,0.8)",
  },
  headerMenuTexts: {
    display: "flex",
    justifyContent: (props) =>
      props.width < props.limit ? "flex-end" : "space-around",
    color: "white",
    "& svg": {
      fontSize: "2.5rem",
      marginRight: "2vw",
    },
  },
  headerLogo: {
    padding: "1vh 0",
    "& svg": {
      height: "max(6vh,40px)",
    },
  },
});

const Header = ({ notifications, classes, loggedUser, width, limit }) => {
  const [notificationState, setNotificationState] = useState(
    notifications.story && notifications.comments
      ? _.zip(notifications.story, notifications.comments)
      : notifications.story
      ? notifications.story
      : notifications.comments
      ? notifications.length
      : null
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid containter className={classes.headerGrid} id="header">
      <Grid item xs={3} md={2} className={classes.headerLogo}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo />
        </Link>
      </Grid>
      <Grid item md={7} lg={4} className={classes.headerMenuTexts}>
        {width > limit ? (
          <MyBreadcrumbs
            loggedUser={loggedUser}
            notificationState={notificationState}
          />
        ) : (
          <>
            <MenuIcon onClick={handleClick} aria-controls="simple-menu" />
            <MobileMenu
              loggedUser={loggedUser}
              anchorEl={anchorEl}
              handleClose={handleClose}
              notificationState={notificationState}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default compose(
  withWindowConsumer,
  connect(mapStateToPropsHeader),
  withStyles(useStyles)
)(Header);
