import React from "react";

import { Typography, Menu, MenuItem, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { compose } from "recompose";
import axios from "axios";

const useStyles = () => ({
  notificationItem: {
    borderTop: "0.2px solid lightgray",
    borderBottom: "0.2px solid lightgray",
    padding: "2%",
    width: "100%",
  },
  notificationUnreadItem: {
    borderTop: "0.2px solid lightgray",
    borderBottom: "0.2px solid lightgray",
    backgroundColor: "#ECECEC",
    padding: "2%",
    width: "100%",
  },
});

const DesktopNotificationMenu = ({
  classes,
  loggedUser,
  anchorEl,
  handleClose,
  notificationState,
  getStoryNotifications,
  getCommentNotifications,
}) => {
  const changeNotifItemStatus = async (id) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/notifications/bulk-mark-as`;

    await axios
      .post(
        url,
        { id_list: [id], action: "read" },
        {
          headers: {
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then((resp) => {
        getStoryNotifications(loggedUser.token);
        getCommentNotifications(loggedUser.token);
      })
      .catch((err) => console.log(err));

    handleClose();
  };

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      style={{ minWidth: "40%" }}
    >
      {notificationState ? (
        notificationState.map((el) =>
          typeof el !== "undefined" ? (
            <MenuItem key={el.notification.id} style={{ maxWidth: "450px" }}>
              <Link
                to={`/stories/${el.message.story_pk}`}
                style={{ textDecoration: "none", width: "100%" }}
                onClick={() => changeNotifItemStatus(el.notification.id)}
              >
                <Grid
                  container
                  className={
                    el.notification.is_read
                      ? classes.notificationItem
                      : classes.notificationUnreadItem
                  }
                >
                  <Grid item xs={12}>
                    <Typography color="primary" variant="subtitle1">
                      {el.message.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="error" variant="subtitle2">
                      {el.message.text}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      color="error"
                      variant="subtitle2"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {el.notification.created.split("T")[0]}&nbsp;&nbsp;&nbsp;
                      {el.notification.created.split("T")[1].split(".")[0]}
                    </Typography>
                  </Grid>
                </Grid>
              </Link>
            </MenuItem>
          ) : null
        )
      ) : (
        <MenuItem>
          <Grid container className={classes.notificationItem}>
            <Grid item xs={12}>
              <Typography color="primary" variant="subtitle1">
                There is no notification present
              </Typography>
            </Grid>
          </Grid>
        </MenuItem>
      )}
    </Menu>
  );
};

export default compose(withStyles(useStyles))(DesktopNotificationMenu);
