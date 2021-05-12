import React from "react";

import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import StoryItem from "../createstory/storyItem";

const useStyles = {
  createStoryGrid: {
    padding: "3vh 2vw",
  },
};

const CreateStory = ({ classes, addStoryInfo, deleteStoryInfo, storyInfo }) => {
  const length = storyInfo.length + 1;
  return (
    <Grid contaniner className={classes.createStoryGrid}>
      {[...Array(length)].map((x, i) => (
        <StoryItem
          addStoryInfo={addStoryInfo}
          deleteStoryInfo={deleteStoryInfo}
          key={i}
        />
      ))}
    </Grid>
  );
};

export default compose(withStyles(useStyles))(CreateStory);
