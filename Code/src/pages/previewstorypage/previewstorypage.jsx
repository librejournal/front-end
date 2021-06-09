import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

import axios from "axios";
import {
  PreviewStory,
  StoryCommments,
  StoryLikeDislike,
} from "../../components";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { mapStateToStoriesPage } from "../../redux/mapFunctions";

const useStyles = () => ({
  storyPreviewContainer: {
    height: "80vh",
    padding: "2vh 3vw",
    maxWidth: "1600px",
    margin: "auto",
  },
  linkGrid: {
    height: "5vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "end",
  },
  storyPreviewInfoGrid: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  storyPreviewInfoContainer: {
    padding: "2vh 10vw",
    borderBottom: "2px solid lightgray",
  },
  storySection: {
    minHeight: "60vh",
    borderBottom: "2px solid lightgray",
    alignContent: "flex-start",
    background: "white",
  },
});

const PreviewStoryPage = ({ classes, loggedUser, location }) => {
  const [previewStory, setPreviewStory] = useState(null);

  const focusStory = async () => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/${location.state.id}`;
    await axios
      .get(
        url,
        loggedUser.token
          ? {
              headers: {
                Authorization: `Token ${loggedUser.token}`,
              },
            }
          : null
      )

      .then((response) => {
        console.log(response.data);
        setPreviewStory(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    focusStory();
  }, []);

  return (
    <Grid container style={{ overflowY: "auto" }}>
      <Grid container className={classes.storyPreviewContainer}>
        {previewStory ? (
          <Grid container className={classes.storyPreviewInfoContainer}>
            <Grid
              item
              xs={12}
              key="user"
              className={classes.storyPreviewInfoGrid}
            >
              <Link
                to={
                  previewStory.author.user.id !== loggedUser.id
                    ? {
                        pathname: `/user`,
                        hash: `#${previewStory.author.id}`,
                        state: { user: previewStory.author },
                      }
                    : {
                        pathname: `/account`,
                      }
                }
                key={previewStory.author.id}
                style={{ textDecoration: "none", display: "flex" }}
              >
                <Typography style={{ color: "black" }} variant="subtitle1">
                  Author: &nbsp; &nbsp;
                </Typography>
                <Typography color="primary" variant="subtitle1">
                  {previewStory.author.user.username}
                </Typography>
              </Link>
            </Grid>

            <Grid
              item
              xs={12}
              key="createDate"
              className={classes.storyPreviewInfoGrid}
              style={{ cursor: "default" }}
            >
              <Typography variant="subtitle1">
                Created At: &nbsp; &nbsp;
              </Typography>
              <Typography color="primary" variant="subtitle2">
                {previewStory.created.split("T")[0]}
              </Typography>
            </Grid>
          </Grid>
        ) : null}

        {previewStory ? (
          <Grid container className={classes.storySection}>
            <PreviewStory storyInfo={previewStory.components} />
          </Grid>
        ) : null}
        {previewStory ? (
          <StoryLikeDislike storyInfo={previewStory} focusStory={focusStory} />
        ) : null}

        {previewStory ? (
          <Grid container className={classes.commentSection}>
            <StoryCommments loggedUser={loggedUser} id={previewStory.id} />
          </Grid>
        ) : null}
        <Grid item xs={12} className={classes.linkGrid}>
          <Link to="/stories" style={{ textDecoration: "none" }}>
            <Button color="primary" variant="outlined">
              Back
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default compose(
  connect(mapStateToStoriesPage),
  withStyles(useStyles)
)(PreviewStoryPage);
