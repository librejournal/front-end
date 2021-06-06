import React, { useEffect, useState } from "react";
import { Grid, Typography, Input, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";
import { connect } from "react-redux";
import { mapStateToStoriesPage } from "../../redux/mapFunctions";
import UpArrow from "../../assets/logo/UpArrow.svg";
import DownArrow from "../../assets/logo/DownArrow.svg";
import { withWindowConsumer } from "../../contexts/window/consumer";
import _ from "underscore";
import Swal from "sweetalert2";

const useStyles = () => ({
  storyLikeDislikeGrid: {
    borderBottom: "2px solid gray",
    background: "white",
  },
  storyItemIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px dotted lightgray",
    "& img": {
      height: "2rem",
    },
  },
});

const StoryLikeDislike = ({ classes, loggedUser, storyInfo, limit, width }) => {
  return (
    <Grid item xs={12} className={classes.storyLikeDislikeGrid}>
      {loggedUser.token ? (
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "1rem 0",
          }}
        >
          <Grid
            item
            md={2}
            xs={4}
            className={classes.storyItemIcon}
            onClick={() => {}}
          >
            <img
              src={UpArrow}
              alt="UpArrow"
              style={
                !storyInfo.can_user_like
                  ? {
                      filter: "grayscale(100%)",
                    }
                  : null
              }
            />
            <Typography
              variant={limit > width ? "subtitle2" : "subtitle1"}
              color="primary"
            >
              Like
              {!storyInfo.can_user_like ? "d" : null}
            </Typography>
          </Grid>

          <Grid
            item
            md={2}
            xs={4}
            className={classes.storyItemIcon}
            onClick={() => {}}
          >
            <img
              src={DownArrow}
              alt="DownArrow"
              style={
                !storyInfo.can_user_dislike
                  ? {
                      filter: "grayscale(100%)",
                    }
                  : null
              }
            />
            <Typography
              variant={limit > width ? "subtitle2" : "subtitle1"}
              color="primary"
            >
              Dislike
              {!storyInfo.can_user_dislike ? "d" : null}
            </Typography>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default compose(
  withWindowConsumer,
  connect(mapStateToStoriesPage),
  withStyles(useStyles)
)(StoryLikeDislike);
