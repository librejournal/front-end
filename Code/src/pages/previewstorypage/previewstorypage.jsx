import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

import axios from "axios";
import { PreviewStory } from "../../components";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { mapStateToStoriesPage } from "../../redux/mapFunctions";

const useStyles = () => ({
  storyPreviewContainer: {
    height: "80vh",
    padding: "2vh 3vw",
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
  },
  storyPreviewInfoContainer: {
    height: "10vh",
    padding: "2vh 10vw",
  },
  storySection: {
    minHeight: "60vh",
  },
});

const PreviewStoryPage = ({ classes, loggedUser, location }) => {
  console.log();
  const [previewStory, setPreviewStory] = useState(null);

  const focusStory = async () => {
    await axios
      .get(`http://localhost:9001/api/stories/${location.state.id}`, {
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
    focusStory();
  }, []);

  console.log(previewStory);
  return (
    <Grid container className={classes.storyPreviewContainer}>
      {previewStory ? (
        <Grid container className={classes.storyPreviewInfoContainer}>
          <Grid
            item
            xs={12}
            key="user"
            className={classes.storyPreviewInfoGrid}
          >
            <Typography variant="subtitle1">Author: &nbsp; &nbsp;</Typography>
            <Typography color="primary" variant="subtitle1">
              {previewStory.author.user.username}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            key="createDate"
            className={classes.storyPreviewInfoGrid}
          >
            <Typography variant="subtitle1">
              Created At: &nbsp; &nbsp;
            </Typography>
            <Typography color="primary" variant="subtitle1">
              Date will appear here
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
        <Grid container className={classes.commentSection}>
          Comment section - to be implemented
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
  );
};

export default compose(
  connect(mapStateToStoriesPage),
  withStyles(useStyles)
)(PreviewStoryPage);