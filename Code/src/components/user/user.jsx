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
  accountpageContainer: {
    overflowY: "auto",
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

const UserInfo = ({ classes, loggedUser, userInfo }) => {
  const [user, setUser] = useState(null);
  const [selfUser, setSelfUser] = useState(null);
  const getUserInfo = async (id) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/profile/${id}/detail`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  };

  const followUser = async (id) => {
    console.log(id);
    const url = `${process.env.REACT_APP_DB_HOST}/api/profile/follow`;
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
      .then(
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Follow successfull",
          showConfirmButton: false,
          timer: 2000,
        })
      )
      .catch((err) => console.log(err));
  };

  const selfUserInfo = async (id) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/profile/self-detail`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => setSelfUser(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserInfo(userInfo.user.profile_id);
    selfUserInfo();
  }, []);

  console.log(userInfo);
  return (
    <Grid
      container
      justify="space-evenly"
      alignItems="center"
      className={classes.accountpageContainer}
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
            <Typography color="primary" variant="h6">
              {userInfo.user.username}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary" variant="h6">
              Followed Authors:
            </Typography>
            <Typography color="primary" variant="h6">
              {user.followed_authors.map((el) => el)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary" variant="h6">
              Followed Tags:
            </Typography>
            <Typography color="primary" variant="h6">
              {user.followed_tags.map((el) => el)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary" variant="h6">
              Followed Locations:
            </Typography>
            <Typography color="primary" variant="h6">
              {user.followed_locations.map((el) => el)}
            </Typography>
          </Grid>
        </Grid>
      ) : null}
      <Button
        variant="contained"
        color="primary"
        onClick={() => followUser(userInfo.user.profile_id)}
      >
        FOLLOW USER{" "}
      </Button>
    </Grid>
  );
};

export default compose(
  withWindowConsumer,
  connect(mapStateToAccount, mapDispatchToAccount),
  withStyles(useStyles)
)(UserInfo);
