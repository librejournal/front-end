import React, { useEffect, useState } from "react";

import { Grid, Typography, Button } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";

import { connect } from "react-redux";
import {
  mapStateToAccount,
  mapDispatchToAccount,
} from "../../redux/mapFunctions";

import { withWindowConsumer } from "../../contexts/window/consumer";
import Swal from "sweetalert2";

const useStyles = () => ({
  userPageContainer: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  arrowActive: {
    fill: "#1687a7",
  },
  arrowDeactive: {
    fill: "white",
  },
  bottomButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  userContainer: {
    padding: "2vh 2vw",
    minHeight: "60vh",
    minWidth: "30rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center",
    border: "2px solid #1687a7",
    alignItems: "center",
    maxWidth: "450px",
    margin: "2vh",
    background: "white",
    "-webkit-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "-moz-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
  },
});

const UserInfo = ({ classes, loggedUser, userInfo, onInfoUser }) => {
  const [user, setUser] = useState(null);
  const [followStatus, setFollowStatus] = useState(false);

  const getUserInfo = async (id) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/profiles/${id}/detail`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        checkFollowStatus(response.data);
      })
      .catch((err) => console.log(err));
  };

  const checkFollowStatus = (user) => {
    if ((user !== undefined) & (loggedUser.userInfo !== undefined)) {
      loggedUser.userInfo.followed_authors.map((el) =>
        el.id === user.id ? setFollowStatus(true) : null
      );
    }
  };

  const myUserInfo = async () => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/profiles/self-detail`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        const info = response.data;
        onInfoUser(info);
      })
      .catch((err) => console.log(err));
  };

  const followUser = async (id) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/profiles/follow`;
    await axios
      .patch(
        url,
        { profile_id_list: [id] },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Follow successfull",
          showConfirmButton: false,
          timer: 2000,
        });
        if (userInfo.user !== undefined) {
          getUserInfo(userInfo.user.profile_id);
          myUserInfo();
        } else {
          getUserInfo(userInfo.profile_id);
          myUserInfo();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (userInfo.user !== undefined) {
      getUserInfo(userInfo.user.profile_id);
    } else {
      getUserInfo(userInfo.profile_id);
    }
    checkFollowStatus();
  }, []);

  const myData = userInfo.user !== undefined ? userInfo.user : userInfo;

  return (
    <Grid
      container
      justify="space-evenly"
      alignItems="center"
      className={classes.userPageContainer}
    >
      {user ? (
        <Grid item md={6} xs={12} className={classes.userContainer}>
          <Typography color="primary" variant="h4">
            User Info
          </Typography>
          <Grid item xs={12}>
            <Typography color="primary" variant="h6">
              Username:
            </Typography>
            <Typography variant="h6">{myData.username}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary" variant="h6">
              Followed Authors:
            </Typography>
            {user.followed_authors.length ? (
              <>
                <Typography variant="subtitle1">
                  {user.followed_authors.length} authors
                </Typography>
              </>
            ) : (
              "None"
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary" variant="h6">
              Followed Tags:
            </Typography>

            {user.followed_tags.length ? (
              <>
                <Typography variant="subtitle1">
                  {user.followed_tags.length} tags
                </Typography>
              </>
            ) : (
              "None"
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary" variant="h6">
              Followed Locations:
            </Typography>
            {user.followed_locations.length ? (
              <>
                <Typography variant="subtitle1">
                  {user.followed_locations.length} locations
                </Typography>
              </>
            ) : (
              "None"
            )}
          </Grid>
        </Grid>
      ) : null}
      <Button
        variant="contained"
        color="primary"
        onClick={() => followUser(myData.profile_id)}
        disabled={followStatus}
      >
        {followStatus ? "FOLLOWED" : "FOLLOW USER"}
      </Button>
    </Grid>
  );
};

export default compose(
  withWindowConsumer,
  connect(mapStateToAccount, mapDispatchToAccount),
  withStyles(useStyles)
)(UserInfo);
