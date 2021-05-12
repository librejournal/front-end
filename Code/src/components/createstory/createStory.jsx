import React from "react";

import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import StoryItem from "../createstory/storyItem";

const useStyles = {};

const CreateStory = ({ classes, addStoryInfo, deleteStoryInfo }) => {
  return (
    <Grid contaniner>
      <StoryItem
        addStoryInfo={addStoryInfo}
        deleteStoryInfo={deleteStoryInfo}
      />
    </Grid>
  );
};

export default compose(withStyles(useStyles))(CreateStory);
