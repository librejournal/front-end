import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";

import { PreviewStory } from "../../components";

import { connect } from "react-redux";
import { mapStateToStoriesPage } from "../../redux/mapFunctions";

const useStyles = () => ({
  storyPageContainer: {
    height: "80vh",
    display: "flex",
    padding: "5vh 2vw",
    flexDirection: "column",
  },
  authorGrid: {
    display: "flex",
  },
  storyContainer: {
    border: "2px solid gray",
    maxWidth: "80%",
    maxHeight: "5vh",
    cursor: "pointer",
    margin: "0.1vh 0",
  },
});

const StoriesPage = ({ classes, loggedUser }) => {
  const [stories, setStories] = useState([]);
  const [previewStory, setPreviewStory] = useState([]);

  const getStories = async () => {
    await axios
      .get("http://localhost:9001/api/stories/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        setStories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const focusStory = async (id) => {
    await axios
      .get(`http://localhost:9001/api/stories/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        setPreviewStory(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStories();
  }, []);

  console.log(previewStory);
  return (
    <Grid container className={classes.storyPageContainer}>
      {stories.map((el) => (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.storyContainer}
          onClick={() => focusStory(el.id)}
        >
          <Grid item xs={12} sm={3} className={classes.authorGrid}>
            <Typography color="primary" variant="h6" className={classes.author}>
              Author:&nbsp;&nbsp;
            </Typography>
            <Typography variant="h6">{el.author.user.username}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="primary">
              {el.uuid}
            </Typography>
          </Grid>
        </Grid>
      ))}
      {previewStory.components ? (
        <PreviewStory storyInfo={previewStory.components} />
      ) : null}
    </Grid>
  );
};

export default compose(
  connect(mapStateToStoriesPage),
  withStyles(useStyles)
)(StoriesPage);
