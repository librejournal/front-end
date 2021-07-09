import React from "react";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";
import { connect } from "react-redux";
import { mapStateToStoriesPage } from "../../redux/mapFunctions";
import UpArrow from "../../assets/logo/UpArrow.svg";
import DownArrow from "../../assets/logo/DownArrow.svg";
import { withWindowConsumer } from "../../contexts/window/consumer";
import CommentButton from "../../assets/logo/CommentButton.svg";

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
    cursor: "pointer",
    "& img": {
      height: "2rem",
    },
  },
});

const StoryLikeDislike = ({
  classes,
  loggedUser,
  storyInfo,
  limit,
  width,
  focusStory,
}) => {
  const likeStory = async () => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/${storyInfo.id}/like`;
    await axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(
        () =>
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You have liked a story",
            showConfirmButton: false,
            timer: 2000,
          }),
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      )
      .catch((err) => console.log(err));
  };

  const dislikeStory = async () => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/${storyInfo.id}/dislike`;
    await axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then((resp) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have disliked a story",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const scrollTo = () => {
    setTimeout(() => {
      document
        .getElementById("comment-button")
        .scrollIntoView({ behavior: "smooth" });
    }, 2);
  };

  return (
    <Grid item xs={12} className={classes.storyLikeDislikeGrid}>
      {loggedUser.token &&
      loggedUser.profile_id !== storyInfo.author.user.profile_id ? (
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
            onClick={() => likeStory()}
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
            <Typography
              variant={limit > width ? "subtitle2" : "subtitle1"}
              color="primary"
            >
              &nbsp;&nbsp;{storyInfo.like_count}
            </Typography>
          </Grid>
          <Grid
            item
            md={2}
            xs={4}
            className={classes.storyItemIcon}
            onClick={() => dislikeStory()}
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
            <Typography
              variant={limit > width ? "subtitle2" : "subtitle1"}
              color="primary"
            >
              &nbsp;&nbsp;{storyInfo.dislike_count}
            </Typography>
          </Grid>
          <Grid
            item
            md={2}
            xs={4}
            className={classes.storyItemIcon}
            onClick={scrollTo}
          >
            <img src={CommentButton} alt="CommentButton" />
            <Typography
              variant={limit > width ? "subtitle2" : "subtitle1"}
              color="primary"
            >
              Comment
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
