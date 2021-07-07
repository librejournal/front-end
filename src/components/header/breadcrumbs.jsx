import React, { useState } from "react";

import { Typography, Breadcrumbs, Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { compose } from "recompose";
import LoginButton from "./loginbutton";
import DesktopNotifMenu from "./desktopNotifMenu";

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

const MyBreadcrumbs = ({ classes, loggedUser, notificationState }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  let notifNumber = 0;

  notificationState.map((el) =>
    !el.notification.is_read ? notifNumber++ : null
  );
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Breadcrumbs
      separator=""
      aria-label="breadcrumb"
      className={classes.breadcrums}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          color="secondary"
          className={classes.headerMenuTextElements}
        >
          Home
        </Typography>
      </Link>
      <Link to="about" style={{ textDecoration: "none" }}>
        <Typography
          color="secondary"
          className={classes.headerMenuTextElements}
        >
          About
        </Typography>
      </Link>

      {loggedUser.token &&
      loggedUser.userInfo &&
      loggedUser.userInfo.type === "WRITER" ? (
        <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
          <Typography
            color="secondary"
            className={classes.headerMenuTextElements}
          >
            Dashboard
          </Typography>
        </Link>
      ) : null}

      {loggedUser.token ? (
        <Link style={{ textDecoration: "none" }} onClick={handleClick}>
          {notificationState.length ? (
            <Badge badgeContent={notificationState.length} color="error">
              <Typography
                color="secondary"
                className={classes.headerMenuTextElements}
              >
                Notifications
              </Typography>
            </Badge>
          ) : (
            <Typography
              color="secondary"
              className={classes.headerMenuTextElements}
            >
              Notifications
            </Typography>
          )}
        </Link>
      ) : null}
      {loggedUser.token && loggedUser.has_pending_referral ? (
        <Badge badgeContent={"!"} color="error">
          <LoginButton />
        </Badge>
      ) : (
        <LoginButton />
      )}
      <DesktopNotifMenu
        loggedUser={loggedUser}
        anchorEl={anchorEl}
        handleClose={handleClose}
        notificationState={notificationState}
      />
    </Breadcrumbs>
  );
};

export default compose(withStyles(useStyles))(MyBreadcrumbs);
