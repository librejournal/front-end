import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { PreviewStory, CreateStory } from "../../components";

const useStyles = {
  createStoryPageContainer: {
    padding: "1vh 3vw",
    display: "flex",
    textAlign: "center",
  },
  previewTitle: {
    borderBottom: "2px solid gray",
  },
  createStoryLeftContainer: {
    marginTop: "3vh",
  },
  createStoryRightContainer: {
    marginTop: "3vh",
  },
};

const CreateStoryPage = ({ classes }) => {
  const [storyInfo, setStoryInfo] = useState([]);

  const addStoryInfo = (info, id) => {
    if (storyInfo.filter((el) => el.id === id).length !== 0) {
      const newStoryInfo = storyInfo.map((el) =>
        el.id === id ? (el = info) : el
      );
      setStoryInfo(newStoryInfo);
    } else {
      setStoryInfo([...storyInfo, { ...info }]);
    }
  };

  const deleteStoryInfo = (id) => {
    const newStoryInfo = storyInfo.filter((el) => el.id !== id);
    setStoryInfo(newStoryInfo);
  };

  return (
    <Grid container className={classes.createStoryPageContainer}>
      <Grid item xs={12}>
        <Typography color="primary" variant="h2">
          Create a new story
        </Typography>
      </Grid>
      <Grid item xs={6} className={classes.createStoryLeftContainer}>
        <CreateStory
          storyInfo={storyInfo}
          addStoryInfo={addStoryInfo}
          deleteStoryInfo={deleteStoryInfo}
        />
      </Grid>
      <Grid item xs={6} className={classes.createStoryRightContainer}>
        <Typography
          variant="h4"
          color="primary"
          className={classes.previewTitle}
        >
          Preview
        </Typography>
        {storyInfo.length === 0 ? (
          <Typography variant="h6">
            Preview of your story will appear as you add more elements below.
          </Typography>
        ) : (
          <PreviewStory storyInfo={storyInfo} />
        )}
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(CreateStoryPage);
