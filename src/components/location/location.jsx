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

import { TrendingContainer } from "..";
import runtimeEnv from "@mars/heroku-js-runtime-env";

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
    minWidth: "60rem",
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

const LocationInfo = ({ classes, loggedUser, locationText, onInfoUser }) => {
  const [location, setLocation] = useState(null);
  const [followStatus, setFollowStatus] = useState(false);
  const [stories, setStories] = useState(null);
  const env = runtimeEnv();

  const getLocationInfo = async (id) => {
    const url = `${env.REACT_APP_DB_HOST}/api/stories/locations?search=${locationText}`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        setLocation(response.data[0]);
        checkFollowStatus(response.data);
        getSimilarStories(locationText);
      })
      .catch((err) => console.log(err));
  };

  const checkFollowStatus = (user) => {
    if ((user !== undefined) & (loggedUser.userInfo !== undefined)) {
      loggedUser.userInfo.followed_locations.map((el) =>
        el.province_1 === locationText ? setFollowStatus(true) : null
      );
    }
  };

  const myUserInfo = async () => {
    const url = `${env.REACT_APP_DB_HOST}/api/profiles/self-detail`;
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

  const followLocation = async (id) => {
    const url = `${env.REACT_APP_DB_HOST}/api/profiles/follow`;
    await axios
      .patch(
        url,
        { story_location_id_list: [id] },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Follow successful",
          showConfirmButton: false,
          timer: 2000,
        });

        getLocationInfo(locationText);
        myUserInfo();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => console.log(err));
  };

  const unFollowLocation = async (id) => {
    const url = `${env.REACT_APP_DB_HOST}/api/profiles/unfollow`;
    await axios
      .patch(
        url,
        { story_location_id_list: [id] },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Unfollow successful",
          showConfirmButton: false,
          timer: 2000,
        });

        getLocationInfo(locationText);
        myUserInfo();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => console.log(err));
  };

  const getSimilarStories = async (location) => {
    const url =
      `${env.REACT_APP_DB_HOST}/api/stories/?` +
      (location !== null ? `locations=${location}&` : "");
    await axios
      .get(url)
      .then((response) => {
        setStories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLocationInfo(locationText);
    checkFollowStatus();
  }, []);

  return (
    <Grid
      container
      justify="space-evenly"
      alignItems="center"
      className={classes.userPageContainer}
    >
      {location ? (
        <Grid item md={6} xs={12} className={classes.userContainer}>
          <Typography color="primary" variant="h4">
            Location Info
          </Typography>
          <Grid item xs={12} style={{ display: "flex" }}>
            <Typography color="primary" variant="h6">
              Country:
            </Typography>
            <Typography variant="h6">{location.country}</Typography>
          </Grid>
          <Grid item xs={12} style={{ display: "flex" }}>
            <Typography color="primary" variant="h6">
              City:
            </Typography>
            <Typography variant="h6">{location.city}</Typography>
          </Grid>
          <Grid item xs={12} style={{ display: "flex" }}>
            <Typography color="primary" variant="h6">
              Province:
            </Typography>
            <Typography variant="h6">{location.province_1}</Typography>
          </Grid>
          <Grid item xs={12}>
            {stories ? (
              <TrendingContainer title="Related Stories" data={stories} />
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                followLocation(location.id);
              }}
              disabled={followStatus}
            >
              {followStatus ? "FOLLOWED" : "FOLLOW LOCATION"}
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                unFollowLocation(location.id);
              }}
              disabled={!followStatus}
            >
              {"UNFOLLOW LOCATION"}
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography color="primary" variant="subtitle1">
            You have to login in order to see location information
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default compose(
  withWindowConsumer,
  connect(mapStateToAccount, mapDispatchToAccount),
  withStyles(useStyles)
)(LocationInfo);
