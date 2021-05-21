import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
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
  },
  linkGrid: {
    height: "5vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "end",
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
  return (
    <Grid container className={classes.storyPreviewContainer}>
      {previewStory ? (
        <PreviewStory storyInfo={previewStory.components} />
      ) : null}
      <Grid item xs={12} className={classes.linkGrid}>
        <Link to="/stories" style={{ textDecoration: "none" }}>
          Back
        </Link>
      </Grid>
    </Grid>
  );
};

export default compose(
  connect(mapStateToStoriesPage),
  withStyles(useStyles)
)(PreviewStoryPage);
